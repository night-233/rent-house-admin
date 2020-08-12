import React from "react";
import {CalendarFilled, HeartFilled, HomeFilled} from "@ant-design/icons/lib";
import UserMenuItemLayout from "@views-client/layout/UserMenuItemLayout";

const menuItemsMap = {
    "/user/center/center": {
        key: "/user/center/center",
        name: "用户中心",
        to: "/user/center/center",
        icon: <HomeFilled/>,
    },
    "/user/center/star": {
        key: "/user/center/star",
        name: "我的收藏",
        to: "/user/center/star",
        icon: <HeartFilled/>,
    },
    "/user/center/reserve": {
        key: "/user/center/reserve",
        name: "我的约看",
        to: "/user/center/reserve",
        icon: <CalendarFilled/>,
    },
};
const menuItemArray = ["/user/center/center", "/user/center/star", "/user/center/reserve"];
/**
 * 用户个人中心入口
 * Created by Administrator on 2020/7/29
 */
const UserCenterEntry = (props) => {

    const {route} = props;

    return (
        <UserMenuItemLayout itemKeyArray={menuItemArray} itemsMap={menuItemsMap} routes={route.routes}/>
    )
};

export default UserCenterEntry;
