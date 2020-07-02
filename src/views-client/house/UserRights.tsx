import React from "react";
import styled from "styled-components";

/**
 * 用户权益
 * @constructor
 */
const UserRights = () => {

    return (
        <Container>
            <div className="right-block">
                <h4 className="title">环保装修，密闭检测出租</h4>
                <p className="description">仅友家整租房源</p>
            </div>
            <div className="right-block">
                <h4 className="title">签约三天不满意，无理由换租</h4>
                <p className="description">转租、换租、续租、直租1.0、豪宅除外</p>
            </div>
            <div className="right-block">
                <h4 className="title">漏水保固，补偿日租金</h4>
                <p className="description">仅适用于友家、整租、直租和精选房源</p>
            </div>
            <div className="right-block">
                <h4 className="title">退租费用，三个工作日到账</h4>
                <p className="description">适用于所有房源</p>
            </div>
        </Container>
    )
};

const Container = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 30px;
    position: relative;
    width: 1152px;
    display: flex;
    .right-block{
        border-radius: 2px;
        height: 100px;
        margin-right: 20px;
        padding: 20px 5px 20px 20px;
        position: relative;
        width: 272px;
        &:before{
            border: 1px solid rgba(0,0,0,.12);
            border-radius: 4px;
            color: #000;
            color: rgba(0,0,0,.12);
            content: " ";
            height: 200%;
            left: 0;
            position: absolute;
            top: 0;
            transform: scale(.5);
            transform-origin: 0 0;
            width: 200%;
        }
        .title{
            line-height: 25px;
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        }
        .description{
            color: rgba(0,0,0,.4);
            font-size: 12px;
            letter-spacing: 0;
            line-height: 14px;
            margin-top: 10px;
        }
    }
`;

export default UserRights;
