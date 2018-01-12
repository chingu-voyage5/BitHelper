import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Cookies from 'cookie.js'
import axios from 'axios';
import "./stylesheets/main.css"
// import './style.css';
import Header from './components/Header.js';
import ProjectCard from './components/ProjectCard.js';
import ProjectInfo from './components/ProjectInfo.js';
import UserInfo from './components/UserInfo.js';
import UserEdit from './components/UserEdit.js';

require('dotenv').load();



class App extends Component {
  constructor(props) {
    super(props)

    let url = window.location.origin;
    this.state = {
      projects: [],
      user: null
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
    const userId = Cookies.get("userId");
    if(userId) {
      console.log('cookie userId', userId);

      axios.get(url + '/api/users/' + userId)
      .then(res => {
        console.log('get user info from cookie', res.data);
        this.setState({user: res.data})
      })
    }

    this.logoutUser = this.logoutUser.bind(this)
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
  logoutUser() { // logout user
    axios.get('/auth/logout').then(()=> {
      Cookies.remove("userId")
      this.setState({user: null})
    })

  }
  render() {
    console.log('index', this.state.user);
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
         <Route path="/editUser" render={(routeProps)=> {
           return <UserEdit {...routeProps} {...{
              user: this.state.user,
              onUserPost: this.postUser
            }} />
          }
         }/>
      </div>
     </Router>
   )
 }

}

  ReactDOM.render(<App
  />, document.getElementById('root'));
