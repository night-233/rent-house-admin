import React, {useCallback, useEffect, useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import {Link} from "react-router-dom";
import Logo from "@assets/img/logo178-28.png"
import {AutoComplete, Input, message, Select} from "antd";
import LoginRegisterBtn from "@components/LogoRegisterBtn";
import {SearchOutlined} from "@ant-design/icons/lib";
import ArrowRightBottomPng from "@assets/img/arrow-right-bottom.png";
import SupportCityDropMenu from "@components/SupportCityDropMenu";
import {useSelector} from 'react-redux'
import BaiduApi from "@apis/baidu";
import { debounce } from "debounce";

const { Option } = Select;
/**
 * 头部
 */
const MapHeader = ({value, onSelect, onChange}) => {

    const city = useSelector(state => state.common.city);

    const [addressHintList, setAddressHintList] = useState([]);

    const [keyword, setKeyword] = useState();

     const debounceSearchKeyword = useCallback(debounce((value, cityCnName) => {
         if(value && cityCnName){
             BaiduApi.getAddressHint(value, cityCnName, 0, 5).then(res => {
                 if(res){
                     if(res.status === 0){
                         setAddressHintList(res.result);
                     }else{
                         message.error(res.message);
                     }
                 }
             });
         }else{
             setAddressHintList([]);
         }
     }, 300), []);

     const handleKeywordSelect = (value, option) => {
       onSelect(option);
     };

     useEffect(() => {
         setKeyword(value);
     }, [value]);

    return (
        <Container>
            <MapSearchDropdownGlobalStyle/>
            <div className="logo">
                <Link to="/client/home">
                    <img src={Logo} alt=""/>
                </Link>
            </div>
            <SupportCityDropMenu color="#444444" fontSize="16px">
                <div className="city-box">
                        <span className="current-city">{city.cnName} <img src={ArrowRightBottomPng} alt="" className="arrow-right-bottom"/></span>
                </div>
            </SupportCityDropMenu>
            <div className="search-input">
                <AutoComplete
                              allowClear={true}
                              value={keyword}
                              listHeight={300}
                              dropdownStyle={{padding: 0}}
                              onSearch={(value) => debounceSearchKeyword(value, city.cnName)}
                              onChange={(value) => {
                                  setKeyword(value);
                                  onChange(value);
                              }}
                              options={addressHintList.filter((item, index) => index < 5).map((item:any) => ({label: item.name, value: item.name, key: item.uid, location: item.location}))}
                              onSelect={handleKeywordSelect}
                              dropdownClassName="map-search-dropdown"
                >
                    <Input style={{height: 70, width: "100%", fontSize: "16px"}} placeholder="请输入小区丶商圈"
                           prefix={<SearchOutlined style={{color: "#b9b9b9", fontSize: "20px", margin: "0 15px 0 5px"}}/>}
                    />
                </AutoComplete>
            </div>
            <div className="login-register-btn">
                <LoginRegisterBtn/>
            </div>
        </Container>
    )
};
const MapSearchDropdownGlobalStyle = createGlobalStyle`
    .map-search-dropdown{
       .ant-select-item {
            position: relative;
            display: block;
            min-height: 44px;
            color: rgba(0, 0, 0, 0.65);
            font-weight: normal;
            -webkit-transition: background 0.3s ease;
            transition: background 0.3s ease;
            line-height: 44px;
            height: 44px;
            color: #666;
            cursor: pointer;
            font-size: 16px;
            padding-left: 20px;
            display: flex;
            align-items: center;
            &:hover{
                color: #FFFFFF;
                background: #51c6cf;
            }
        
       }
        .ant-select-item-option-active {
           color: #FFFFFF;
           background: #51c6cf !important;
        }
       div{
            overflow: hidden !important;
       }
    }
`;

const Container = styled.div`
    height: 70px;
    border-bottom: solid 1px #ddd;
    position: relative;
    box-sizing: content-box;
    z-index: 9;
    background: #fff;
    display: flex;
    .logo{
        padding: 21px 0px;
        margin-left: 32px;
        position: relative;
        z-index: 2;
        position: relative;
        width: 178px;
        height: 70px;
        img{
            width: 178px;
            height: 28px;
        }
    }
    .city-box{
        width: 100px;
        height: 70px;
        padding: 10px 0;
        text-align: center;
        font-size: 16px;
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
        .current-city{
            position: relative;
            display: inline-block;
            width: 60px;
            line-height: 20px;
            .arrow-right-bottom{
               position: absolute;
               right: 0;
               bottom: 0;
            }
        }
    }
    .search-input{
        flex: 1;
        border-left: solid 1px #ddd;
        height: 70px;
        position: relative;
    }
    .login-register-btn{
        font-size: 16px;
        margin: 0 20px;
    }
    .ant-select {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        -webkit-font-feature-settings: 'tnum', "tnum";
        font-feature-settings: 'tnum', "tnum";
        position: relative;
        display: inline-block;
        cursor: pointer;
        width: 100%;
    }
    .ant-input-affix-wrapper {
        position: relative;
        display: inline-block;
        width: 100%;
        min-width: 0;
        padding: 4px 11px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 16px;
        line-height: 1.5715;
        background-color: #fff;
        background-image: none;
        border: none;
        border-radius: 8px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        display: -ms-inline-flexbox;
        display: inline-flex;
        box-shadow: none !important;
    }
    .ant-input {
       font-size: 16px;
    }
    
`;

export default MapHeader;
