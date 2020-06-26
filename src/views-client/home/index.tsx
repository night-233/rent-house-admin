import React, {useEffect, useState} from "react";
import Header from "./Header";
import SearchBox from "./SearchBox";
import SearchFilter from "./SearchFilter";
import HouseList, {SortDirectionEnum, SortTypeEnum} from "./HouseList";
import RecentList from "./RecentList";
import styled from "styled-components";
import { useSelector } from 'react-redux'
import HouseApi from "@apis/house";
import {handleResponse} from "@utils/handle-reponse";
import {Skeleton, Spin} from "antd";


const initSearchParam = {
    cityEnName: "",
    page: 1,
    pageSize: 20,
    orderBy: SortTypeEnum.DEFAULT,
    sortDirection: SortDirectionEnum.DESC,
    keyword: null
}

/**
 * 客户端首页
 */
const ClientHome = () => {

    const city = useSelector(state => state.common.city);

    // 查询参数
    const [searchParams, setSearchParams] = useState(initSearchParam);

    // 房屋列表
    const [houseData, setHouseData] = useState({total: 0, list: []});

    // 最近浏览
    const [recentList, setRecentList] = useState([]);

    const [searchLoading, setSearchLoading] = useState(false);
    useEffect(() => {
        if(city.enName){
            getHouseList(initSearchParam);
            setSearchParams(initSearchParam);
        }
    }, [city.enName]);

    const getHouseList = (params, cancelToken ?) => {
        return handleResponse(HouseApi.getHouseList({...params, cityEnName: city.enName}, cancelToken), setHouseData, "获取房源失败", setSearchLoading);
    };

    const handleParamsChange = (params) => {
        const tmp = {...searchParams, ...params};
        setSearchParams(tmp);
        getHouseList(tmp);
    };

    const handleSearchClick = (value, cancelToken) => {
        const params = {...initSearchParam, keyword: value};
        setSearchParams(params);
        return getHouseList(params, cancelToken);
    };

    return(
        <Container>
            <Header/>
            <ContentContainer>
                <SearchBox onSearchClick={handleSearchClick} value={searchParams.keyword} onChange={value => setSearchParams(({...searchParams, keyword: value}))}/>
                <SearchFilter searchParams={searchParams} onChange={handleParamsChange}/>
                <Spin spinning={searchLoading}>
                    <HouseList data={houseData}
                               page={searchParams.page}
                               pageSize={searchParams.pageSize}
                               sort={{type: searchParams.orderBy, direction: searchParams.sortDirection}}
                               onSortChange={(type, direction) => handleParamsChange({orderBy: type, sortDirection: direction, page: 1})}
                               onPageChange={(page) => handleParamsChange({page: page})}
                               onPageSizeChange={(current, size) => handleParamsChange({pageSize: size, page: 1})}
                    />
                </Spin >
                {/*<RecentList/>*/}
            </ContentContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    position: absolute;
    background: #FFFFFF;
    color: rgba(0,0,0,.6);
    font-size: 14px;
    min-height: 100%;
`;

const ContentContainer = styled.div`
    min-height: 200px;
    width: 1152px;
    margin: 110px auto 0;
`;



export default ClientHome;
