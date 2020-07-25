import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
// @ts-ignore
import BMap from 'BMap';
import houseApi from '@/apis/house'
import { useSelector } from 'react-redux'
/**
 * 地图容器
 */
const MapContainer = () => {


  const city = useSelector(state => state.common.city);
  const [zoom, setZoom] = useState<any>();
  const [count, setCount] = useState<any>(0);
  let region: any
  // 创建Map实例
  const map = new BMap.Map("map-search-house", { enableMapClick: false, minZoom: 11, maxZoom: 15 });
  let mapZoomTimer: any = null


  const findCurrentCity = (obj) => {
    const data = region.aggData.find((item) => item.region === obj.enName)
    return data.count;
  }

  // label样式修改
  const addLabel = useCallback((pointObj) => {
    var point = new BMap.Point(pointObj.baiduMapLng, pointObj.baiduMapLat);
    var label = new BMap.Label(`<div><div>${pointObj.cnName}</div><div>${findCurrentCity(pointObj)}套</div></div>`);
    label.setStyle({
      maxWidth: 'none',
      color: "#fff",
      fontSize: "11px",
      border: "0",
      paddingTop: '15px',
      borderRadius: '50%',
      height: "60px",
      width: "60px",
      textAlign: "center",
      background: "#51c6cf",
      cursor: "pointer",
      position: "absolute",
      left: "-60px",
      top: "-60px"
    });
    findCurrentCity(pointObj);
    label.setPosition(point);
    map.addOverlay(label);
  }, [findCurrentCity, map, zoom])

  // 添加 label 覆盖物
  const dealRegionsData = useCallback((data) => {
    map.clearOverlays();  // 清除覆盖物
    data.regions.forEach((region) => {
      addLabel(region)
    })
  }, [addLabel, map])

  // 获取聚合信息
  const getMapRegions = useCallback(() => {
    const params = {
      cityEnName: city.enName
    }
    return houseApi.getMapRegions(params).then((res) => {
      if (res) {
        region = res
        dealRegionsData(res)
      }
    })
  }, [city.enName, dealRegionsData])

  useEffect(() => {
    if (city.enName) {
      map.setCurrentCity(city.cnName);
      setCount(3)
      map.enableScrollWheelZoom(true);
      map.centerAndZoom(new BMap.Point(city.baiduMapLng, city.baiduMapLat), 11);  // 初始化地图,设置中心点坐标和地图级别
      map.addEventListener('zoomend', () => {
        console.log('缩放事件:', count)
        if (mapZoomTimer) { clearTimeout(mapZoomTimer) }
        mapZoomTimer = setTimeout(() => {
          getMapRegions()
        }, 300)
      });
    }
  }, [city.baiduMapLat, city.baiduMapLng, city.cnName, city.enName, map]);

  useEffect(() => {
    getMapRegions()
  }, [city, getMapRegions])



  return (
    <Container>
      <div id="map-search-house" className="map-search-house" />
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

