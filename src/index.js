import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';

require('dotenv').load();
console.log(process.env);

const apiUrl = process.env.REACT_APP_APIURL;

ReactDOM.render(<CommentBox 
    url={apiUrl + '/comments'}
    pollInterval={2000} />, document.getElementById('root'));
