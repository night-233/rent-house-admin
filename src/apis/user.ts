import request from '@/utils/request';

const base = '/dev';

export default {
  urls (key = '') {
    return {
      getUserInfo: `${base}/user`,
      test: `${base}/address/support/cities`,
      uploadUserAvatar: `${base}/user/avatar/qiniu/${key}`,
      postImage: `${base}/user/avatar/img`,
      removeUserLogo: `${base}/user/avatar`,
      updateUserInfo: `${base}/user/basicInfo`,
    };
  },
  updateUserInfo (data: Object) {
    return request({
      url: this.urls().updateUserInfo,
      method: 'put',
      data,
    });
  },
  removeUserLogo () {
    return request({
      url: this.urls().removeUserLogo,
      method: 'delete',
    });
  },
  postImage (data: Object) {
    return request({
      url: this.urls().postImage,
      method: 'put',
      data,
    });
  },
  uploadUserAvatar (key) {
    return request({
      url: this.urls(key).uploadUserAvatar,
      method: 'put',
    });
  },
  getUserInfo () {
    return request({
      url: this.urls().getUserInfo,
      method: 'get',
    });
  },
  test () {
    return request({
      url: this.urls().test,
      method: 'get',
    });
  },
};
