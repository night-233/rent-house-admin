import request from '@/utils/request';

const base = '/dev';

const OpenApi = {
  urls () {
    return {
      userLogin: `${base}/open/login`,
      getLimits: `${base}/open/limits`,
      sendMessage: `${base}/open/sendSmsToPhone`,
      loginInNoPwd: `${base}/open/noPassLogin`,
      registerPhone: `${base}/open/registryByPhone`,
      judgeNickName: `${base}/open/nickName`,
      checkPhoneExist: `${base}/open/phone?phone=`,
      getVerifyImage: `${base}/open/verifyImage?phone=`,
      getResetPasswordToken: `${base}/open/getResetPasswordToken`,
      resetPasswordByToken: `${base}/open/resetPasswordByToken`,
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

  sendMessage (data: any) {
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
  getVerifyImage(phone: string){
    return request({
      url: this.urls().getVerifyImage + phone,
      method: 'get',
      noJweToken: true,
      progress: false
    });
  },
  checkVerifyImage(phone: string, x: number){
    return request({
      url: `${base}/open/checkImageCode?phone=${phone}&x=${x}`,
      method: 'get',
      noJweToken: true,
      progress: false,
      delStatus: false
    });
  },
  getResetPasswordToken(phoneNumber: string, verifyCode: string){
    return request({
      url: this.urls().getResetPasswordToken,
      method: 'post',
      noJweToken: true,
      progress: false,
      data: {
        phoneNumber: phoneNumber,
        verifyCode: verifyCode
      }
    });
  },
  resetPasswordByToken(token: string, password: number){
    return request({
      url: this.urls().resetPasswordByToken,
      method: 'post',
      noJweToken: true,
      progress: false,
      data: {
        token: token,
        password: password
      }
    });
  }
};

export default OpenApi;
