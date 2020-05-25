import request from '@/utils/request';

const base = '/dev';

export default {
  urls () {
    return {
      userLogin: `${base}/user/login`,
      getUserInfo: `${base}/user`,
      test: `${base}/address/support/cities`,
      updateUserInfo: `${base}/user/basicInfo`,
      sendMessage: `${base}/user/sendSmsToPhone`,
      registerPhone: `${base}/user/registryByPhone`,
    };
  },
  registerPhone (data: Object) {
    return request({
      url: this.urls().registerPhone,
      method: 'post',
      data,
      noJweToken: true
    });
  },
  updateUserInfo (data: Object) {
    return request({
      url: this.urls().updateUserInfo,
      method: 'put',
      data,
    });
  },
  sendMessage (data: Object) {
    return request({
      url: this.urls().sendMessage,
      method: 'post',
      data,
      noJweToken: true
    });
  },
  getUserInfo () {
    return request({
      url: this.urls().getUserInfo,
      method: 'get',
    });
  },
  userLogin (data: Object) {
    return request({
      url: this.urls().userLogin,
      method: 'post',
      data,
      noJweToken: true
    });
  },
  test () {
    return request({
      url: this.urls().test,
      method: 'get',
    });
  },
};
