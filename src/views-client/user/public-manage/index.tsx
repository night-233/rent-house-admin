import React from "react";
import {CalendarFilled, HomeFilled, PlusSquareOutlined} from "@ant-design/icons/lib";
import UserMenuItemLayout from "@views-client/layout/UserMenuItemLayout";


const menuItemsMap = {
    "/user/publish/manage": {
        key: "/user/publish/manage",
        name: "房源管理",
        to: "/user/publish/manage",
        icon: <HomeFilled/>,
    },
    "/user/publish/reserve": {
        key: "/user/publish/reserve",
        name: "预约管理",
        to: "/user/publish/reserve",
        icon: <CalendarFilled/>,
    },
    "/user/house-publish": {
        key: "/user/house-publish",
        name: "我要出租",
        to: "/user/house-publish",
        icon: <PlusSquareOutlined/>,
    },
};
const menuItemArray = ["/user/publish/manage", "/user/house-publish", "/user/publish/reserve"];
/**
 *  发布管理入口
 * Created by Administrator on 2020/8/4
 */
const PublishManageEntry = (props) => {

    const {route} = props;

    return (
        <UserMenuItemLayout routes={route.routes} itemsMap={menuItemsMap} itemKeyArray={menuItemArray}/>
    )
};

export default PublishManageEntry;
