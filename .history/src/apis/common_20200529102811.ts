import request from '@/utils/request';

const base = '/dev';

export default {
  urls () {
    return {
      limits: `${base}/open/limits`,
    };
  },
  postImage () {
    return request({
      url: this.urls().limits,
      method: 'get',
    });
  },
};
