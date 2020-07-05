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
/**
 * 周边配套
 */
const RoundService = () => {
    const [map, setMap] = useState<any>(null);

    const [mapSearchType, setMapSearchType] = useState(1); // 1: 上班通勤  2: 周边配套

    const [trafficType, setTrafficType] = useState(1); // 1: 公交 2: 步行  3: 驾车

    const [nearbyType, setNearbyType] = useState(1); // 1: 公交 2: 商超 3:教育  4: 餐饮  5: 金融  6: 医疗

    const [nearbyTrafficType, setNearbyTrafficType] = useState(1); // 1:地铁  2: 公交

    const [companyOptions, setCompanyOptions] = useState([]);

    const [targetCompanyLocation ,setTargetCompanyLocation] = useState();

    const [housePoint ,setHousePoint] = useState();

    const [isLocation, setIsLocation] = useState(true);

    const [suggestRoute, setSuggestRoute] = useState();

    const info = useSelector(state => state.house);

    useEffect(() => {
        if(info.city.cnName){
            var map = new BMap.Map("round-service-map"); // 创建Map实例
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
                    const houseIcon = new BMap.Icon(HouseImg, new BMap.Size(32, 32), {});
                    const pointerMarker = new BMap.Marker(point, {icon: houseIcon});
                    pointerMarker.setLabel(generateLabel(info.house.district));
                    map.addOverlay(pointerMarker);
                    setHousePoint({
                        lat: point.lat,
                        lng: point.lng
                    });
                } else {
                    message.warn("房源地址解析失败");
                }
            });
            map.addEventListener("dragend", () => {
               console.log("拖拽结束");
               setIsLocation(false);
            });
            setMap(map);
        }
    },  [info.city.cnName]);

    const generateLabel = (title, clazz = "label-marker") => {
        const span = `<span class=${clazz}>${title}</span>`
        const label = new BMap.Label(span, {
            offset: new BMap.Size(-10, -32)
        });
        label.setStyle({
            border: "none",
            background: "transparent"
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

    const handleCompanySelect = (value, option) => {
        setTargetCompanyLocation(option.location);
        searchSuggestRoute(housePoint, option.location, trafficType);
    };

    const searchSuggestRoute = (startPoint, endPoint, type) => {
        const center = {lat: (startPoint.lat + endPoint.lat) / 2, lng: (startPoint.lng + endPoint.lng) / 2};
        map.centerAndZoom(new BMap.Point(center.lng, center.lat), 19);
        const start = new BMap.Point(startPoint.lng, startPoint.lat);
        const end = new BMap.Point(endPoint.lng, endPoint.lat);
        let routeSuggestTmp = suggestRoute;
        if(routeSuggestTmp){
            routeSuggestTmp.clearResults();
        }
        switch (type) {
            case 1: routeSuggestTmp = new BMap.TransitRoute(map, {renderOptions: {map: map, panel: "r-result"},  onSearchComplete: function (res) {
                    console.dir(res);
                }});break;
            case 2: routeSuggestTmp =  new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true},  onSearchComplete: function (res) {
                    console.dir(res);
                }}); break;
            case 3: routeSuggestTmp =  new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true},  onSearchComplete: function (res) {
                    console.dir(res);
                }}); break;
            default:  routeSuggestTmp = new BMap.TransitRoute(map, {renderOptions: {map: map, panel: "r-result"}});break;
        }
        routeSuggestTmp.search(start, end);
        setSuggestRoute(routeSuggestTmp);
    };


    const handleLocationClick = () => {
      map.centerAndZoom(new BMap.Point(housePoint.lng, housePoint.lat), 19) ;
      setIsLocation(true)
    };

    const handleTrafficChange = (value) => {
        setTrafficType(value);
        if(targetCompanyLocation){
            searchSuggestRoute(housePoint, targetCompanyLocation, value);
        }
    };

    return (
        <Container id="components-anchor-round-service_4">
            <div id="diver"/>
            <h2 className="title">周边配套</h2>
            <div className="map-container">
                <div className="map-search-container">
                    <div className="map_nav">
                        <span className={`nav-item ${mapSearchType === 1 && "active"}`} onClick={() => setMapSearchType(1)}>上班通勤</span>
                        <span className={`nav-item ${mapSearchType === 2 && "active"}`} onClick={() => setMapSearchType(2)}>周边配套</span>
                    </div>
                    {/* 上班通勤 */}
                    {
                        mapSearchType === 1 &&
                        <div className="commute-search">
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
                    }
                    {/* 周边配套 */}
                    {
                        mapSearchType === 2 &&
                        <div className="round-service">
                            <div className="nearby-nav">
                                <span className={`type ${nearbyType === 1 && "active"}`} onClick={() => setNearbyType(1)}>公交</span>
                                <span className={`type ${nearbyType === 2 && "active"}`} onClick={() => setNearbyType(2)}>商超</span>
                                <span className={`type ${nearbyType === 3 && "active"}`} onClick={() => setNearbyType(3)}>教育</span>
                                <span className={`type ${nearbyType === 4 && "active"}`} onClick={() => setNearbyType(4)}>餐饮</span>
                                <span className={`type ${nearbyType === 5 && "active"}`} onClick={() => setNearbyType(5)}>金融</span>
                                <span className={`type ${nearbyType === 6 && "active"}`} onClick={() => setNearbyType(6)}>医疗</span>
                            </div>
                            {
                                nearbyType === 1 &&
                                <div className="traffic-way">
                                    <span className={`item ${nearbyTrafficType === 1 && "active"}`}  onClick={() => setNearbyTrafficType(1)}>地铁</span>
                                    <span className={`item ${nearbyTrafficType === 2 && "active"}`} onClick={() => setNearbyTrafficType(2)}>公交</span>
                                </div>
                            }
                            <Scrollbars style={{height: 200}} autoHeight>
                                <div className="service-item active">
                                    <div className="left">
                                        <div className="title">
                                            万润达商场
                                        </div>
                                        <div className="description">
                                            杭州市余杭区良运街与庙长桥路交叉路口往北约100米(山原宾馆南侧约100米)
                                        </div>
                                    </div>
                                    <div className="right">
                                        约973m
                                    </div>
                                </div>
                                <div className="service-item">
                                    <div className="left">
                                        <div className="title">
                                            万润达商场
                                        </div>
                                        <div className="description">
                                            杭州市余杭区良运街与庙长桥路交叉路口往北约100米(山原宾馆南侧约100米)
                                        </div>
                                    </div>
                                    <div className="right">
                                        约973m
                                    </div>
                                </div>
                                <div className="service-item">
                                    <div className="left">
                                        <div className="title">
                                            万润达商场
                                        </div>
                                        <div className="description">
                                            杭州市余杭区良运街与庙长桥路交叉路口往北约100米(山原宾馆南侧约100米)
                                        </div>
                                    </div>
                                    <div className="right">
                                        约973m
                                    </div>
                                </div>
                                <div className="service-item">
                                    <div className="left">
                                        <div className="title">
                                            万润达商场
                                        </div>
                                        <div className="description">
                                            杭州市余杭区良运街与庙长桥路交叉路口往北约100米(山原宾馆南侧约100米)
                                        </div>
                                    </div>
                                    <div className="right">
                                        约973m
                                    </div>
                                </div>
                                <div className="service-item">
                                    <div className="left">
                                        <div className="title">
                                            万润达商场
                                        </div>
                                        <div className="description">
                                            杭州市余杭区良运街与庙长桥路交叉路口往北约100米(山原宾馆南侧约100米)
                                        </div>
                                    </div>
                                    <div className="right">
                                        约973m
                                    </div>
                                </div>
                                <div className="service-item">
                                    <div className="left">
                                        <div className="title">
                                            万润达商场
                                        </div>
                                        <div className="description">
                                            杭州市余杭区良运街与庙长桥路交叉路口往北约100米(山原宾馆南侧约100米)
                                        </div>
                                    </div>
                                    <div className="right">
                                        约973m
                                    </div>
                                </div>
                                <div className="service-item">
                                    <div className="left">
                                        <div className="title">
                                            万润达商场
                                        </div>
                                        <div className="description">
                                            杭州市余杭区良运街与庙长桥路交叉路口往北约100米(山原宾馆南侧约100米)
                                        </div>
                                    </div>
                                    <div className="right">
                                        约973m
                                    </div>
                                </div>
                                <div className="service-item">
                                    <div className="left">
                                        <div className="title">
                                            万润达商场
                                        </div>
                                        <div className="description">
                                            杭州市余杭区良运街与庙长桥路交叉路口往北约100米(山原宾馆南侧约100米)
                                        </div>
                                    </div>
                                    <div className="right">
                                        约973m
                                    </div>
                                </div>
                            </Scrollbars>
                        </div>
                    }
                </div>
                <div className="house-location" style={{backgroundImage: `url( ${isLocation ? IconLocationActivePng : IconLocationPng})`}} onClick={handleLocationClick}/>
                <div className="round-service-map" id="round-service-map"/>
            </div>
        </Container>
    )

};

const Container = styled.div`
    margin-top: 60px;
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
                        flex: 7.8;
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
            }
       }
       .label-marker{
            background-color: #ffba15;
            border-radius: 30px;
            color: #fff;
            font-size: 15px;
            padding: 3px 6px;
            position: relative;
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
