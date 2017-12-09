import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CommentBox from './CommentBox';

require('dotenv').load();

const apiUrl = process.env.REACT_APP_APIURL;
const apiUrlTest = window.location.origin + '/api';

axios.get(apiUrl)
.then(res => {
  console.log(res);
})

axios.get(apiUrlTest)
.then(res => {
  console.log(res);
})
/*
ReactDOM.render(<CommentBox 
    url={apiUrl + '/comments'}
    pollInterval={2000} />, document.getElementById('root'));
*/