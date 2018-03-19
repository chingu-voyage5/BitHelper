// Import React and its components
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'

// Provider allows for each individual component to connect to the store via "connect"
import { Provider } from 'react-redux';
import rootReducer from './reducers/index.js';
import App from './routes.js';

// Import combined reducers to create app store
let store = createStore(rootReducer);

// Rendering the full app at root
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('root')
);