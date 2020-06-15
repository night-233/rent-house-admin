import request from '@/utils/request';

const base = '/dev';
/**
 * 地区与地铁接口
 */

export default {
  urls () {
    return {
      getHouseList: `${base}/admin/houses`,
      uploadPhoto: `${base}/admin/house/upload/photo`,
      addHouses: `${base}/admin/house/add`
    };
  },
  getHouseList (data: Object) {
    return request({
      url: this.urls().getHouseList,
      method: 'post',
      data,
    });
  },
  uploadPhoto (file: Blob) {
    const form = new FormData();
    form.append('file', file);
    return request({
      url: `${base}/admin/house/upload/photo`,
      method: 'post',
      data: form
    });
  },
  addHouse (houseForm) {
    return request({
      url: `${base}/admin/house/add`,
      method: 'post',
      data: houseForm
    });
  }

};
