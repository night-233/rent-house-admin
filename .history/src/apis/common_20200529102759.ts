import request from '@/utils/request';

const base = '/dev';

export default {
  urls () {
    return {
      limits: `${base}/open/limits`,

    };
  },
  postImage (data: Object) {
    return request({
      url: this.urls().limits,
      method: 'get',
      data,
    });
  },
};
