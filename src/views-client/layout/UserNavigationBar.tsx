import React, {useEffect, useState} from "react";
import styled from "styled-components";
import LogoUserPng from "@assets/img/logo-user.png";
import {Menu} from "antd";
import {AccountBookOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons/lib";
import LoginRegisterBtn from "@components/LogoRegisterBtn";
import {Link, useHistory} from "react-router-dom";
import MenuItem from "antd/es/menu/MenuItem";
import MenuPathRender from "@components/MenuPathRender";


const menuItemMap = {
    "/user/center": {
        key: "/user/center",
        name: "个人中心",
        to: "/user/center/center",
        icon: <HomeOutlined/>,
    },
    "/user/document": {
        key: "/user/document",
        name: "我的资料",
        to: "/user/document/center",
        icon: <UserOutlined/>,
    },
    "/user/account": {
        key: "/user/account",
        name: "我的账户",
        to: "/user/account/center",
        icon: <AccountBookOutlined/>,
    }
};
const menuItemArray = ["/user/center", "/user/document", "/user/account"];

/**
 * 用户主页导航栏
 * Created by Administrator on 2020/7/29
 */
const UserNavigationBar = () => {

    return (
        <Container>
            <div className="area">
                <Link to="/client/home">
                    <img src={LogoUserPng} alt=""/>
                </Link>
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
   // border-top: solid 1px #ccc;
   // border-bottom: solid 1px #ccc;
    // border-bottom: solid 2px #51c6cf;
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
`;

export default UserNavigationBar;
