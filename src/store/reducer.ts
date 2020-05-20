//reducer.js
import { combineReducers } from 'redux-immutable';
import { user } from './redux/user.redux';


export default combineReducers({ user })