// Import React and its components
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import getCookie from './js/getCookie';
import axios from 'axios';

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
    
    const url = ( process.env.REACT_APP_APPURL ) ? 
      ( process.env.REACT_APP_APPURL ) : 
      ( window.location.origin );
      
    // console.log('api url', url);

    this.state = {
      apiUrl: url,
      projects: [],
      user: null
    }
  }
  componentDidMount() {
    this.allProjects();
    this.setUser();
    // Get redirect cookie and redirect if exists
    const redirect = getCookie('redirect');
    if (redirect) {
      // Reset redirect cookie before redirecting
      document.cookie = 'redirect=';
      window.location = redirect;
    }
    //this.fakeSetUser();
  }

  allProjects = () => {
    // get projects
    axios.get(this.state.apiUrl + '/api/projects')
    .then(res => {
      this.setState({projects: res.data})
    })
    .catch(err => {
      console.error('fetch project', err);
    });  
  }
  getOneProject = (projectId, next) => {
    if (this.state.projects.length > 0) { 
      const project = this.state.projects.find(item => {
          return item._id === projectId;
      });
      next(project);
    } else {
      axios.get(this.state.apiUrl + '/api/projects/' + projectId)
      .then(res => {
        next(res.data);
      })
      .catch(err => {
        if (err) throw err;
      });
    }
  }
  setUser = () => {
    axios.get(this.state.apiUrl + '/auth')
    .then(res => {
      this.setState({
        user: res.data
      });
    })
  }
  getOneUser = (id, next) => {
    axios.get(this.state.apiUrl + '/api/users/' + id)
    .then(res => {
      next(res.data);
    });
  }
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
  newProject = (data) => {
    axios.post(this.state.apiUrl + '/api/projects', data)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('error posting new project', err);
    });
  }
  updateProject = (data) => {
    axios.put(this.state.apiUrl + '/api/projects/' + data._id, data)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('update project error', err);
    });
  }
  deleteProject = (data) => {
    axios.delete(this.state.apiUrl + '/api/projects/' + data._id)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('delete project error', err);
    });
  }
  logoutUser = () => { // logout user
    axios.get('/auth/logout').then(()=> {
      this.setState({
        user: null
      });
      window.location = '/';
    });
  }
  render() {
    return(
    <Router>
      <div>
        <Nav user={this.state.user} logoutUser={this.logoutUser}/>
        <Route exact
          path="/"
          render={(routeProps)=> (
            ( this.state.user && !this.state.user.username ) ?
            ( <Redirect to={{
                pathname: '/user/edit/'
              }}/> ) :
            ( 
              <div>
                <Header user={this.state.user} toggleHeader={this.toggleHeader}/>
                <ProjectCard 
                  {...routeProps} 
                  {...{
                    projects: this.state.projects,
                    user: this.state.user,
                    limit: 6  
                  }} 
                />
                <About user={this.state.user} />
              </div>
            )
          )
        }/>
        <Route path="/project/view/:id?" render={(routeProps)=> {
          return <ProjectInfo 
            {...routeProps} 
            {...{
              projects: this.state.projects,
              user: this.state.user,
              deleteProject: this.deleteProject,
              allProjects: this.allProjects,
              getOneProject: this.getOneProject,
              getOneUser: this.getOneUser
            }} />
        }
        }/>
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
        <Route path="/user/edit/" render={(routeProps)=> {
            return <UserEdit {...routeProps} {...{
              user: this.state.user,
              onUserPost: this.postUser
            }} />
          }
        }/>
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
      {/*<div>
        <button className='btn' onClick={this.fakeAuth} value='login'>Fake Login</button>
        <button className='btn' onClick={this.fakeAuth} value='logout'>Fake Logout</button>
      </div>*/}
      <Footer />
      </div>
     </Router>
   )
 }
}

ReactDOM.render(<App 
/>, document.getElementById('root'));