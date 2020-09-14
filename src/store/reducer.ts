//reducer.js
import { combineReducers } from 'redux-immer';
import { user } from './redux/user.redux';
import { common } from './redux/common.redux';
import { house } from './redux/house.redux';
import produce from 'immer';


export default combineReducers(produce, {
  user,
  common,
  house
})
