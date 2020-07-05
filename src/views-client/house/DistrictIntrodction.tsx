import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux"
/**
 * 小区简介
 * @constructor
 */
const DistrictIntroduction = () => {

    const houseInfo = useSelector(state => state.house.house);

    const houseCountInDistrict = useSelector(state => state.house.houseCountInDistrict);

    return (
        <Container id="components-anchor-district-info_3">
            <div className="nav-container">
                <h2 className="title">小区简介</h2>
                <div className="district-container">
                    <div className="district-img">
                        <img src="http://img.ljcdn.com/hdic-resblock/m_fill,w_800,l_ziroom,lg_south_east,lx_-0.0625w,ly_-0.0625w,q_50/8d947eb0-4e6f-411c-8be4-c6a9fc9889a0.jpg" alt=""/>
                    </div>
                    <div className="district-info">
                        <div className="district-name">{houseInfo.district}</div>
                        <div className="district-body">
                            <div className="info-block">
                                <span className="label">建筑年代</span>
                                <span className="value"> {houseInfo.buildYear}</span>
                            </div>
                            <div className="info-block">
                                <span className="label">建筑类型</span>
                                <span className="value">板楼</span>
                            </div>
                            <div className="info-block">
                                <span className="label">绿化率</span>
                                <span className="value"> 40%</span>
                            </div>
                            <div className="info-block">
                                <span className="label">容积率</span>
                                <span className="value"> 2.8</span>
                            </div>
                            <div className="info-block">
                                <span className="label">物业公司</span>
                                <span className="value">绿城物业</span>
                            </div>
                            <div className="info-block">
                                <span className="label">物业电话</span>
                                <span className="value">86887100</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="house-more">
                    {houseInfo.district}{houseCountInDistrict}套在租房源
                </div>
            </div>
        </Container>
    )
};

const Container = styled.div`
    .district-container{
        display: flex;
        .district-img{
            border-radius: 2px;
            float: left;
            height: 205px;
            overflow: hidden;
            width: 307px;
            img{
                border-radius: 2px;
                width: 100%;
            }
        }
        .district-info{
            margin-left: 20px;
            width: 436px;
            .district-name{
                color: rgba(0,0,0,.85);
                font-size: 20px;
                margin: 3px 0 1px;
                font-weight: 600;               
            }
            .district-body{
                display: flex;
                flex-wrap: wrap;
                .info-block{
                    margin-top: 15px;
                    font-size: 17px;
                    width: 218px;
                    .label{
                        color: rgba(0,0,0,.4);
                        display: inline-block;
                        margin-right: 14px;
                        min-width: 68px;
                    }
                    .value{
                        color: rgba(0,0,0,.85);
                    }
                }
            }
        }
    }
    .house-more{
        border-radius: 2px;
        color: #000;
        cursor: pointer;
        display: block;
        font-size: 17px;
        height: 46px;
        line-height: 46px;
        margin-top: 30px;
        position: relative;
        text-align: center;
        width: 100%;
        &:before{
            border: 1px solid rgba(0,0,0,.4);
            border-radius: 4px;
            box-sizing: border-box;
            color: #000;
            color: rgba(0,0,0,.4);
            content: " ";
            height: 200%;
            left: 0;
            position: absolute;
            top: 0;
            transform: scale(.5);
            transform-origin: 0 0;
            width: 200%;
            z-index: 1;
        }
    }
`;
export default DistrictIntroduction;
