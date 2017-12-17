import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';
import ProjectList from './ProjectList.js';
import ProjectInfo from './ProjectInfo.js';

require('dotenv').load();

let apiUrl = window.location.origin + '/api';

axios.get(apiUrl)
.then(res => {
  console.log('api = ', apiUrl);
  app(apiUrl);
})    
.catch(err => {
  console.error('local server not running. using heroku deployment of the server instead.');
  app(process.env.REACT_APP_APIURL);
});


class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        <Body url={this.props.url} />
      </div>
    );
  }
}

class Body extends Component {
  constructor (props) {
    super(props);
    this.state = {
      render: 'ProjectList',
      projectId: ''
    };
  }
  showProjectInfo = (id) => {
    console.log('show project info');
    this.setState({
      render: 'ProjectInfo',
      projectId: id
    });
  }
  showProjectList = () => {
    console.log('show project list');
    this.setState({
      render: 'ProjectList',
      projectId: ''
    })
  }
  render () {
    switch (this.state.render) {
      case 'ProjectList':
        return (
          <ProjectList url={this.props.url + '/projects'} 
            onCardClick={this.showProjectInfo}/>
        );
      case 'ProjectInfo':
        return (
          <ProjectInfo url={this.props.url + '/projects/' + this.state.projectId} 
          backToMain={this.showProjectList}/>
        );  
      default:
    }
  }
}

class Header extends Component {
  render () {
    return (
      <header>
        <div className='title'>Bears-20 App</div>
        <div className='login'><a href="/auth/github">Log In with github</a></div>
      </header>
    );
  }
}

const app = (apiUrl) => {
  ReactDOM.render(<Main url={apiUrl}
  />, document.getElementById('root'));   
}