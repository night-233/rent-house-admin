import CommonApi from '@/apis/common'

const CHANGE_LIMITS = 'CHANGE_LIMITS'

const initState = {
  limits: {}
}

export function common (state = initState, action) {
  switch (action.type) {
    case CHANGE_LIMITS:
      state.limits = action.payload
      return state;
    default:
      return state;
  }
}

export function changeLimits (payload) {
  return { type: CHANGE_LIMITS, payload }
}


export function getLimits () {
  return (dispatch, getState) => {
    return CommonApi.getLimits()
      .then(res => {
        if (res) {
          dispatch(changeLimits(res))
        }
      })
  }
}
