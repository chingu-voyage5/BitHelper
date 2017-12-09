import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CommentBox from './CommentBox';

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
    ReactDOM.render(<CommentBox 
        url={apiUrl + '/comments'}
        pollInterval={2000} />, document.getElementById('root'));   
}
