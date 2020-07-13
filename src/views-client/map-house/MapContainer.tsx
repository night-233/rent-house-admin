import React, {useEffect} from "react";
import styled from "styled-components";
// @ts-ignore
import BMap from 'BMap';
import {useSelector} from 'react-redux'
/**
 * 地图容器
 */
const MapContainer = () => {


    const city = useSelector(state => state.common.city);

    useEffect(() => {
        if(city.enName){
            const map = new BMap.Map("map-search-house", {enableMapClick:false, minZoom: 11,maxZoom: 15}); // 创建Map实例
            map.setCurrentCity(city.cnName);
            map.enableScrollWheelZoom(true);
            map.centerAndZoom(new BMap.Point(city.baiduMapLng, city.baiduMapLat), 11);  // 初始化地图,设置中心点坐标和地图级别
        }
    }, [city.enName]);

    return (
        <Container>
            <div id="map-search-house" className="map-search-house"/>
        </Container>
    )
};

const Container = styled.div`
    flex: 1;
    height: 100%;
    .map-search-house{
        height: 100%;
    }
`;
export default MapContainer;
