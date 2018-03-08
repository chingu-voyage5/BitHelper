import React, { Component } from 'react';
import getCookie from './js/getCookie';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Redirect
  } from 'react-router-dom';


// Actions
import { setUser } from './actions/users.js';
import { setProjects } from './actions/projects.js';

// Connects component to Store state & dispatch actions to store
import { connect } from 'react-redux';

// Import stylesheets
import "./stylesheets/main.css";

// Import custom components
import Nav from './components/molecules/Nav';
import Header from './components/molecules/Header';
import ProjectCard from './components/molecules/ProjectCard';
import ProjectInfo from './components/molecules/ProjectInfo';
import ProjectEdit from './components/molecules/ProjectEdit';
import UserInfo from './components/molecules/UserInfo';
import UserEdit from './components/molecules/UserEdit';
import ContactForm from './components/molecules/ContactForm';
import About from "./components/organisms/About";
import Footer from './components/molecules/Footer';

// Loads environment variables with dotenv
require('dotenv').load();

// Declare App component 
class App extends Component {
  constructor(props) {
    super(props);

    // url is REACT_APP_APPURL if set, otherwise it's window.location.origin
    const url = ( process.env.REACT_APP_APPURL ) ? 
      ( process.env.REACT_APP_APPURL ) : 
      ( window.location.origin );
      
    // component state has 
    this.state = {
      apiUrl: url,
      projects: [], 
      filters: [],
      user: null
    }
  }
  // Once the app is mounted
  componentDidMount() {
    // load all projects 
    this.allProjects();
    this.setUser();
    // Get redirect cookie and redirect if exists
    const redirect = getCookie('redirect');
    if (redirect) {
      // Reset redirect cookie before redirecting
      document.cookie = 'redirect=';
      window.location = redirect;
    }
  }

  /*
  FUNCTIONS TO PASS DOWN TO CHILDREN COMPONENTS
  AS PROPS WHEN ROUTING
  */

  allProjects = () => {
    // get projects from api
    axios.get(this.state.apiUrl + '/api/projects')
    .then(res => {
      this.setState({projects: res.data}) // update state to response data
      this.props.setProjects(res.data); // redux store
    })
    .catch(err => {
      console.error('fetch project', err); // handle error if there is one
    });  
  }

  // delete project
  deleteProject = (data) => {
    axios.delete(this.state.apiUrl + '/api/projects/' + data._id)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('delete project error', err);
    });
  }


  
  
  getOneProject = (projectId, next) => {
    // If the project is already stored in state
    if (this.state.projects.length > 0) { 
      // check if projectId is equal to the found item
      const project = this.state.projects.find(item => {
        console.log("item ", item);
          return item._id === projectId;
      });
      next(project);
    } else {
      // otherwise looks for it in the api
      axios.get(this.state.apiUrl + '/api/projects/' + projectId)
      .then(res => {
        next(res.data);
      })
      // and handle errors
      .catch(err => {
        if (err) throw err;
      });
    }
  }

  // get user data from api
  getOneUser = (id, next) => {
    axios.get(this.state.apiUrl + '/api/users/' + id)
    .then(res => {
      next(res.data);
    });
  }

  // logout the user by setting the app state.user as null
  logoutUser = () => { // logout user
    axios.get('/auth/logout').then(()=> {
      this.setState({
        user: null
      });
      window.location = '/'; // and redirects to the homepage
    });
  }

  // creates new project
  newProject = (data) => {
    axios.post(this.state.apiUrl + '/api/projects', data)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('error posting new project', err);
    });
  }


   // updates user data 
   postUser = (data) => {
    axios.put(this.state.apiUrl + '/api/users/' + data._id, data)
    .then(res => {
      console.log('update user success');
      this.allProjects();
      this.setUser();
    })
    .catch(err => {
      console.error('error posting user update', err);
    });
  }

  // get user data from api and assign it to state
  setUser = () => {
    axios.get(this.state.apiUrl + '/auth')
    .then(res => {
      this.setState({
        user: res.data
      });

      // send data to redux store
      this.props.setProjects(res.data);
    })
  }

  // update filter
  updateFilter = (filterArray) => {
    this.setState({
      filters: filterArray
  });
  }

  // update project
  updateProject = (data) => {
    axios.put(this.state.apiUrl + '/api/projects/' + data._id, data)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('update project error', err);
    });
  }

  render() {
    return(
      
    <Router>
      <div>
        {/* Nav components get rendered in all pages. User is set to null when user logged out */}
        <Nav user={this.state.user} logoutUser={this.logoutUser}/>

        {/* Routing for homepage */}
        <Route exact
          path="/"
          render={(routeProps)=> (
            /* If user is logged in, but user doesn't have username, redirect to user edit page */
            ( this.state.user && !this.state.user.username ) ?
            ( <Redirect to={{
                pathname: '/user/edit/'
              }}/> ) :
            ( 
              <div>
                {/* If user is logged out, render Header, ProjectCard and About components (Landing page) */ }
                {/* Header component. toggleHeader not defined anywhere! */}
                <Header user={this.state.user} toggleHeader={this.toggleHeader}/>

                {/* ProjectCard inherits route props, plus App is passed on as ProjectCard prop */}
                <ProjectCard 
                  {...routeProps} 
                  {...{
                    projects: this.state.projects,
                    user: this.state.user,
                    filters: this.state.filters,
                    limit: 6,
                    onFilterUpdate: this.updateFilter
                  }} 
                />
                {/* About component */}
                <About user={this.state.user} />
              </div>
            )
          )
        }/>
        {/* Shows single project */}
        <Route path="/project/view/:id?" render={(routeProps)=> {
          {/* ProjectInfo component shows single project. Functions defined at parent level */}
          return <ProjectInfo 
            {...routeProps} 
            {...{
              projects: this.state.projects,
              user: this.state.user,
              filters: this.state.filters,
              deleteProject: this.deleteProject,
              allProjects: this.allProjects,
              getOneProject: this.getOneProject,
              getOneUser: this.getOneUser,
              onFilterUpdate: this.updateFilter
            }} />
        }
        }/>
        {/* Shows user page */}
        <Route path="/user/view/:id" render={(routeProps)=> {
          return <UserInfo 
            {...routeProps} 
            {...{
              user: this.state.user,
              projects: this.state.projects,
              getOneUser: this.getOneUser
            }} />
        }
        }/>
        {/* User can edit its own information when logged in */}
        <Route path="/user/edit/" render={(routeProps)=> {
            return <UserEdit {...routeProps} {...{
              user: this.state.user,
              onUserPost: this.postUser
            }} />
          }
        }/>

        {/* Adds a project (only logged in users)  */}
        <Route path="/project/add/" render={(routeProps)=> {
              return <ProjectEdit
                {...routeProps}
                {...{
                  title: 'Create New Project',
                  edit: false,
                  user: this.state.user,
                  handleSubmit: this.newProject
                }} />
          }
        }/>

        {/* Edits a projects (only logged in users) */}
        <Route path="/project/edit/:id" render={(routeProps)=> {
              return <ProjectEdit
                {...routeProps}
                {...{
                  title: 'Edit a Project',
                  edit: true,
                  user: this.state.user,
                  handleSubmit: this.updateProject,
                  getOneProject: this.getOneProject
                }} />
          }
        }/>

        {/* Shows contact form to contact project owner */}
        <Route path="/contact/:userId/:projectId?" render={(routeProps)=> {
              return <ContactForm 
                {...routeProps} 
                {...{
                    user: this.state.user,
                    handleSubmit: this.sendMessage,
                    getOneProject: this.getOneProject,
                    getOneUser: this.getOneUser
              }}/>
        }}/>

        {/* Footer component gets shown in every single page */}
      <Footer />
      </div>
     </Router>
   )
 }
}

const mapStateToProps = (state) => {
  console.log(state, 'this is state');
  
  return {
    projects: state.projectReducer.projects,
    user: state.userReducer.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
    setProjects: (projects) => {
      dispatch(setProjects(projects));
    }
  }
}

const AppConnect = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnect;