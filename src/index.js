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
import './style.css';

import Header from './Header.js';
import ProjectList from './ProjectList.js';
import ProjectInfo from './ProjectInfo.js';
import UserInfo from './UserInfo.js';
import AddProject from './AddProject.js'

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
    // if userId is stored in cookie get user
    if(document.cookie) {
      // get user id from cookies
      const userId = Cookies.get("userId");

      axios.get(url + '/api/users/' + userId)
      .then(res => {
        this.setState({
          user: res.data,
          isLoggedIn: true
        })
      })
    }
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
    return(
    <Router>
      <div>
         <Header user={this.state.user} logoutUser={this.logoutUser}/>
          <Route exact
            path="/"
            render={(routeProps)=> {
            return <ProjectList {...routeProps} {...this.state}  />
          }
         }/>
         <Route path="/project/:id" render={(routeProps)=> {
           return <ProjectInfo {...routeProps} {...this.state} />
          }
         }/>
         <Route path="/user/:id" render={(routeProps)=> {
           return <UserInfo {...routeProps} {...{user: this.state.user}} />
          }
         }/>
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


      </div>
     </Router>
   )
 }

}

// wrapper function for protected routes
const AuthenticatedUser = ({user, children}) =>  {

    if (user) {
      // return protected routes
      return <div>{children}</div>
    } else {
      console.log('user not logged in')
      // todo: should redirect to a login page
      return null
    }
}

ReactDOM.render(<App
/>, document.getElementById('root'));
