import React from "react";
import styled from "styled-components";
import {useSelector} from 'react-redux'
import MenuPathRender from "@components/MenuPathRender";
import {CalendarFilled, HomeFilled, PlusSquareOutlined} from "@ant-design/icons/lib";
import renderRoutes from "@router/routingGuard";
import {Avatar} from "antd";
import UserMenuItemLayout from "@views-client/layout/UserMenuItemLayout";


const menuItemsMap = {
    "/user/account/person": {
        key: "/user/account/person",
        name: "个人信息",
        to: "/user/account/person",
        icon: <HomeFilled/>,
    },
    "/user/account/reset-password": {
        name: "修改密码",
    },
};
const menuItemArray = ["/user/account/person"];
/**
 *  账户中心入口
 * Created by Administrator on 2020/8/4
 */
const AccountCenterEntry = (props) => {

    const {route} = props;

    const user = useSelector(state => state.user.userInfo);

    return (
        <UserMenuItemLayout routes={route.routes} itemsMap={menuItemsMap} itemKeyArray={menuItemArray} leftHead={
            <div style={{textAlign: "center", margin: "20px auto"}}>
                <Avatar src={user.avatar} size={100} style={{fontSize: 25}}>{user.nickName}</Avatar>
                <p style={{marginTop: 10}}>{user.nickName}</p>
            </div>}
        />
    )
};

export default AccountCenterEntry;
