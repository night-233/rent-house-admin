import React, {useEffect, useState} from "react";
import styled from "styled-components";
import HouseImg from "../../assets/img/house.png";
// @ts-ignore
import BMap  from 'BMap';
import {AutoComplete} from "antd";
import {CheckOutlined} from "@ant-design/icons/lib";
import { Scrollbars } from 'react-custom-scrollbars';
/**
 * 周边配套
 */
const RoundService = () => {
    const [map, setMap] = useState(null);

    const [mapSearchType, setMapSearchType] = useState(1); // 1: 上班通勤  2: 周边配套

    const [trafficType, setTrafficType] = useState(1); // 1: 公交 2: 步行  3: 驾车

    const [nearbyType, setNearbyType] = useState(1); // 1: 公交 2: 商超 3:教育  4: 餐饮  5: 金融  6: 医疗

    const [nearbyTrafficType, setNearbyTrafficType] = useState(1); // 1:地铁  2: 公交

    useEffect(() => {
        var map = new BMap.Map("round-service-map"); // 创建Map实例
        const point = new BMap.Point(120.248408,30.250367);
        map.centerAndZoom(point, 19); // 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity("杭州"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        map.addControl(new BMap.NavigationControl());
        const houseIcon = new BMap.Icon(HouseImg, new BMap.Size(32, 32), {
        });
        const pointerMarker = new BMap.Marker(point, {icon: houseIcon});
        pointerMarker.setLabel(generateLabel("hello"));
        map.addOverlay(pointerMarker);
        setMap(map);
    }, []);

    const generateLabel = (title) => {
        const span = `<span class="label-marker">广孚联合国际中心</span>`
        const label = new BMap.Label(span, {
            offset: new BMap.Size(-10, -32)
        });
        label.setStyle({
            border: "none",
            background: "transparent"
        });
        return label;
    };

    return (
        <Container id="components-anchor-round-service_4">
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
                                />
                            </div>

                            <div className="traffic-ways">
                                <span className={`way ${trafficType === 1 && "active"}`} onClick={() => setTrafficType(1)}>公交</span>
                                <span className={`way ${trafficType === 2 && "active"}`}  onClick={() => setTrafficType(2)}>步行</span>
                                <span className={`way ${trafficType === 3 && "active"}`}  onClick={() => setTrafficType(3)}>驾车</span>
                            </div>
                            {
                                trafficType === 1 ?
                                    <Scrollbars style={{height: 220, marginTop: 10, width: "100%"}}
                                                autoHeight  className="traffic-route-container"
                                    >
                                        <div className="subway-item">
                                            <div className="item-title-active">402路 <CheckOutlined style={{fontWeight: "bold"}}/></div>
                                            <div className="item-detail-active">12.8 公里 &nbsp; | &nbsp;  40 分钟 &nbsp;  | &nbsp; 步行700米</div>
                                        </div>
                                        <div className="subway-item">
                                            <div className="item-title">402路</div>
                                            <div className="item-detail">12.8 公里 &nbsp; | &nbsp;  40 分钟 &nbsp;  | &nbsp; 步行700米</div>
                                        </div>
                                        <div className="subway-item">
                                            <div className="item-title">402路</div>
                                            <div className="item-detail">12.8 公里 &nbsp; | &nbsp;  40 分钟 &nbsp;  | &nbsp; 步行700米</div>
                                        </div>
                                        <div className="subway-item">
                                            <div className="item-title">402路</div>
                                            <div className="item-detail">12.8 公里 &nbsp; | &nbsp;  40 分钟 &nbsp;  | &nbsp; 步行700米</div>
                                        </div>
                                        <div className="subway-item">
                                            <div className="item-title">402路</div>
                                            <div className="item-detail">12.8 公里 &nbsp; | &nbsp;  40 分钟 &nbsp;  | &nbsp; 步行700米</div>
                                        </div>
                                        <div className="subway-item">
                                            <div className="item-title">402路</div>
                                            <div className="item-detail">12.8 公里 &nbsp; | &nbsp;  40 分钟 &nbsp;  | &nbsp; 步行700米</div>
                                        </div>
                                        <div className="subway-item">
                                            <div className="item-title">402路</div>
                                            <div className="item-detail">12.8 公里 &nbsp; | &nbsp;  40 分钟 &nbsp;  | &nbsp; 步行700米</div>
                                        </div>
                                    </Scrollbars>
                                    :
                                    <div className="suggest-route-detail">
                                        <p>9.8 公里 &nbsp; |  &nbsp; 2 小时1分钟</p>
                                    </div>
                            }
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
                .traffic-route-container{        
                    .subway-item{
                        &:hover{
                            background: rgba(0,0,0,.03);
                        }
                        position: relative;
                        padding: 14px 0px;
                        cursor: pointer;
                        .item-title{
                            margin:0px 0px 5px 0px;
                            font-size:14px;
                            color: rgba(0,0,0,.4)!important;
                        }
                        .item-title-active{
                            margin:0px 0px 5px 0px;
                            font-size:14px;
                            color: #FFC056;
                        }
                        .item-detail{
                            margin:5px 0px;
                            font-size:12px;
                            color: rgba(0,0,0,.4)!important;
                        }
                       .item-detail-active{
                            margin:5px 0px;
                            font-size:12px;
                            color: rgba(0,0,0,.85)!important
                       }
                        &:after{
                            border-bottom: 1px solid rgba(0,0,0,.12);
                            bottom: 0;
                            box-sizing: border-box;
                            color: #000;
                            color: rgba(0,0,0,.12);
                            content: " ";
                            height: 1px;
                            left: 0;
                            position: absolute;
                            right: 0;
                            transform: scale(.5);
                            transform-origin: 0 0;
                            width: 200%;
                        }
                    }
                }
                .suggest-route-detail{
                    padding: 29px 0px 0px 10px;
                    font-size: 13px;
                    color: #000000;
                }
            }
            // 上班通勤结束
            
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
       .round-service-map{
            height: 420px;
            margin: 0 auto;
            position: relative;
            width: 100%;
        }
    }
    // 地图搜索容器 结束
  
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

 
`;

export default RoundService;
