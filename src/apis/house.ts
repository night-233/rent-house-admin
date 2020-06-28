import request from '@/utils/request';
import {CancelTokenSource} from 'axios'

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
const base = '/dev';

const HouseApi = {

    // 房屋列表搜索
    getHouseList(searchData: HouseSearchForm, cancelToken ?: CancelTokenSource){
        return request({
            url: `${base}/house/houses`,
            method: 'post',
            data: searchData,
            cancelToken: cancelToken?.token,
            noJweToken: true
        });
    },
    // 搜索提示
    getAutoComplete(prefix: string){
        return request({
            url: `${base}/house/search/autocomplete?prefix=` + prefix,
            method: "get",
            progress: false,
            noJweToken: true
        })
    }
};

export default HouseApi;
