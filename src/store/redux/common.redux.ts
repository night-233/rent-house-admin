import openApi from '@/apis/open'
import BaiduApi from "@apis/baidu";
import {message} from "antd";
import {ModalModeType} from "@components/LoginRegiestModal";

const CHANGE_LIMITS = 'CHANGE_LIMITS';
const CHANGE_CITY = 'CHANGE_CITY';
const CHANGE_LOGIN_MODAL_TYPE = "CHANGE_MODAL_TYPE";
const CHANGE_LOGIN_MODAL_VISIBLE = "CHANGE_LOGIN_MODAL_VISIBLE";
const SET_LOGIN_MODAL_CALLBACK = "SET_LOGIN_MODAL_CALLBACK";

const initState = {
  limits: {},
  city: {
    enName: null,
    cnName: null,
  },
  loginModal: {
    visible: false,
    type: ModalModeType.CODE_LOGIN,
    callback: null // 登录成功回调函数
  },
  reserveModal: {
    visible:false
  }
};

export function common (state = initState, action) {
  switch (action.type) {
    case CHANGE_LIMITS:
      state.limits = action.payload;
      return state;
    case CHANGE_CITY:
      return {...state, city: action.payload};
    case CHANGE_LOGIN_MODAL_TYPE:
      return {...state, loginModal: {...state.loginModal, type: action.payload}};
    case CHANGE_LOGIN_MODAL_VISIBLE:
      if(action.payload === false){
        return {...state, loginModal: {...state.loginModal, visible: action.payload, callback: null}}
      }
      return {...state, loginModal: {...state.loginModal, visible: action.payload}};
    case SET_LOGIN_MODAL_CALLBACK:
      return {...state, loginModal: {...state.loginModal, callback: action.payload}};
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

// 设置登录注册模态框是否可见
export const changeLoginModalVisible = (visible: boolean) => {
  return {type: CHANGE_LOGIN_MODAL_VISIBLE, payload: visible};
};
// 设置登录注册模态框类型
export const changeLoginModalType = (type: ModalModeType) => {
  return {type: CHANGE_LOGIN_MODAL_TYPE, payload: type};
};
// 设置登录注册模态框成功后回调
export const setLoginModalCallback = (callback) => {
  return {type: SET_LOGIN_MODAL_CALLBACK, payload: callback};
};
