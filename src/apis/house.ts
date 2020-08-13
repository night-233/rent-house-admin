import request from '@/utils/request';
import { CancelTokenSource } from 'axios'
import {url} from "inspector";

interface HouseSearchForm {
  keyword?: string,
  cityEnName: string,
  regionEnName?: string,
  subwayLineId?: number,
  subwayStationId?: number,
  rentWay?: number,
  priceMin?: number,
  priceMax?: number,
  tags?: Array<String>,
  page?: number,
  pageSize?: number,
  orderBy?: string,
  sortDirection?: string,
  areaMin?: number,
  areaMax?: number,
}
// 地图房源表单查询
interface MapHouseSearchForm {
  cityEnName: string,
  regionEnName?: string,
  rentWay?: number,
  priceMin?: number,
  priceMax?: number,
  tags?: Array<String>,
  page?: number,
  pageSize?: number,
  orderBy?: string,
  sortDirection?: string,
  bounds?: MapBounds
}
// 地图视野范围
interface MapBounds {
  leftTopLongitude: number,
  leftTopLatitude: number,
  rightBottomLongitude: number,
  rightBottomLatitude: number,
}
const base = '/dev';

const HouseApi = {

  // 房屋列表搜索
  getHouseList (searchData: HouseSearchForm, cancelToken?: CancelTokenSource) {
    return request({
      url: `${base}/house/houses`,
      method: 'post',
      data: searchData,
      cancelToken: cancelToken?.token,
      noJweToken: true
    });
  },

  // 房源聚合
  getMapRegions (params) {
    return request({
      url: `${base}/house/map/${params.cityEnName}/regions`,
      method: 'get',
      params,
      noJweToken: true
    });
  },

  // 搜索提示
  getAutoComplete (prefix: string) {
    return request({
      url: `${base}/house/search/autocomplete?prefix=` + prefix,
      method: "get",
      progress: false,
      noJweToken: true
    })
  },
  // 通过房源id获取房源信息
  getHouseById (id: number) {
    return request({
      url: `${base}/house/${id}`,
      method: "get",
      progress: true,
      noJweToken: true,
      delStatus: false
    })
  },
  // 地图找房获取房源信息
  mapSearchHouseList (searchData: MapHouseSearchForm) {
    return request({
      url: `${base}/house/map/city/houses`,
      method: 'post',
      data: searchData,
      noJweToken: true
    });
  },
  // 城市房源聚合
  mapCityHouseAgg (cityEnName: string) {
    return request({
      url: `${base}/house/map/${cityEnName}/regions`,
      method: 'get',
      noJweToken: true
    });
  },
  findAllByIds (houseIdList) {
    return request({
      url: `${base}/house/houses/ids`,
      method: 'post',
      noJweToken: true,
      data: {
        houseIdList: houseIdList
      }
    });
  }
};

export default HouseApi;
