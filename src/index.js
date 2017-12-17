import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';
import Header from './Header.js';
import ProjectList from './ProjectList.js';
import ProjectInfo from './ProjectInfo.js';

require('dotenv').load();

console.log('react-app-url', process.env);

let url = window.location.origin;

axios.get(url + '/api')
.then(res => {
  console.log('api = ', url + '/api');
  app(url);
})    
.catch(err => {
  console.error('local server not running. using heroku deployment of the server instead.');
  app(process.env.REACT_APP_APPURL);
});


class Main extends Component {
  render() {
    console.log('main', this.props.url+'/api');
    return (
      <div>
        <Header authUrl={this.props.url+'/auth'} />
        <Body apiUrl={this.props.url+'/api'} />
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
          <ProjectList url={this.props.apiUrl + '/projects'} 
            onCardClick={this.showProjectInfo}/>
        );
      case 'ProjectInfo':
        return (
          <ProjectInfo url={this.props.apiUrl + '/projects/' + this.state.projectId} 
          backToMain={this.showProjectList}/>
        );  
      default:
    }
  }
}

const app = (url) => {
  ReactDOM.render(<Main url={url}
  />, document.getElementById('root'));   
}