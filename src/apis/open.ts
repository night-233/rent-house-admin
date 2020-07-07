import request from '@/utils/request';

const base = '/dev';

export default {
  urls () {
    return {
      userLogin: `${base}/open/login`,
      getLimits: `${base}/open/limits`,
      sendMessage: `${base}/open/sendSmsToPhone`,
      loginInNoPwd: `${base}/open/noPassLogin`,
      registerPhone: `${base}/open/registryByPhone`,
      judgeNickName: `${base}/open/nickName`,
      checkPhoneExist: `${base}/open/phone?phone=`,
    };
  },
  getLimits () {
    return request({
      url: this.urls().getLimits,
      method: 'get',
      noJweToken: true
    });
  },
  judgeNickName (params: any) {
    return request({
      url: this.urls().judgeNickName,
      method: 'get',
      params
    });
  },
  registerPhone (data: Object) {
    return request({
      url: this.urls().registerPhone,
      method: 'post',
      data,
      noJweToken: true
    });
  },
  loginInNoPwd (data: Object) {
    return request({
      url: this.urls().loginInNoPwd,
      method: 'post',
      data,
      noJweToken: true
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
  userLogin (data: Object) {
    return request({
      url: this.urls().userLogin,
      method: 'post',
      data,
      noJweToken: true
    });
  },
  checkPhoneExist (phone: string) {
    return request({
      url: this.urls().checkPhoneExist + phone,
      method: 'get',
      noJweToken: true,
      progress: false
    });
  },
};
