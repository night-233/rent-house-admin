import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import MapHeader from "@views-client/map-house/MapHeader";
import MapSearchFilter from "@views-client/map-house/MapSearchFilter";
import MapHouseList from "@views-client/map-house/MapHouseList";
import MapContainer from "@views-client/map-house/MapContainer";
import {SortDirectionEnum, SortTypeEnum} from "@components/HouseSortComponent";
import HouseApi from "@apis/house";
import {useSelector} from 'react-redux'
import {handleResponse} from "@utils/handle-reponse";
// 初始查询参数
const initSearchParam = {
    page: 1,
    pageSize: 5,
    orderBy: SortTypeEnum.DEFAULT,
    sortDirection: SortDirectionEnum.DESC,
    rentWay: null,
    priceMin: null,
    priceMax: null,
    direction: null,
    priceRange: null,
    tags: [],
    bounds: null
};
// 存储视野改变前的视野信息
let boundsStore = null;
// 存储视野改变前的 查询参数
let searchParamStore: any = null;

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

    const mapRef = useRef<any>();

    const [keyword, setKeyword] = useState();

    const [houseSearchLoading, setHouseSearchLoading] = useState(false);

    searchParamStore = searchParams;

    const city = useSelector(state => state.common.city);

    useEffect(() => {
        if(city.enName){
            handleClearAllFilter();
            setKeyword(null);
            boundsStore = null;
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
      const tmp = {...initSearchParam, bounds: boundsStore};
      setSearchParams(tmp);
      getHouseList(tmp, setHouseData);
    };

    // 处理地图视野改变
    const handleBoundsChange = (zoomLevel, bounds) => {
        // 缩放级别小于13不查询视野
        if(zoomLevel < 13){
            if(boundsStore != null){
                handleSearchFilterChange({...searchParamStore, bounds: null});
            }
            boundsStore = null;
            return;
        }
        // 如果缩放级别大于13则查询视野房源
        handleSearchFilterChange({...searchParamStore, bounds: bounds});
        boundsStore = bounds
    };

    return(
        <Container>
            <MapHeader value={keyword} onSelect={data => {
                console.log(data);
                const longitude = data.location?.lng;
                const latitude = data.location?.lat;
                const title = data.label;
                mapRef.current.zoomToPoint(title, longitude, latitude);
            }}  onChange={setKeyword}/>
            <MapSearchFilter searchParams={searchParams} onChange={handleSearchFilterChange} onClearAll={handleClearAllFilter}/>
            <Content>
                <MapHouseList orderBy={searchParams.orderBy} sortDirection={searchParams.sortDirection}
                              onSortChange={(type, direction) => handleSearchFilterChange({...searchParams, orderBy: type, sortDirection: direction})}
                              houseData={houseData}
                              onArriveBottom={handleArriveBottom}
                              loading={houseSearchLoading}
                />
                <MapContainer onBoundsChange={handleBoundsChange} childRef={mapRef}/>
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
