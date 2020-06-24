import React, {useState} from "react";
import {AutoComplete, Input} from "antd";
import styled from "styled-components";
import MapBtnImage from "@assets/img/map-bg.png";
import { CSSTransition } from 'react-transition-group'
/**
 * 搜索栏
 * @constructor
 */
const SearchBox = () => {

    const [mapSearchBtnShow, setMapSearchBtnShow] = useState(false);
    const [searchBtnShow, setSearchBtnShow] = useState(false);

    return (
        <Container>
            <AutoComplete
                dropdownMatchSelectWidth={252}
            >
                <Input.Search size="large" placeholder="请输入小区/商圈/地铁站等..."  enterButton={
                    <div  onMouseOver={() => setSearchBtnShow(true)} onMouseLeave={() => setSearchBtnShow(false)}>
                        <CSSTransition in={searchBtnShow} classNames="slide"  timeout={300} >
                            <i className="hover-background"/>
                        </CSSTransition>
                        开始找房
                    </div>
                }/>
            </AutoComplete>

            <div className="map-btn" onMouseOver={() => setMapSearchBtnShow(true)} onMouseLeave={() => setMapSearchBtnShow(false)}>
                <i className="iconfont icon-location">
                    &#xe620;
                </i>
                <CSSTransition in={mapSearchBtnShow} classNames="slide"  timeout={300} >
                    <i className="hover-background"/>
                </CSSTransition>
                地图找房
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 798px;
    height: 50px;
    display: flex;
    .ant-input {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        font-variant: tabular-nums;
        list-style: none;
        -webkit-font-feature-settings: 'tnum', "tnum";
        font-feature-settings: 'tnum', "tnum";
        position: relative;
        display: inline-block;
        width: 411px;
        min-width: 0;
        height: 50px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 20px;
        padding: 15px 11px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 8px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }
    .ant-btn-lg {
        height: 50px;
        padding: 6.4px 15px;
        font-size: 16px;
        border-radius: 8px;
        width: 132px;
        position: relative;
        overflow: hidden;
    }
    .map-btn{
        width: 132px;
        margin-left: 20px;
        background: #fff url(${MapBtnImage}) no-repeat 50% scroll;
        background-size: cover;
        color: #000;
        color: rgba(0,0,0,.4);
        border: 1px solid #000;
        border: 1px solid rgba(0,0,0,.12);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .hover-background{
        position: absolute;
        top: -100%;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.1);
    }
    .icon-location{
        color: rgba(0,0,0,.85);
        font-size: 18px;
        font-weight: 500;
        margin-right: 2px;
    }
    .slide-enter{
        top: 100%;
    }
    .slide-enter-active{
        top: 0;
        transition: top 0.3s ease-in;
    }
    .slide-enter-done{
        top: 0;
    }
    .slide-exit{
        top: 0;
    }
    .slide-exit-active{
        top: -100%;
        transition: top  0.3s ease-in;
    }
    .slide-exit-done{
        top: -100%;
    }
`;
export default SearchBox;
