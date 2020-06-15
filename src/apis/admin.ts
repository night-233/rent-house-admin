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
<<<<<<< HEAD
      addHouses: `${base}/admin/house/add`
=======
      addHouse: `${base}/admin/house/add`,
>>>>>>> 完成房源编辑
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
  },
  /**
   * 通过房源id获取房源具体信息
   * @param houseId 房源id
   */
  getHouse(houseId){
    return request({
      url: `${base}/admin/house/` + houseId,
      method: "get"
    })
  },
  /**
   * 更新房源信息
   */
  updateHouse(houseForm){
    return request({
      url: `${base}/admin/house/edit`,
      method: "put",
      data: houseForm
    })
  }

};
