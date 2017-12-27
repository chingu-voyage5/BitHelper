import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';
import ProjectList from './ProjectList.js';

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

const app = (apiUrl) => {
    ReactDOM.render(<ProjectList 
      url={apiUrl + '/projects'}
      />, document.getElementById('root'));   
}
