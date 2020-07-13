import React, {useEffect, useState} from "react";
import styled from "styled-components";
import MapHeader from "@views-client/map-house/MapHeader";
import MapSearchFilter from "@views-client/map-house/MapSearchFilter";
import MapHouseList from "@views-client/map-house/MapHouseList";
import MapContainer from "@views-client/map-house/MapContainer";
import {SortDirectionEnum, SortTypeEnum} from "@components/HouseSortComponent";
import HouseApi from "@apis/house";
import {useSelector} from 'react-redux'
import {handleResponse} from "@utils/handle-reponse";
import {house} from "@store/redux/house.redux";
// 初始查询参数
const initSearchParam = {
    page: 1,
    pageSize: 5,
    orderBy: SortTypeEnum.DEFAULT,
    sortDirection: SortDirectionEnum.DESC,
    keyword: null,
    bound: null,
    rentWay: null,
    priceMin: null,
    priceMax: null,
    direction: null,
    priceRange: null,
    tags: []
};

/**
 * 地图找房
 */
const MapHouse = () => {

    // 查询参数
    const [searchParams, setSearchParams] = useState(initSearchParam);

    const [houseData, setHouseData] = useState<any>({
        total: 0,
        list: [],
        dirty: false
    });

    const [houseSearchLoading, setHouseSearchLoading] = useState(false);

    const city = useSelector(state => state.common.city);

    useEffect(() => {
        if(city.enName){
            getHouseList(initSearchParam, setHouseData);
        }
    }, [city.enName]);

    // 获取房源列表
    const getHouseList = (params, callBack) => {
        handleResponse(HouseApi.mapSearchHouseList({...params, cityEnName: city.enName}), (data) => callBack({...data, dirty: true}), "获取房源信息失败", setHouseSearchLoading)
    };

    const handleArriveBottom = () => {
        const params = {...searchParams, page: searchParams.page + 1};
        setSearchParams(params);
        getHouseList(params, (data) => {
            setHouseData({
                ...data,
                total: data.total,
                list: [...houseData.list, ...data.list],
            })
        });
    };

    // 搜索过滤参数改变
    const handleSearchFilterChange = (params) => {
        const tmp = {...searchParams, ...params, page: 1};
        setSearchParams(tmp);
        getHouseList(tmp, setHouseData);
    };

    const handleClearAllFilter = () => {
      setSearchParams(initSearchParam);
      getHouseList(initSearchParam, setHouseData);
    };

    return(
        <Container>
            <MapHeader value={searchParams.keyword}/>
            <MapSearchFilter searchParams={searchParams} onChange={handleSearchFilterChange} onClearAll={handleClearAllFilter}/>
            <Content>
                <MapHouseList orderBy={searchParams.orderBy} sortDirection={searchParams.sortDirection}
                              onSortChange={(type, direction) => handleSearchFilterChange({...searchParams, orderBy: type, sortDirection: direction})}
                              houseData={houseData}
                              onArriveBottom={handleArriveBottom}
                              loading={houseSearchLoading}
                />
                <MapContainer/>
            </Content>
        </Container>
    )
};

const Container = styled.div`
    font-size: 16px;
    color: #444;
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
`;
const Content = styled.div`
    flex: 1;
    display: flex;
`;
export default MapHouse;
