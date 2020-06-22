import React from "react";
import Header from "@views/user-home/Header";
import styled from "styled-components";
import {AutoComplete, Input} from "antd";
import MapBtnImage from "@assets/img/map-bg.png";
/**
 * 客户端首页
 */
const UserHome = () => {

    return(
        <Container>
            <Header/>
            <ContentContainer>
                <SearchBoxContainer>
                    <AutoComplete
                        dropdownMatchSelectWidth={252}
                    >
                        <Input.Search size="large" placeholder="请输入小区/商圈/地铁站等..." enterButton={"开始找房"} />
                    </AutoComplete>

                    <div className="map-btn">
                        <i className="iconfont icon-location">
                            &#xe620;
                        </i>
                        <i className="hover-background"></i>
                        地图找房
                    </div>
                </SearchBoxContainer>
            </ContentContainer>
        </Container>
    )
}

const Container = styled.div`
    
`;

const ContentContainer = styled.div`
    min-height: 200px;
    width: 1152px;
    margin: 110px auto 0;
`;

const SearchBoxContainer = styled.div`
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
        &:hover .hover-background{
            top: 0;
        }
    }
    .hover-background{
        position: absolute;
        top: -100%;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.1);
        transition: top .3s;
    }
    .icon-location{
        color: rgba(0,0,0,.85);
        font-size: 18px;
        font-weight: 500;
        margin-right: 2px;
    }
`;

export default UserHome;
