import React from "react";
import styled from "styled-components";
import {Col, Row} from "antd";
import {HouseBox} from "../home/HouseList";


/**
 * 推荐房源
 */
const RecommendHouse = () => {

    const house = {"id":56,"title":"坐落在建国北路滴房子","price":1900,"area":18,"room":1,"floor":1,"totalFloor":1,"watchTimes":0,"buildYear":2013,"status":1,"createTime":"2020-06-27T18:04:54.000+0000","lastUpdateTime":"2020-06-27T18:04:54.000+0000","cityEnName":"hz","regionEnName":"xcq","cover":"http://qiniu.touchfish.top/Fi1RH0pC2lyywjSXRSPEPiuBpRWp","direction":3,"distanceToSubway":100,"parlour":1,"district":"大成名作","adminId":2,"bathroom":1,"street":"建国北路","tags":["独立卫生间","独立阳台","空调","精装修","集体供暖"],"housePictureList":null,"houseDetail":{"id":60,"description":"无fuck说","layoutDesc":"3室1厅2卫 18平","traffic":"hello world","roundService":"hello world","rentWay":1,"address":"下城区建国北路大成名作","subwayLineId":9,"subwayLineName":"2号线","subwayStationId":119,"subwayStationName":"建国北路站","houseId":56}};

    return (
        <Container>
            <h2 className="title">推荐房源</h2>
            <Row gutter={[21, 21]}>
                <Col span={8}><HouseBox data={house}/></Col>
                <Col span={8}><HouseBox data={house}/></Col>
                <Col span={8}><HouseBox data={house}/></Col>
            </Row>
        </Container>
    )
};
const Container = styled.div`
    margin-top: 60px;
`;

export default RecommendHouse;
