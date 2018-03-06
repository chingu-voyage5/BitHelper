import { combineReducers } from 'react-redux';
import userReducer from './userReducer.js';
import projectReducer from './projectReducer.js';

export default combineReducers({
    userReducer,
    projectReducer
});
