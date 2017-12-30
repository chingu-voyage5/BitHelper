import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Cookies from 'cookie.js'
import axios from 'axios';
import "./stylesheets/base/layout.css"
// import './style.css';
import Header from './components/Header.js';
import ProjectCard from './components/ProjectCard.js';
import ProjectInfo from './components/ProjectInfo.js';
import UserInfo from './components/UserInfo.js';

require('dotenv').load();



class App extends Component {
  constructor(props) {
    super(props)

    let url = window.location.origin;
    this.state = {
      projects: [],
      user: {}
    }

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
        this.setState({user: res.data})
      })
    }

    this.logoutUser = this.logoutUser.bind(this)
  }


  logoutUser() { // logout user
    axios.get('/auth/logout').then(()=> {
      
      Cookies.remove("userId")
      this.setState({user: null})
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
            return <ProjectCard {...routeProps} {...this.state}  />
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
      </div>
     </Router>
   )
 }

}

  ReactDOM.render(<App
  />, document.getElementById('root'));
