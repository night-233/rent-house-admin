import request from '@/utils/request';
import utils from "@utils";
import {TokenKey} from "@utils/cookie";


const OpenApi = {
  urls (key = '') {
    return {
      userLogin: `/open/login`,
      getLimits: `/open/limits`,
      sendMessage: `/open/sendSmsToPhone`,
      loginInNoPwd: `/open/noPassLogin`,
      registerPhone: `/open/registryByPhone`,
      judgeNickName: `/open/nickName`,
      checkPhoneExist: `/open/phone?phone=`,
      getVerifyImage: `/open/verifyImage?phone=`,
      getResetPasswordToken: `/open/getResetPasswordToken`,
      resetPasswordByToken: `/open/resetPasswordByToken`,
      logout: `/user/logout/${key}?token=${key}`,
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
      url: `/open/checkImageCode?phone=${phone}&x=${x}`,
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
  },
  // 登出用户
  logout (token){
    return request({
      url: this.urls(token).logout,
      noJweToken: true,
      method: 'delete',
    });
  },
};

export default OpenApi;
