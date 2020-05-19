import request from '@/utils/request';

const base = '/dev';

export default {
  urls () {
    return {
      adminLogin: `${base}/admin/login`,
      test: `${base}/address/support/cities`
    };
  },
  adminLogin (data: Object) {
    return request({
      url: this.urls().adminLogin,
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
