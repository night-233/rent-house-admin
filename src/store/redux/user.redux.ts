import { fromJS } from 'immutable';
import loginApi from '@/apis/login'
import cookie from '@utils/cookie'

const LOGIN_IN = 'LOGIN_IN'
const LOGIN_OUT = 'LOGIN_OUT '

const initState = fromJS({
  authed: false,
  userInfo: {},
  test: '123'
})

export function user (state = initState, action) {
  switch (action.type) {
    case LOGIN_IN:
      return { ...state, authed: true, ...action.payload };
    case LOGIN_OUT:
      return initState;
    default:
      return state;
  }
}

export function loginIn (payload) {
  return { type: LOGIN_IN, payload }
}


export async function loginOut () {
  return { type: LOGIN_OUT }
}



export function getUserInfo () {
  return (dispatch, getState) => {
    return loginApi.getUserInfo()
      .then(res => {
        console.log(res)
        if (res) {
          dispatch(loginIn(res))
        }
      })
  }
}
// export function getUserInfo ()

export function login (data) {
  return (dispatch, getState) => {
    return loginApi.adminLogin(data)
      .then(res => {
        console.log(res)
        if (res) {
          const config = { expires: 7, path: '/' };
          cookie.setCookie({ key: 'Authorization', value: res.token, config })
          dispatch(loginIn(res.user))
        }
      })
  }
}