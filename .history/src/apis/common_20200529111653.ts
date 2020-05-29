import request from '@/utils/request';

const base = '/dev';

export default {
  urls () {
    return {
      getLimits: `${base}/open/limits`,
    };
  },
  getLimits () {
    return request({
      url: this.urls().getLimits,
      method: 'get',
      noJweToken: true
    });
  },
};
