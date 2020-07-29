import React, {useEffect, useState, useCallback, useRef, useImperativeHandle} from "react";
import styled from "styled-components";
import BaiduMapConfig from "@/config/baidu-map-config";
// @ts-ignore
import BMap from 'BMap';
import {useSelector} from 'react-redux'
import HouseApi from "@apis/house";
import {message} from "antd";
import LocationPng from "../../assets/img/location.png";

// 地图对象
let map:any = null;
// 区域标签
let regionLabels:any = [];

/**
 * 地图容器
 */
const MapContainer = ({onBoundsChange, childRef, houseList}) => {


    const city = useSelector(state => state.common.city);

    const [locationPng, setLocationPng] = useState();

    const [houseListLayerStore, setHouseListLayerStore] = useState<any>([]);

    useEffect(() => {
        if(city.enName){
            map = new BMap.Map("map-search-house", {enableMapClick:false, minZoom: 11,maxZoom: 18}); // 创建Map实例
            map.setCurrentCity(city.cnName);
            map.enableScrollWheelZoom(true);
            map.centerAndZoom(new BMap.Point(city.baiduMapLng, city.baiduMapLat), 12);  // 初始化地图,设置中心点坐标和地图级别
            getAggregationRegions(city.enName);
            map.addEventListener("dragend", handleBoundsChange);
            map.addEventListener("zoomend", handleBoundsChange);
        }
    }, [city.enName]);

    useImperativeHandle(childRef, () => ({
        zoomToPoint: (title, longiitude, latitude ) => {
            if(locationPng){
                map.removeOverlay(locationPng);
            }
            const point = new BMap.Point(longiitude, latitude);
            const locationIcon = new BMap.Icon(LocationPng, new BMap.Size(30, 40), {});
            const pointerMarker = new BMap.Marker(point,  {icon: locationIcon});
            map.getPanes().markerPane.style.zIndex = 500;
            map.addOverlay(pointerMarker);
            setLocationPng(pointerMarker);
            map.centerAndZoom(point, 15);
            pointerMarker.addEventListener("click", (e) => {
                map.setZoom(15);
                map.panTo(point);
            })
        }
    }));




    // 根据程序英文名获取聚合区域房源信息
    const getAggregationRegions = (cityEnName) => {
        HouseApi.mapCityHouseAgg(cityEnName).then(res => {
            if (res){
                drawRegion(res.regions, res.aggData);
            }
        })
    };

    // 绘制区域信息
    const drawRegion = (regionList: any, aggData) => {
        // 将聚合数据转换成map
        const aggMap = {};
        const polygonContext = {};
        for(let i = 0; i < aggData.length; i++){
            aggMap[aggData[i].region] = aggData[i].count;
        }
        for(let i = 0; i < regionList.length; i++){
            const point = new BMap.Point(regionList[i].baiduMapLng, regionList[i].baiduMapLat);
            const content = `<p class="region-title">${regionList[i].cnName}</p><p class="house-number">${aggMap[regionList[i].enName] || 0}套</p>`;
            const label = new BMap.Label(content, {
                position: point,
            });
            label.setStyle(regionStyle);
            map.addOverlay(label);

            // 添加行政区域覆盖物
            polygonContext[content] = [];
            const boundary = new BMap.Boundary();
            const addPolygon = (content) => {
                boundary.get(city.cnName + regionList[i].cnName, res => {
                    const count = res.boundaries.length;
                    if(count === 0){
                        message.error(`${city.cnName}-${regionList[i].cnName}边界获取失败`);
                        return;
                    }
                    for(let i = 0; i < count; i++){
                        const ply = new BMap.Polygon(res.boundaries[i], {strokeWeight: 2, strokeColor: "rgba(255, 98, 98, 0.90)", fillOpacity: 0.3, fillColor: "rgba(255, 98, 98, 0.90)"}); //建立多边形覆盖物
                        map.addOverlay(ply);  //添加覆盖物
                        polygonContext[content].push(ply);
                        ply.hide();
                    }
                })
            };
            addPolygon(content);

            // 添加区域的鼠标移入事件(展示地图区域位置)
            label.addEventListener("mouseover", (e) => {
                const boundaries = polygonContext[content] || [];
                label.setStyle({background: "rgba(255, 98, 98, 0.90)"});
                for(let i = 0; i < boundaries.length; i++){
                    boundaries[i].show();
                }
            });
            // 添加区域鼠标移出事件（隐藏地图区域位置）
            label.addEventListener("mouseout", (e) => {
                const boundaries = polygonContext[content] || [];
                label.setStyle({background: "#51C6CF"});
                for(let i = 0; i < boundaries.length; i++){
                    boundaries[i].hide();
                }
            });
            // 添加区域鼠标点击事件（点击时视野中心移动到当前店）
            label.addEventListener("click", (e) => {
               map.setZoom(14);
               map.panTo(point);
            });
            // 将labels存入自定义变量中
            regionLabels.push(label);
        }
        // 创建百度云麻点
        // const customLayer=new BMap.CustomLayer(BaiduMapConfig.geoTableId); //新建麻点图图层对象
    };

    // 地图缩放处理
    const handleBoundsChange = (e) => {
        const bounds = map.getBounds();
        // 西南
        const southWest = bounds.getSouthWest();
        // 东北
        const northEast = bounds.getNorthEast();
        const zoomLevel = map.getZoom();
        const boundsParam = {
            leftTopLongitude: southWest.lng,
            leftTopLatitude: northEast.lat,
            rightBottomLongitude: northEast.lng,
            rightBottomLatitude: southWest.lat,
        };
        // 小于13
        if(zoomLevel < 13){
            // 边界为空
            regionLabels.forEach(item => {
                item.show();
            });
        }else{
            // 转换成 左上和右下的坐标
            regionLabels.forEach(item => {
                item.hide();
            });
            // 绘制房源麻点
        }
        onBoundsChange(zoomLevel, boundsParam);
    };

    useEffect(() => {
        if(map){
            houseListLayerStore.forEach(overlay => {
                map.removeOverlay(overlay);
            });
            if(map.getZoom() >= 13){
                drawHousePoint(houseList);
            }
        }
    }, [houseList]);

    // 绘制房源点
    const drawHousePoint = (list) => {
        const tmp:any = [];
        list.forEach((house: any) => {
            if(house.location){
                const point = new BMap.Point(house.location?.lon, house.location?.lat);
                const content = `<div class="house-marker-content"><span class="title">${house.title}</span><span>￥${house.price}/月</span> <b/></div>`;
                const label = new BMap.Label(content, {
                    position: point,
                });
                label.setStyle(houseMarkerStyle);
                tmp.push(label);
                map.addOverlay(label);
            }
        });
        setHouseListLayerStore(tmp);
    };


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
    .region-title{
        margin-top: 25px;
        height: 26px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .house-number{
        font-size: 14px;
    }
    .BMapLabel{
        &:hover{
            z-index: 99 !important;
        }   
    }
    .house-marker-content {
        padding: 0 10px;
        position: relative;
        z-index: 2;
        white-space: nowrap;
        min-width: 60px;
        color: #FFFFFF;
        font-size: 12px;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.20);
        z-index:  9 !important;
        cursor: pointer;
        border: 0px solid rgb(255, 0, 0);
        background: #51C6CF;
        display: flex;
        height: 27px;
        line-height: 27px;
        .title{
            display: inline-block;
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
   
        b{
            border: 6px solid transparent;
            border-top-color: #51C6CF;
            border-top-width: 8px;
            display: block;
            width: 0;
            height: 0;
            position: absolute;
            left: 20px;
            top: 25px;
        }
        &:hover{
            background: rgba(255, 98, 98, 0.90);
            b{
                 border-top-color: rgba(255, 98, 98, 0.90);
            }
        }
    }
`;
const houseMarkerStyle = {
    border: "0px solid rgb(255, 0, 0)",
    backgroundColor: "rgba(255, 255, 255, 0)"
};
const regionStyle = {
    zIndex: 2,
    background: "#51C6CF",
    boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.10)",
    width: "94px",
    height:" 94px",
    border: "0px solid rgb(255, 0, 0)",
    borderRadius: "50%",
    textAlign: "center",
    fontSize:" 16px",
    color: "#FFFFFF",
    margin: "-50px 0 0 -50px",
    cursor: "pointer",
};
export default  React.memo(MapContainer);
