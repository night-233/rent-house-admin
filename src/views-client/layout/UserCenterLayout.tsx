import React from "react";
import styled from "styled-components";
import {CalendarFilled, HeartFilled, HomeFilled} from "@ant-design/icons/lib";
import MenuPathRender from "@components/MenuPathRender";
import renderRoutes from "@/router/routingGuard";

const menuItemsMap = {
    "/user/center/center": {
        key: "/user/center/center",
        name: "个人中心",
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
 * 用户个人中心布局
 * Created by Administrator on 2020/7/29
 */
const UserCenterLayout = (props) => {

    const {route} = props;

    return (
        <Container>
            <div className="side-left left">
                <MenuPathRender itemsMap={menuItemsMap} itemKeyArray={menuItemArray} style={{textAlign: "center"}}/>
            </div>
           <div className="side-right">
                {renderRoutes(route.routes)}
            </div>
        </Container>
    )
};
const Container = styled.div`
    .left{
        padding: 20px 0;
    }
    .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
        border-right: 0px solid #f0f0f0; 
    }
`;

export default UserCenterLayout;
