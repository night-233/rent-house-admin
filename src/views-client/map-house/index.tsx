import React, {useState} from "react";
import styled from "styled-components";
import MapHeader from "@views-client/map-house/MapHeader";
import MapSearchFilter from "@views-client/map-house/MapSearchFilter";
import MapHouseList from "@views-client/map-house/MapHouseList";
import MapContainer from "@views-client/map-house/MapContainer";
import {SortDirectionEnum, SortTypeEnum} from "@components/HouseSortComponent";
// 初始查询参数
const initSearchParam = {
    cityEnName: "",
    page: 1,
    pageSize: 5,
    orderBy: SortTypeEnum.DEFAULT,
    sortDirection: SortDirectionEnum.DESC,
    keyword: null,
    bound: {
        leftTopLongitude: null,
        leftTopLatitude: null,
        rightBottomLongitude: null,
        rightBottomLatitude: null
    }
};

/**
 * 地图找房
 */
const MapHouse = () => {

    // 查询参数
    const [searchParams, setSearchParams] = useState(initSearchParam);

    return(
        <Container>
            <MapHeader value={searchParams.keyword}/>
            <MapSearchFilter/>
            <Content>
                <MapHouseList orderBy={searchParams.orderBy} sortDirection={searchParams.sortDirection}
                              onSortChange={(type, direction) => setSearchParams({...searchParams, orderBy: type, sortDirection: direction, page: 1})}/>
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
