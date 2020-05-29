//reducer.js
// import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux-immer';
import { user } from './redux/user.redux';
import produce from 'immer';


export default combineReducers(produce, {
  user,
}