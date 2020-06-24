import React from "react";
import {Col, Row} from "antd";
import styled from "styled-components";
import {HouseBox} from "./HouseList";

const RecentList = () => {
    return (
    <RecentViewContainer>
        <h1>最近浏览</h1>
        <Row gutter={[21, 21]}>
            <Col span={8}><HouseBox/></Col>
            <Col span={8}><HouseBox/></Col>
            <Col span={8}><HouseBox/></Col>
        </Row>
    </RecentViewContainer>
    )
}
const RecentViewContainer = styled.div`
    h1{
        color: rgba(0,0,0,.85);
        margin: 40px 0 20px;
        font-size: 24px;
        font-weight: bold;
    }
`;
export default RecentList;
