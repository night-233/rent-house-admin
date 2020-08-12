import request, {requestWithoutDealStatus} from '@/utils/request';

const base = '/dev';

const UserApi = {
  urls (key = '') {
    return {
      getUserInfo: `${base}/user`,
      test: `${base}/address/support/cities`,
      uploadUserAvatar: `${base}/user/avatar/qiniu/${key}`,
      postImage: `${base}/user/avatar/img`,
      removeUserLogo: `${base}/user/avatar`,
      updateUserInfo: `${base}/user/basicInfo`,
      uploadPhoto: `${base}/user/upload/photo`,
      starHouse: `${base}/user/house/${key}/star`,
      cancelStarHouse: `${base}/user/house/${key}/star`,
      getHouseOperate: `${base}/user/house/${key}/operate`,
      getUserStarHouseList: `${base}/user/house/star/list`,
      reserveHouse: `${base}/user/house/subscribe`,
      getReserveHouseList: `${base}/user/house/subscribes`,
      cancelReserveHouse: `${base}/user/house/${key}/subscribe`,
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
  // 判断当前用户是否了指定房源
  getHouseOperate (houseId){
    return request({
      url: this.urls(houseId).getHouseOperate,
      method: "get"
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
