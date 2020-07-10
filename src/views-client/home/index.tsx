import React, {useEffect, useState} from "react";
import SearchBox from "./SearchBox";
import SearchFilter from "./SearchFilter";
import HouseList from "./HouseList";
import {useSelector} from 'react-redux'
import HouseApi from "@apis/house";
import {handleResponse} from "@utils/handle-reponse";
import styled from "styled-components";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {SortDirectionEnum, SortTypeEnum} from "@components/HouseSortComponent";
import SortOrderFilter from "@views-client/home/SortOrderFilter";


const initSearchParam = {
    cityEnName: "",
    page: 1,
    pageSize: 20,
    orderBy: SortTypeEnum.DEFAULT,
    sortDirection: SortDirectionEnum.DESC,
    keyword: null
};

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

    // 刷新过滤器
    const [flushFilter, setFlushFilter] = useState(false);

    const [searchLoading, setSearchLoading] = useState(false);
    useEffect(() => {
        if(city.enName){
            getHouseList(initSearchParam);
            setSearchParams(initSearchParam);
            setFlushFilter(!flushFilter);
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
        setFlushFilter(!flushFilter);
        return getHouseList(params, cancelToken);
    };

    return(
        <>
            <Header/>
            <ContentContainer>
                    <SearchBox onSearchClick={handleSearchClick} value={searchParams.keyword} onChange={value => setSearchParams(({...searchParams, keyword: value}))}/>
                    {
                        flushFilter ?
                            <SearchFilter key={1} searchParams={searchParams} onChange={handleParamsChange}/>
                            :
                            <SearchFilter key={2} searchParams={searchParams} onChange={handleParamsChange}/>
                    }
                    {
                        flushFilter ?
                            <SortOrderFilter key={3} sortType={searchParams.orderBy} sortDirection={searchParams.sortDirection} onSortChange={(type, direction) => handleParamsChange({orderBy: type, sortDirection: direction, page: 1})}/>
                            :
                            <SortOrderFilter key={4} sortType={searchParams.orderBy} sortDirection={searchParams.sortDirection} onSortChange={(type, direction) => handleParamsChange({orderBy: type, sortDirection: direction, page: 1})}/>
                    }
                    <HouseList data={houseData}
                               listLoading={searchLoading}
                               page={searchParams.page}
                               pageSize={searchParams.pageSize}
                               onPageChange={(page) => handleParamsChange({page: page})}
                               onPageSizeChange={(current, size) => handleParamsChange({pageSize: size, page: 1})}
                    />
                    {/*<RecentList/>*/}
                    <Footer/>
            </ContentContainer>
        </>
    )
}


const ContentContainer = styled.div`
    min-height: 200px;
    width: 1152px;
    margin: 110px auto 0;
    background-color: rgb(255, 255, 255);
`;


export default ClientHome;
