import request, {requestWithoutDealStatus} from '@/utils/request';


const UserApi = {
  urls (key = '') {
    return {
      getUserInfo: `/user`,
      test: `/address/support/cities`,
      uploadUserAvatar: `/user/avatar/qiniu/${key}`,
      postImage: `/user/avatar/img`,
      removeUserLogo: `/user/avatar`,
      updateUserInfo: `/user/basicInfo`,
      uploadPhoto: `/user/upload/photo`,
      starHouse: `/user/house/${key}/star`,
      cancelStarHouse: `/user/house/${key}/star`,
      getUserStarHouseList: `/user/house/star/list`,
      reserveHouse: `/user/house/subscribe`,
      getReserveHouseList: `/user/house/subscribes`,
      cancelReserveHouse: `/user/house/${key}/subscribe`,
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
  clientGetUserInfo(){
    return request({
      url: this.urls().getUserInfo,
      method: 'get',
      delStatus: false
    });
  },
  // 收藏房源
  starHouse (houseId){
    return request({
      url: this.urls(houseId).starHouse,
      method: "post"
    })
  },
  // 取消收藏房源
  cancelStarHouse (houseId){
    return request({
      url: this.urls(houseId).cancelStarHouse,
      method: "delete"
    })
  },
  // 获取当前用户收藏的房源列表
  getUserStarHouseList (data){
    return request({
      url: this.urls().getUserStarHouseList,
      method: "post",
      data: data
    })
  },
  // 预约房源
  reserveHouse (data){
    return request({
      url: this.urls().reserveHouse,
      method: "post",
      data: data
    })
  },
  // 获取当前用户收藏的房源列表
  getReserveHouseList (data){
    return request({
      url: this.urls().getReserveHouseList,
      method: "post",
      data: data
    })
  },
  // 取消预约房源
  cancelReserveHouse (subscribeId){
    return request({
      url: this.urls(subscribeId).cancelReserveHouse,
      method: "delete",
    })
  },
  // 上传头像
  uploadPhoto (file){
    const form = new FormData();
    form.append('file', file);
    return request({
      url: this.urls().uploadPhoto,
      method: 'post',
      data: form
    });
  },

};
export default UserApi;
