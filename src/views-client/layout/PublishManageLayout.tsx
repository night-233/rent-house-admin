import React from "react";
import styled from "styled-components";
import MenuPathRender from "@components/MenuPathRender";
import {CalendarFilled, HomeFilled, PlusSquareOutlined} from "@ant-design/icons/lib";
import renderRoutes from "@router/routingGuard";


const menuItemsMap = {
    "/user/publish/manage": {
        key: "/user/publish/manage",
        name: "房源管理",
        to: "/user/publish/manage",
        icon: <HomeFilled/>,
    },
    "/user/house-publish": {
        key: "/user/house-publish",
        name: "我要出租",
        to: "/user/house-publish",
        icon: <PlusSquareOutlined/>,
    },
    "/user/publish/reserve": {
        key: "/user/publish/reserve",
        name: "预约管理",
        to: "/user/publish/reserve",
        icon: <CalendarFilled/>,
    },
};
const menuItemArray = ["/user/publish/manage", "/user/house-publish", "/user/publish/reserve"];
/**
 *  发布管理布局
 * Created by Administrator on 2020/8/4
 */
const PublishManageLayout = (props) => {

    const {route} = props;

    return (
        <Container>
            <div className="side-left">
                <MenuPathRender itemsMap={menuItemsMap} itemKeyArray={menuItemArray} style={{textAlign: "center"}}/>
            </div>
            <div className="side-right">
                {renderRoutes(route.routes)}
            </div>
        </Container>
    )
};
const Container = styled.div`

`;

export default PublishManageLayout;
