import React from "react";
import styled from "styled-components";
import Logo from "@assets/img/logo.png";
import {DownOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux'
import LoginRegisterBtn from "@components/LogoRegisterBtn";
import {Link} from "react-router-dom";
import SupportCityDropMenu from "@components/SupportCityDropMenu";

const Header = (props) => {

    const {fixed = true, showCity = true} = props;

    const city = useSelector(state => state.common.city);

    return (
        <Container fixed={fixed}>
            <div className="content">
                <div style={{display: "flex"}}>
                    <Link to="/client/home">
                        <LogoContainer src={Logo}/>
                    </Link>
                    {
                        showCity &&
                        <LocationContainer>
                            <SupportCityDropMenu>
                                <div className="city">
                                    <span style={{marginRight: "5px"}}>{city.cnName}</span><DownOutlined />
                                </div>
                            </SupportCityDropMenu>
                        </LocationContainer>
                    }
                </div>
                <div className="tab-menu">
                    <div className="item"><span className="title"> 首页 <span className="underline"/></span></div>
                    <div className="item"><span className="title"> 租房 <span className="underline"/></span></div>
                    <div className="item"><span className="title"> 一夜租房 <span className="underline"/></span></div>
                    <div className="item"><span className="title"> 拼室友 <span className="underline"/></span></div>
                    <div className="item"><span className="title"> APP下载 <span className="underline"/></span></div>
                    <div className="item"><span className="title"> 房东中心 <span className="underline"/></span></div>
                </div>
                <LoginRegisterBtn/>
            </div>
        </Container>
    )
};

const Container = styled.div`
    ${({fixed = true}: {fixed?: boolean}) => fixed ? 
    `
        position: fixed;
        top: 0;
        left: 0;
    `
    :
        ``
    }
    padding-left: calc(100vw - 100%);
    height: 60px;
    line-height: 60px;
    color: #fff;
    width: 100%;
    z-index: 11;
    -webkit-transition: none!important;
    transition: none!important;
    background-color: #fff;
    color: #000!important;
    color: rgba(0,0,0,.85)!important;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,.08);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.08);
    display: flex;
    justify-content: center;
    .content{
        width: 1152px;
        margin: 0 auto;
        position: relative;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .tab-menu{
        width: 400px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item{
            cursor: pointer;
            font-size: 15px;
            .title{
                padding: 9px 5px;
                position: relative;
                .underline{
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    -webkit-transform: translateX(-50%);
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    background: #51c6cf;
                    border-radius: 1px;
                    -webkit-transition: width .3s;
                    transition: width .3s;
                    will-change: width;
                }
                &:hover .underline{
                    width: 100%;
                }
            }
        }
    }
   
`;
const LogoContainer = styled.img`
    margin: 0;
    height: 100%;
    width: 160px;
    padding: 14px 0;
`;
const LocationContainer = styled.div`
    line-height: 25px;
    width: 92px;
    position: relative;
    height: 60px;
    padding: 14px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    .city{
        height: 25px;
        color: rgba(0,0,0,.4);
        line-height: 25px;
        width: 60px;
        border-radius: 25%;
        border: 1px solid rgba(0,0,0,.4);
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export default Header;
