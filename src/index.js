import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Cookies from 'cookie.js'
import axios from 'axios';
import "./stylesheets/main.css";
// import './style.css';
import Nav from './components/Nav';
import ProjectCard from './components/ProjectCard';
import ProjectInfo from './components/ProjectInfo';
import ProjectEdit from './components/ProjectEdit';
import UserInfo from './components/UserInfo';
import UserEdit from './components/UserEdit';
import Footer from './components/Footer';
import Button from './components/Button';


require('dotenv').load();



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: [],
      user: null,
      isLoggedIn: false
    }
  }
  componentDidMount() {
    this.fetchProjects();
    this.getUser();
  }
  fetchProjects = () => {
    // get projects
    axios.get(window.location.origin + '/api/projects')
    .then(res => {
      this.setState({projects: res.data})
    })
    .catch(err => {
      console.error('fetch project', err);
    });  
  }
  getUser = () => {
    axios.get(window.location.origin + '/auth')
    .then(res => {
      this.setState({
        user: res.data,
        isLoggedIn: true
      });
    })
  }
  postUser = (data) => {
    console.log('post user', data);
    axios.put(window.location.origin + '/api/users/' + data._id, data)
    .then(res => {
      console.log('update user success');
      this.fetchProjects();
    })
    .catch(err => {
      console.error('error posting user update', err);
    });
  }
  newProject = (data) => {
    console.log('create project', data);
    axios.post(window.location.origin + '/api/projects', data)
    .then(res => {
      console.log('project created');
      this.fetchProjects();
    })
    .catch(err => {
      console.error('error posting new project', err);
    });
  }
  updateProject = (data) => {
    console.log('update project', data);
    axios.put(window.location.origin + '/api/projects/' + data._id, data)
    .then(res => {
      console.log('update project success');
      this.fetchProjects();
    })
    .catch(err => {
      console.error('update project error', err);
    });
  }
  deleteProject = (data) => {
    console.log('delete project', data.title);
    axios.delete(window.location.origin + '/api/projects/' + data._id)
    .then(res => {
      console.log('delete project success');
      this.fetchProjects();
    })
    .catch(err => {
      console.error('delete project error', err);
    });
  }
  logoutUser = () => { // logout user
    axios.get('/auth/logout').then(()=> {
      Cookies.remove("userId")
      this.setState({
        user: null,
        isLoggedIn: false
      })
    })
  }
  render() {
    return(
    <Router>
      <div>
        <Nav user={this.state.user} logoutUser={this.logoutUser}/>
        <Route exact
          path="/"
          render={(routeProps)=> {
          return <ProjectCard {...routeProps} {...this.state}  />
        }
        }/>
        <Route path="/project/view/:id" render={(routeProps)=> {
          return <ProjectInfo 
            {...routeProps} 
            {...{
              projects: this.state.projects,
              user: this.state.user,
              deleteProject: this.deleteProject
            }} />
        }
        }/>
        <Route path="/user/view/:id" render={(routeProps)=> {
          return <UserInfo {...routeProps} {...{user: this.state.user}} />
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
                  handleSubmit: this.updateProject
                }} />
          }
        }/>
      
      <Footer />
      </div>
     </Router>
   )
 }

}

// wrapper function for protected routes
const AuthenticatedUser = (prop) =>  {
    console.log('AuthenticatedUser', prop);
    /*if (user) {
      // return protected routes
      return <div>{children}</div>
    } else {
      console.log('user not logged in')
      // todo: should redirect to a login page
      return null
    }*/
}

ReactDOM.render(<App
/>, document.getElementById('root'));

/*

// Wrapper component that only renders routes when user islogged in
         <AuthenticatedUser isLoggedin={this.state.user}>
           <Route path="/addproject" render={(routeProps)=> {
                return <AddProject
                  {...routeProps}
                  {...{
                    user: this.state.user,
                    createPoll: this.createPoll
                  }} />
            }
          }/>
        </AuthenticatedUser>
*/