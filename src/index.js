import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PostsList from './PostsList.js';

require('dotenv').load();

let apiUrl = window.location.origin + '/api';

axios.get(apiUrl)
.then(res => {
  console.log('using local server');
  app(apiUrl);
})    
.catch(err => {
  console.error('local server not running. using heroku deployment of the server instead.');
  app(process.env.REACT_APP_APIURL);
});

const app = (apiUrl) => {
    console.log('apiUrl = ', apiUrl);
    ReactDOM.render(<PostsList 
      url={apiUrl + '/posts'}
      />, document.getElementById('root'));   
}
