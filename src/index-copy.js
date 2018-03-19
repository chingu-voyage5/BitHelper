import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import getCookie from './js/getCookie';
import apiCall from './js/apiCalls';
import axios from 'axios';

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
      
    console.log('api url', url);
      
    // component state has 
    this.state = {
      apiUrl: url,
      projects: [], 
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
    // testing apiCalls.js
    apiCall.getAllProjects(res => {
      if (res.error) {console.error(res.error)}
      this.setState({projects: res.data});
    });
  }
  
  getOneProject = (projectId, next) => {
    // Testing apiCall
    const projects = (this.state.projects.length > 0) ? this.state.projects : null;
    apiCall.getProjectById(projects, projectId, res => {
      if (res.error) {console.error(res.error)}
      next(res.data);
    });
  }
  // get user data from api and assign it to state
  setUser = () => {
    // Testing apiCall
    apiCall.getCurrentUser(res => {
      console.log('getCurrentUser', res.data);
      if (res.error) {console.error(res.error)}
      if (res.data) {
        this.setState({user: res.data});
      } else {
        console.log('User not logged in');
      }
    });
  }
  // get user data from api
  getOneUser = (id, next) => {
    // Testing apiCall
    apiCall.getUserById(id, res => {
      if (res.error) {console.error(res.error)}
      next(res.data);
    });
  }

  // updates user data 
  postUser = (data) => {
    apiCall.postUser(data, () => {
      this.allProjects();
      this.setUser();
    });
  }

  // creates new project
  newProject = (data) => {
    // This is now identical to this.updateProject()...
    apiCall.postProject(data, this.allProjects());
  }

  // update project
  updateProject = (data) => {
    // This is now identical to this.newProject()...
    apiCall.postProject(data, this.allProjects());
  }

  // delete project
  deleteProject = (data) => {
    apiCall.deleteProject(data, this.allProjects());
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
                <Header user={this.state.user} />

                {/* ProjectCard inherits route props, plus App is passed on as ProjectCard prop */}
                <ProjectCard 
                  {...routeProps} 
                  {...{
                    projects: this.state.projects,
                    user: this.state.user
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
          // ProjectInfo component shows single project. Functions defined at parent level
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