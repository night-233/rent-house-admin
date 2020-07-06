import React, {useEffect, useState} from "react";
import styled from "styled-components";
import HouseImg from "../../assets/img/house.png";
// @ts-ignore
import BMap  from 'BMap';
import {AutoComplete, message} from "antd";
import {CheckOutlined} from "@ant-design/icons/lib";
import {useSelector} from "react-redux"
import { Scrollbars } from 'react-custom-scrollbars';
import { debounce } from "debounce";
import BaiduApi from "@apis/baidu";
import IconCheckPng from "../../assets/img/icon-check.png";
import IconLocationPng from "../../assets/img/icon-location.png";
import IconLocationActivePng from "../../assets/img/icon-location-active.png";
import {house} from "@store/redux/house.redux";

const { Option } = AutoComplete;

// 周边服务类型
const roundServiceType = ["交通", "商超", "教育", "餐饮", "金融", "医疗"];
/**
 * 周边配套
 */
const RoundService = () => {
    const [map, setMap] = useState<any>(null);

    const [mapSearchType, setMapSearchType] = useState(1); // 1: 上班通勤  2: 周边配套

    const [trafficType, setTrafficType] = useState(1); // 1: 公交 2: 步行  3: 驾车

    const [nearbyType, setNearbyType] = useState(0); // 0: 交通 1: 商超 2:教育  3: 餐饮  4: 金融  5: 医疗

    const [nearbyTrafficType, setNearbyTrafficType] = useState(1); // 1:地铁  2: 公交

    const [companyOptions, setCompanyOptions] = useState([]);

    const [targetCompanyLocation ,setTargetCompanyLocation] = useState();

    const [housePoint ,setHousePoint] = useState();

    const [isLocation, setIsLocation] = useState(true);

    const [suggestRoute, setSuggestRoute] = useState();

    const [roundServiceList, setRoundServiceList] = useState<any>([]);

    const [activeMarker, setActiveMarker] = useState();

    const info = useSelector(state => state.house);

    useEffect(() => {
        if(info.city.cnName){
            const map = new BMap.Map("round-service-map", {enableMapClick:false}); // 创建Map实例
            map.addControl(new BMap.NavigationControl());
            // 解析房屋位置 将地址解析结果显示在地图上,并调整地图视野
            const geo = new BMap.Geocoder();
            const cityCnName = info.city.cnName;
            const regionCnName = info.city.cnName;
            const houseAddress = info.house.houseDetail.address;
            const address = cityCnName + regionCnName + houseAddress;
            map.setCurrentCity(cityCnName);
            geo.getPoint(address, function(point) {
                if (point) {
                    map.centerAndZoom(point, 19);
                    drawHousePoint(map, point);
                } else {
                    message.warn("房源地址解析失败");
                }
            });
            map.addEventListener("dragend", () => {
               setIsLocation(false);
            });
            setMap(map);
        }
    },  [info.city.cnName]);

    // 绘制房屋点
    const drawHousePoint = (map, point) => {
        const houseIcon = new BMap.Icon(HouseImg, new BMap.Size(32, 32), {});
        const pointerMarker = new BMap.Marker(point, {icon: houseIcon});
        pointerMarker.setZIndex(1000);
        const label = generateLabel(info.house.district);
        label.setZIndex(1000);
        pointerMarker.setLabel(label);
        map.addOverlay(pointerMarker);
        setHousePoint({
            lat: point.lat,
            lng: point.lng
        });
    };

    // 生成地图标签
    const generateLabel = (title, clazz = "label-marker", offset = new BMap.Size(-10, -32)) => {
        const span = `<span class=${clazz}>${title}</span>`;
        const label = new BMap.Label(span, {
            offset: offset,
        });
        label.setStyle({
            border: "none",
            background: "transparent",
        });
        return label;
    };

    // 搜索公司地址
    const handleSearchCompany = debounce((value) => {
        if(value){
            BaiduApi.getAddressHint(value, info.city.cnName).then(res => {
                if(res){
                    if(res.status === 0){
                        setCompanyOptions(res.result)
                    }else{
                        message.error(res.message);
                    }
                }
            });
        }else{
            setCompanyOptions([]);
        }
    }, 500);

    // 处理公司选择
    const handleCompanySelect = (value, option) => {
        setTargetCompanyLocation(option.location);
        searchSuggestRoute(housePoint, option.location, trafficType);
    };

    // 搜索路线规划
    const searchSuggestRoute = (startPoint, endPoint, type) => {
        const center = {lat: (startPoint.lat + endPoint.lat) / 2, lng: (startPoint.lng + endPoint.lng) / 2};
       // map.centerAndZoom(new BMap.Point(center.lng, center.lat), 12);
        const start = new BMap.Point(startPoint.lng, startPoint.lat);
        const end = new BMap.Point(endPoint.lng, endPoint.lat);
        let routeSuggestTmp = suggestRoute;
        /*if(routeSuggestTmp){
            routeSuggestTmp.clearResults();
        }*/
        map.clearOverlays();
        switch (type) {
            case 1: routeSuggestTmp = new BMap.TransitRoute(map, {renderOptions: {map: map, panel: "r-result",  autoViewport: true}});break;
            case 2: routeSuggestTmp =  new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}}); break;
            case 3: routeSuggestTmp =  new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}}); break;
            default:  routeSuggestTmp = new BMap.TransitRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});break;
        }
        routeSuggestTmp.search(start, end);
        setSuggestRoute(routeSuggestTmp);
        drawHousePoint(map, housePoint)
    };

    // 处理定位点点击
    const handleLocationClick = () => {
      map.panTo(new BMap.Point(housePoint.lng, housePoint.lat)) ;
      setIsLocation(true)
    };

    // 处理交通方式改变
    const handleTrafficChange = (value) => {
        setTrafficType(value);
        if(targetCompanyLocation){
            searchSuggestRoute(housePoint, targetCompanyLocation, value);
        }
    };

     // 处理 上班通勤与周边配套切换
    const handleMapSearchTypeChange = (value) => {
        setMapSearchType(value);
        map.clearOverlays();
        if(value === 1){
            handleTrafficChange(trafficType);
            drawHousePoint(map, housePoint);
        }
        else if(value === 2){
            handleNearbyTypeChange(nearbyType);
        }
    };

    // 处理周边类型改变
    const handleNearbyTypeChange = (value) => {
        setNearbyType(value);
        let keyword: any = roundServiceType[value];
        if(value === 0){
            keyword = "地铁";
            setNearbyTrafficType(1);
        }
        if(value == 1){
            keyword = "商场超市";
        }
        setActiveMarker(null);
        roundSearchSearch(keyword)
    };

    // 处理周边类型公交方式改变
    const handleNearbyTrafficTypeChange = (value) => {
        setNearbyTrafficType(value);
        setActiveMarker(null);
        roundSearchSearch(value === 1 ? "地铁" : "公交");
    };

    // 周彪服务搜索 （4公里范围内）
    const roundSearchSearch = (keyword) => {
        const point = new BMap.Point(housePoint.lng, housePoint.lat);
        map.centerAndZoom(point, 15);
        const local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}, onMarkersSet: (arr) => {
            map.clearOverlays();
            const s: Array<any> = [];
            for (let i = 0; i < arr.length; i ++){
                s.push({
                    title: arr[i].title,
                    address: arr[i].address,
                    point: arr[i].point,
                    distance: calcDistance(housePoint, {lng: arr[i].point.lng, lat: arr[i].point.lat})
                });
                const label = generateLabel(arr[i].title, "label-marker-search", new BMap.Size(-22, -27));
                label.setPosition(arr[i].point);

                map.addOverlay(label);
                label.addEventListener("click", () => {
                    setActiveMarker(i);
                    handleMarkerClick(arr[i].point, arr[i].title, arr[i].message);
                });
            }
            setRoundServiceList(s);
            drawHousePoint(map, point);
        }});
        local.searchNearby(keyword ,point, 4000);
    };
    // 标注点点击处理
    const handleMarkerClick = (point, title, message) => {
        const opts = {
            width: 200,
            title : title , // 信息窗口标题
        };
        const infoWindow = new BMap.InfoWindow(message, opts);
        map.panTo(point);
        map.openInfoWindow(infoWindow, point); //开启信息窗口
        setIsLocation(false)
    };
    // 计算经纬度之间的距离
    const calcDistance = function(startPoint, endPoint){
        const radLat1 = startPoint.lat*Math.PI / 180.0;
        const radLat2 = endPoint.lat*Math.PI / 180.0;
        const a = radLat1 - radLat2;
        const b = startPoint.lng*Math.PI / 180.0 - endPoint.lng*Math.PI / 180.0;
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
            Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s *6378.137 ;// EARTH_RADIUS;
        s = Math.round(s * 1000);
        return s;
    };

    return (
        <Container id="components-anchor-round-service_4">
            <div id="diver"/>
            <h2 className="title">周边配套</h2>
            <div className="map-container">
                <div className="map-search-container">
                    <div className="map_nav">
                        <span className={`nav-item ${mapSearchType === 1 && "active"}`} onClick={() => handleMapSearchTypeChange(1)}>上班通勤</span>
                        <span className={`nav-item ${mapSearchType === 2 && "active"}`} onClick={() => handleMapSearchTypeChange(2)}>周边配套</span>
                    </div>
                    {/* 上班通勤 */}
                    <div className="commute-search" style={{display: mapSearchType === 1 ? "block" : "none"}}>
                        <div className="company">
                            <span className="company-label">公司</span>
                            <AutoComplete
                                style={{ width: "244px" }}
                                placeholder="请输入你的公司"
                                onSearch={handleSearchCompany}
                                onSelect={handleCompanySelect}
                            >
                                {companyOptions.filter((item: any) => item.location && item.uid).map((item:any) => <Option value={item.name} key={item.uid} location={item.location}>{item.name}</Option>)}
                            </AutoComplete>
                        </div>

                        <div className="traffic-ways">
                            <span className={`way ${trafficType === 1 && "active"}`} onClick={() => handleTrafficChange(1)}>公交</span>
                            <span className={`way ${trafficType === 2 && "active"}`}  onClick={() => handleTrafficChange(2)}>步行</span>
                            <span className={`way ${trafficType === 3 && "active"}`}  onClick={() => handleTrafficChange(3)}>驾车</span>
                        </div>
                        <Scrollbars style={{height: 220, marginTop: 10, width: "100%"}}
                        >
                            <div id="r-result" className="map-result"/>
                        </Scrollbars>
                    </div>
                    {/* 周边配套 */}
                    <div className="round-service" style={{display: mapSearchType === 2 ? "block" : "none"}}>
                            <div className="nearby-nav">
                                {
                                    roundServiceType.map((item, index) => <span key={index} className={`type ${nearbyType === index && "active"}`} onClick={() => index !== nearbyType && handleNearbyTypeChange(index)}>{item}</span>)
                                }
                            </div>
                            {
                                nearbyType === 0 &&
                                <div className="traffic-way">
                                    <span className={`item ${nearbyTrafficType === 1 && "active"}`}  onClick={() => 1 !== nearbyTrafficType && handleNearbyTrafficTypeChange(1)}>地铁</span>
                                    <span className={`item ${nearbyTrafficType === 2 && "active"}`} onClick={() =>  2 !== nearbyTrafficType && handleNearbyTrafficTypeChange(2)}>公交</span>
                                </div>
                            }
                            <Scrollbars style={{height: 200}}>
                                {
                                    roundServiceList.map((item, index) => (
                                    <div className={`service-item ` + (activeMarker === index && "active")}  key={index} onClick={() => {
                                        setActiveMarker(index);
                                        handleMarkerClick(item.point, item.title, item.address)
                                    }}>
                                        <div className="left">
                                            <div className="title">
                                                {item.title}
                                            </div>
                                            <div className="description">
                                                {item.address}
                                            </div>
                                        </div>
                                        <div className="right">
                                            约{item.distance}m
                                        </div>
                                    </div>))
                                }
                            </Scrollbars>
                        </div>
                </div>
                <div className="house-location" style={{backgroundImage: `url( ${isLocation ? IconLocationActivePng : IconLocationPng})`}} onClick={handleLocationClick}/>
                <div className="round-service-map" id="round-service-map"/>
            </div>
        </Container>
    )

};

const Container = styled.div`
    margin-top: 60px;
     .BMap_bubble_title {
        font-size: 13px;
        color: rgba(0,0,0,.85);
        line-height: 16px;
        font-weight: 600;
     }
     .BMap_pop div {
        border: 0!important;
     }
     .BMap_bubble_content {
        font-size: 12px;
        color: rgba(0,0,0,.4);
        line-height: 16px;
     }
    .map-container{
        position: relative;
        
       // 地图搜索容器
       .map-search-container{
            background: #fff;
            height: 380px;
            position: absolute;
            right: 20px;
            top: 20px;
            width: 360px;
            z-index: 10;;
            .map_nav {
                height: 55px;
                line-height: 55px;
                display: flex;
                .nav-item{
                    background: rgba(0,0,0,.03);
                    border-radius: 0 2px 2px 0;
                    color: #000;
                    color: rgba(0,0,0,.4);
                    cursor: pointer;
                    font-size: 17px;
                    width: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .active{
                    background: hsla(0,0%,100%,.03) !important;
                    color: #ff961e !important;
                }
            }
            // 上班通勤
            .commute-search{
                box-sizing: border-box;
                height: 300px;
                padding: 5px 30px 16px;
                position: relative;
                width: 100%;
                .company{
                    background: #fff;
                    height: 30px;
                    position: relative;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    .company-label{
                        display: inline-block;
                        width: 46px;
                        color: #000000;
                    }
                    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                        position: relative;
                        background-color: #fff;
                        border: none;
                        border-radius: 0;
                        border-bottom: 1px solid #d9d9d9;
                        -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                        width: 100%;
                        height: 32px;
                        padding: 0 11px;
                        box-shadow: none !important;
                    }
                    .ant-select {
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                        color: rgba(0, 0, 0, 1);
                        font-size: 16px;
                        font-variant: tabular-nums;
                        line-height: 1.5715;
                        list-style: none;
                        -webkit-font-feature-settings: 'tnum', "tnum";
                        font-feature-settings: 'tnum', "tnum";
                        position: relative;
                        display: inline-block;
                        cursor: pointer;
                    }
                }
                .traffic-ways{
                    font-size: 14px;
                    height: 24px;
                    margin-top: 21px;
                       .way{
                            border-radius: 16px;
                            color: rgba(0,0,0,.4);
                            cursor: pointer;
                            font-size: 13px;
                            margin-right: 5px;
                            padding: 5px 12px;
                        }
                        .active{
                            background-color: rgba(0,0,0,.6) !important;
                            color: #fff !important;
                        }
                }
                // 地图结果容器
                .map-result{
                    h1{
                        display: none;
                    }
                    .trans_plan_desc{
                        display: none !important;
                    }
                     div {
                        border: none!important;
                        background: transparent!important;
                    }
                    .tranroute-plan-list .trans-title p {
                        padding-right: 33px;
                        color: rgba(0,0,0,.4)!important;
                        font-size: 13px!important;
                    }
                    .tranroute-plan-list .trans-title{
                        position: relative;
                    }
                    .tranroute-plan-list.expand .trans-title p:first-child {
                        background: #fff url(${IconCheckPng});
                        color: #ff961e!important;
                        padding-right: 33px;
                        background-position: right -9px;
                        background-repeat: no-repeat;
                        background-size: 30px;
                    }
                    .tranroute-plan-list.expand .trans-title p:last-child {
                        color: rgba(0,0,0,.85)!important;
                    }
                    .tranroute-plan-list .trans-title:after {
                        content: " ";
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        height: 1px;
                        width: 200%;
                        border-bottom: 1px solid rgba(0,0,0,.12);
                        color: #000;
                        color: rgba(0,0,0,.12);
                        -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
                        -webkit-transform: scale(.5);
                        transform: scale(.5);
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                    }
                    .navtrans-arrow, .navtrans-navlist-icon, .navtrans-res, .suggest-plan {
                        display: none!important;
                    }
                    .suggest-plan-des {
                        text-align: left;
                        padding: 19px 0px 0px 0px;
                        font-size: 13px;
                        color: #000;
                    }
                    .navtrans-view a{
                        display: none;
                    }
                   
                }
                 // 上班通勤结束
            }
            // 地图结果容器结束
             // 周边配套
             .round-service{
                box-sizing: border-box;
                height: 300px;
                padding: 5px 30px 16px;
                position: relative;
                width: 100%;
                .nearby-nav{
                    height: 18px;
                    margin-bottom: 10px;
                    margin-top: 21px;
                    .type{
                        display: inline-block;
                        text-align: center;
                        border-radius: 16px;
                        color: rgba(0,0,0,.4);
                        cursor: pointer;
                        font-size: 13px;
                        margin-right: 5px;
                        padding: 4px 0;
                        width: 15%;
                    }
                    .active{
                        background-color: rgba(0,0,0,.6);
                        color: #fff;
                    }
                }
                .traffic-way{
                    color: rgba(0,0,0,.4);
                    font-size: 13px;
                    line-height: 24px;
                    .item{
                        margin-right: 14px;
                        padding: 0 0 4px;
                        cursor: pointer;
                    }
                    .active{
                        border-bottom: 1px solid #ff961e;
                        color: #ff961e;
                    }
                }
                .service-item{
                    background: #fff;
                    color: rgba(0,0,0,.85);
                    cursor: pointer;
                    font-size: 15px;
                    padding: 12px 30px 12px 0;
                    display: flex;
                    align-items: center;
                    &:hover{
                        background: rgba(0,0,0,.03);
                    }
                    .left{
                        width: 200px;
                        .title{
                            color: rgba(0,0,0,.85);
                            display: block;
                            font-size: 13px;
                            line-height: 14px;
                            font-weight: 600;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            margin: 0;
                        }
                        .description{
                            color: rgba(0,0,0,.4);
                            font-size: 12px;
                            line-height: 16px;
                            margin: 4px 0 0;
                        }
                    }
                    .right{
                        flex: 2.2;
                        font-size: 12px;
                        text-align: center;
                    }
                }
                .active{
                    color: #ff961e;
                    .left{
                        .title{
                            color: #ff961e;
                        }
                        .description{
                            color: #ff961e;
                        }
                    }
                }
             }
             // 周边配套结束
        }
        // 地图搜索容器 结束
       .house-location{
           cursor: pointer;
           box-sizing: border-box;
           border: 1px solid #d9d7d5;
           border-radius: 3px;
           -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,.2);
           position: absolute;
           bottom: 20px;
           left: 20px;
           background: #F7F7F7;
           width: 32px;
           height: 32px;
           z-index: 31;
           background-image: url(${IconLocationPng});
           background-size: 20px 20px;
           background-repeat: no-repeat;
           background-position: center center;

       }
       .round-service-map{
            height: 420px;
            margin: 0 auto;
            position: relative;
            width: 100%;
        }
       .label-marker-search{
            background-color: #51C6CF;
            border-radius: 30px;
            color: #fff;
            font-size: 15px;
            padding: 3px 6px;
            position: relative;
            z-index: 50;
            &:after{
                border-color: #51C6CF transparent transparent;
                border-style: solid;
                border-width: 10px 7px 0;
                bottom: -7px;
                content: "";
                height: 0;
                left: 17px;
                position: absolute;
                transform: rotate(9deg);
                width: 0;
                cursor: pointer;
            }
       }
       .label-marker{
            background-color: #ffba15;
            border-radius: 30px;
            color: #fff;
            font-size: 15px;
            padding: 3px 6px;
            position: relative;
            z-index: 80;
            &:after{
                border-color: #ffba15 transparent transparent;
                border-style: solid;
                border-width: 10px 7px 0;
                bottom: -7px;
                content: "";
                height: 0;
                left: 17px;
                position: absolute;
                transform: rotate(9deg);
                width: 0;
            }
       }
    }
    # 地图容器结束
  

`;

export default RoundService;
