import React from "react";
import styled from "styled-components";
import LogoUserPng from "@assets/img/logo-user.png";
import {AccountBookOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons/lib";
import LoginRegisterBtn from "@components/LogoRegisterBtn";
import {Link} from "react-router-dom";
import MenuPathRender from "@components/MenuPathRender";
import SupportCityDropMenu from "@components/SupportCityDropMenu";
import {DownOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux'
export const menuItemMap = {
    "/user/center": {
        key: "/user/center",
        name: "用户中心",
        to: "/user/center/center",
        icon: <HomeOutlined/>,
    },
    "/user/publish": {
        key: "/user/publish",
        name: "发布管理",
        to: "/user/publish/manage",
        icon: <UserOutlined/>,
    },
    "/user/account": {
        key: "/user/account",
        name: "我的账户",
        to: "/user/account/center",
        icon: <AccountBookOutlined/>,
    }
};
export const menuItemArray = ["/user/center", "/user/publish", "/user/account"];

/**
 * 用户主页导航栏
 * Created by Administrator on 2020/7/29
 */
const UserNavigationBar = () => {

    const city = useSelector(state => state.common.city);

    return (
        <Container>
            <div className="area">
                <Link to="/client/home">
                    <img src={LogoUserPng} alt=""/>

                </Link>
                <SupportCityDropMenu>
                    <div className="city">
                        <span style={{marginRight: "5px"}}>{city.cnName}</span><DownOutlined/>
                    </div>
                </SupportCityDropMenu>
                <MenuPathRender itemsMap={menuItemMap} itemKeyArray={menuItemArray} type="parent" mode="horizontal" className="item-list"/>
                <div style={{position: "absolute", right: 0}}>
                    <LoginRegisterBtn/>
                </div>
            </div>
        </Container>
    )
};
const Container = styled.div`
    z-index: 98;
    background: #fff;
    padding-left: calc(100vw - 100%);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.08);
    height: 60px;
    .area{
        width: 1200px;
        height: 100%;
        margin: 0px auto;
        text-align: left;
        display: flex;
        flex: 1;
        align-items: center;
        cursor: pointer;
        position: relative;
        .item-list{
            margin-left: 60px;
            .ant-menu-item{
                border-bottom: 0 solid #51c6cf;
                font-size: 16px;
            }
            .ant-menu-item-selected{
                font-weight: 700;
                font-size: 18px;
            }
        }
    }
    .city{
        font-size: 16px;
        margin-left: 20px;
        color: #000000;
        font-weight: 500;
    }
`;

export default UserNavigationBar;
