import request from '@/utils/request';

/**
 * 地区与地铁接口
 */

const AdminApi = {
  urls () {
    return {
      getHouseList: `/admin/houses`,
      uploadPhoto: `/admin/house/upload/photo`,
      addHouses: `/admin/house/add`
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
      url: `/admin/house/upload/photo`,
      method: 'post',
      data: form
    });
  },
  addHouse (houseForm) {
    return request({
      url: `/admin/house/add`,
      method: 'post',
      data: houseForm
    });
  },
  /**
   * 获取待编辑房源信息
   * @param houseId 房源id
   */
  getEditHouse(houseId){
    return request({
      url: `/admin/house/edit/` + houseId,
      method: "get",
      delStatus: false
    })
  },
  /**
   * 更新房源信息
   */
  updateHouse(houseForm){
    return request({
      url: `/admin/house/edit`,
      method: "put",
      data: houseForm
    })
  },
  updateHouseStatus(houseId: number, status: number){
    return request({
      url: `/admin/house/operate/${houseId}/${status}`,
      method: "put",
    })
  },
  getReserveData(data){
    return request({
      url: `/admin/house/subscribes`,
      method: "post",
      data: data
    })
  },
  cancelReserve(reserveId: number){
    return request({
      url: `/admin/house/subscribe/${reserveId}`,
      method: "delete",
    })
  },
  updateHouseReserveStatus(reserveId: number, status: (2 | 3)){
    return request({
      url: `/admin/house/subscribe/${reserveId}/${status}`,
      method: "put",
    })
  }
};
export default AdminApi;
