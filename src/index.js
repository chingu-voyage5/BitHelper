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
import Nav from './components/Nav.js';
import ProjectCard from './components/ProjectCard.js';
import ProjectInfo from './components/ProjectInfo.js';
import UserInfo from './components/UserInfo.js';
import UserEdit from './components/UserEdit.js';
import AddProject from './components/AddProject.js';
import Footer from './components/Footer.js';
import Button from './components/Button.js';


require('dotenv').load();



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: [],
      user: null,
      isLoggedIn: false
    }

    this.logoutUser = this.logoutUser.bind(this);
    this.createPoll = this.createPoll.bind(this);
  }

  componentDidMount() {
    let url = window.location.origin;


    // get projects
    axios.get(url + '/api/projects')
    .then(res => {
      this.setState({projects: res.data})
    })
    .catch(err => {
      console.error('local server not running. using heroku deployment of the server instead.');
      url = process.env.REACT_APP_APPURL;
    });

    axios.get(url + '/auth')
    .then(res => {
      this.setState({
        user: res.data,
        isLoggedIn: true
      });
    })
    // if userId is stored in cookie get user
    /*const userId = Cookies.get("userId");
    if(userId) {
      console.log('cookie userId', userId);

      axios.get(url + '/api/users/' + userId)
      .then(res => {
        this.setState({
          user: res.data,
          isLoggedIn: true
        })
      })
    }*/
  }
  postUser = (data) => {
    console.log('post user', data);
    axios.put(window.location.origin + '/api/users/' + data._id, data)
    .then(res => {
      console.log('update user success');
    })
    .catch(err => {
      console.error('error posting user update');
    });
  }
  createPoll = (data) => {
    console.log('create poll', data);
    axios.post(window.location.origin + '/api/projects', data)
    .then(res => {
      console.log('poll created');
    })
    .catch(err => {
      console.error('error posting new poll');
    });
  }
  logoutUser() { // logout user
    axios.get('/auth/logout').then(()=> {

      Cookies.remove("userId")
      this.setState({
        user: null,
        isLoggedIn: false
      })
    })

  }
  render() {
    console.log('index', this.state.user);
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
          return <ProjectInfo {...routeProps} {...this.state} />
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
              return <AddProject
                {...routeProps}
                {...{
                  user: this.state.user,
                  createPoll: this.createPoll
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