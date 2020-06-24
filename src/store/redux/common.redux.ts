import openApi from '@/apis/open'
import BaiduApi from "@apis/baidu";
import {message} from "antd";

const CHANGE_LIMITS = 'CHANGE_LIMITS';
const CHANGE_CITY = 'CHANGE_CITY';

const initState = {
  limits: {},
  city: {
    enName: null,
    cnName: null,
  }
};

export function common (state = initState, action) {
  switch (action.type) {
    case CHANGE_LIMITS:
      state.limits = action.payload;
      return state;
    case CHANGE_CITY:
      return {...state, city: action.payload};
    default:
      return state;
  }
}

export function changeLimits (payload) {
  return { type: CHANGE_LIMITS, payload }
}

export function getLimits () {
  return (dispatch, getState) => {
    return openApi.getLimits()
      .then(res => {
        if (res) {
          dispatch(changeLimits(res))
        }
      })
  }
}

export function changeCity(payload) {
  return {type: CHANGE_CITY, payload}
}
