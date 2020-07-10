import React, {useEffect} from "react";
import styled from "styled-components";
// @ts-ignore
import BMap  from 'BMap';
/**
 * 地图容器
 */
const MapContainer = () => {


    useEffect(() => {
        const map = new BMap.Map("map-search-house", {enableMapClick:false}); // 创建Map实例
        map.setCurrentCity("杭州");
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    }, []);

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
