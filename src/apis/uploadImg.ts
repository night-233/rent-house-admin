import request from '@/utils/request';

const base = '/dev';

export default {
  urls (key = '') {
    return {
      uploadUserAvatar: `${base}/user/avatar/qiniu/${key}`,
      postImage: `${base}/user/avatar/img`,
      removeUserLogo: `${base}/user/avatar`,
    };
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
};
