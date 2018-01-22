import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Cookies from 'cookie.js'
import axios from 'axios';
import "./stylesheets/main.css";
// import './style.css';
import Nav from './components/Nav';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import ProjectInfo from './components/ProjectInfo';
import ProjectEdit from './components/ProjectEdit';
import UserInfo from './components/UserInfo';
import UserEdit from './components/UserEdit';
import ContactForm from './components/ContactForm';
import About from "./components/About";
import Footer from './components/Footer';

require('dotenv').load();

class App extends Component {
  constructor(props) {
    super(props);
    
    const url = ( process.env.REACT_APP_APPURL ) ? 
      ( process.env.REACT_APP_APPURL ) : 
      ( window.location.origin );
      
    console.log('api url', url);

    this.state = {
      apiUrl: url,
      projects: [],
      user: null
    }
  }
  componentDidMount() {
    console.log('did mount index');
    this.allProjects();
    this.setUser();
    //this.fakeSetUser();
  }
  fakeAuth = (e) => {
    if (e.target.value === 'login') {
      this.fakeSetUser();
    } else {
      Cookies.set('redirect', '/');
      console.log(Cookies.get('redirect'));
      this.setState({
        user: null
      });
      window.location = "/";
    }
  }
  fakeSetUser = () => {
    this.setState({
        user: {
        "_id":"5a6055120f25ffaa290471fd",
        "displayName":"Shohei",
        "email":"shohei51@gmail.com",
        "username":"shibatas",
        "avatar": 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        "projects":["5a6057020f25ffaa290471fe","5a6057230f25ffaa290471ff"],
        "skillset":['a', 'b', 'c']
        }
    })
  }
  allProjects = () => {
    // get projects
    console.log('get all projects');
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
      console.log('get project from state');
      const project = this.state.projects.find(item => {
          return item._id === projectId;
      });
      next(project);
    } else {
      console.log('get project from api');
      axios.get(this.state.apiUrl + '/api/projects/' + projectId)
      .then(res => {
        console.log('get one project api response', res);
        next(res.data);
      })
      .catch(err => {
        if (err) throw err;
      });
    }
  }
  setUser = () => {
    console.log('set user');
    axios.get(this.state.apiUrl + '/auth')
    .then(res => {
      console.log('set user res', res.data);
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
    console.log('post user', data);
    axios.put(this.state.apiUrl + '/api/users/' + data._id, data)
    .then(res => {
      console.log('update user success');
      this.allProjects();
    })
    .catch(err => {
      console.error('error posting user update', err);
    });
  }
  newProject = (data) => {
    console.log('create project', data);
    axios.post(this.state.apiUrl + '/api/projects', data)
    .then(res => {
      console.log('project created');
      this.allProjects();
    })
    .catch(err => {
      console.error('error posting new project', err);
    });
  }
  updateProject = (data) => {
    console.log('update project', data);
    axios.put(this.state.apiUrl + '/api/projects/' + data._id, data)
    .then(res => {
      console.log('update project success');
      this.allProjects();
    })
    .catch(err => {
      console.error('update project error', err);
    });
  }
  deleteProject = (data) => {
    console.log('delete project', data.title);
    axios.delete(this.state.apiUrl + '/api/projects/' + data._id)
    .then(res => {
      console.log('delete project success');
      this.allProjects();
    })
    .catch(err => {
      console.error('delete project error', err);
    });
  }
  logoutUser = () => { // logout user
    axios.get('/auth/logout').then(()=> {
      Cookies.remove("userId");
      this.setState({
        user: null
      });
      window.location = '/';
    });
  }
  toggleHeader = () => {
    this.setState({
      header: !this.state.header
    })
  }
  render() {
    console.log(this.state.user);
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
                <ProjectCard {...routeProps} {...this.state} />
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