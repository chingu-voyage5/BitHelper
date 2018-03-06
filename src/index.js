// Import React and its components
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './routes.js';
import { createStore } from 'redux'
// Provider allows for each individual component to connect to the store via "connect"
import { Provider } from 'react-redux';

// Import combined reducers to create app store
let store = createStore(reducers);

// Rendering the full app at root
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('root')
);