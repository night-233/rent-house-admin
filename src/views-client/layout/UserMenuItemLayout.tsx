import React from "react";
import styled from "styled-components";
import MenuPathRender, {MenuPathRenderProps} from "@components/MenuPathRender";
import renderRoutes from "@router/routingGuard";
import {useHistory} from "react-router";

/**
 * Created by Administrator on 2020/8/10
 */
const UserMenuItemLayout = (props: UserMenuItemLayoutProps) => {

    const {itemsMap, itemKeyArray, routes, leftHead} = props;

    const history = useHistory();

    return (
        <Container>
            <div className="side-left">
                {leftHead}
                <MenuPathRender itemsMap={itemsMap} itemKeyArray={itemKeyArray} style={{textAlign: "center"}}/>
            </div>
            <div className="side-right">
                <div className="right-title">{itemsMap[history.location.pathname]?.name}</div>
                <div className="right-content">
                    {renderRoutes(routes)}
                </div>
            </div>
        </Container>
    )
};
const Container = styled.div`
   .side-left{
        float: left;
        width: 200px;
        padding: 20px 0;
        border: solid 1px #eee;
        .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
            border-right: 0px solid #f0f0f0; 
        }
    }
    .side-right{
        float: right;
        position: relative;
        width: 980px;
        min-height: 500px;
        border: solid 1px #eee;
       .right-title{
            background: #fafafa;
            height: 50px;
            padding: 0 20px;
            font-size: 16px;
            border-bottom: solid 1px #eee;
            line-height: 50px;
       }
       .right-content{
            padding: 15px 30px 0;
       }
    }
`;

interface UserMenuItemLayoutProps extends MenuPathRenderProps{
    routes: Array<String>,
    leftHead?: any,
}
export default UserMenuItemLayout;
