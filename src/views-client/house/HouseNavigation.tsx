import React from "react";
import styled from "styled-components";
import {Anchor} from "antd";
const { Link } = Anchor;

/**
 * 房屋信息导航栏
 */
const HouseNavigation = () => {

    return (
        <Container>
            <div className="page-nav">
                <Anchor style={{display: "flex"}} showInkInFixed={false}>
                    <Link href="#components-anchor-demo-basic" title="房源简介" />
                    <Link href="#components-anchor-demo-static" title="租约信息" />
                    <Link href="#components-anchor-demo-basic1" title="室友信息" />
                    <Link href="#components-anchor-demo-basic2" title="小区简介" />
                    <Link href="#components-anchor-demo-basic3" title="周边配套" />
                </Anchor>
            </div>
        </Container>
    )
};

const Container = styled.div`
    .page-nav{
        background-color: #fff;
        height: 49px;
        margin-top: 20px;
        margin-bottom: 10px;
        position: relative;
        z-index: 140;
        .ant-anchor {
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
            padding-left: 2px;
            display: flex;
        }
    }
`;

export default HouseNavigation;
