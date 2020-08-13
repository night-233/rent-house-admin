import React from "react";
import styled from "styled-components";
import {Col, Row} from "antd";
import {HouseBox} from "../home/HouseList";
import {useSelector} from "react-redux"


/**
 * 推荐房源
 */
const RecommendHouse = () => {


    const suggestHouses = useSelector(state => state.house.suggestHouses);

    return (
        <>
            {
                suggestHouses.length > 0 &&
                <Container>
                    <h2 className="title">推荐房源</h2>
                    <Row gutter={[21, 21]}>
                        {
                            suggestHouses.map(item =>  <Col span={8} key={item.id}><HouseBox data={item}/></Col>)
                        }
                    </Row>
                </Container>
            }
        </>
    )
};
const Container = styled.div`
    margin-top: 60px;
`;

export default RecommendHouse;
