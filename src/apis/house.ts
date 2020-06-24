import request from '@/utils/request';

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
    getHouseList(searchData: HouseSearchForm){
        return request({
            url: `${base}/house/houses`,
            method: 'post',
            data: searchData
        });
    }
};

export default HouseApi;
