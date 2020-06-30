import React, {useEffect, useState} from "react";
import styled from "styled-components";
import HouseImg from "../../assets/img/house.png";
// @ts-ignore
import BMap  from 'BMap';
import {AutoComplete} from "antd";
/**
 * 周边配套
 */
const RoundService = () => {

    const [map, setMap] = useState(null);

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
        <Container>
            <h2 className="title">周边配套</h2>
            <div className="map-container">
                <div className="map-search-container">
                    <div className="map_nav">
                        <span className="nav-item active">上班通勤</span>
                        <span className="nav-item">周边配套</span>
                    </div>
                    <div className="commute-search">
                        <div className="company">
                            <span className="company-label">公司</span>
                            <AutoComplete
                                style={{ width: "244px" }}
                                placeholder="请输入你的公司"
                            />
                        </div>
                        <div className="traffic-ways">
                            <span className="way active">公交</span>
                            <span className="way">步行</span>
                            <span className="way">驾车</span>
                        </div>
                    </div>
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
            }
        }
       .round-service-map{
            height: 420px;
            margin: 0 auto;
            position: relative;
            width: 100%;
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
 
`;

export default RoundService;
