import React from "react";
import styled from "styled-components";
import MaleImg from "../../assets/img/male.png";
import FemaleImg from "../../assets/img/female.png";

/**
 * 室友信息
 */
const RoomMateInfo = () => {

    return (
        <Container id="components-anchor-roommate-info_2">
            <div className="nav-container">
                <h2 className="title">室友信息</h2>
                <div className="room-mate-container">
                    <div className="mate-block">
                        <div className="head-img">
                            <img src={MaleImg} alt="男生" style={{width: "100%", height: "100%"}}/>
                        </div>
                        <div className="info">
                            <div className="room">
                                <span>01卧</span>
                                <span className="time">入住2个月</span>
                            </div>
                            <div className="person">
                                <span>男</span>
                                <i className="slash"/>
                                <span>巨蟹座</span>
                                <i className="slash"/>
                                <span>秘密</span>
                            </div>
                        </div>
                    </div>
                    <div className="mate-block">
                        <div className="head-img">
                            <img src={FemaleImg} alt="女生" style={{width: "100%", height: "100%"}}/>
                        </div>
                        <div className="info">
                            <div className="room">
                                <span>02卧</span>
                                <span className="time">入住一个月</span>
                            </div>
                            <div className="person">
                                <span>女</span>
                                <i className="slash"/>
                                <span>双子座</span>
                                <i className="slash"/>
                                <span>IT</span>
                            </div>
                        </div>
                    </div>
                    <div className="mate-block">
                        <div className="head-img">
                            <img src={MaleImg} alt="男生" style={{width: "100%", height: "100%"}}/>
                        </div>
                        <div className="info">
                            <div className="room">
                                <span>03卧</span>
                                <span className="time">入住1个月</span>
                            </div>
                            <div className="person">
                                <span>男</span>
                                <i className="slash"/>
                                <span>金牛座</span>
                                <i className="slash"/>
                                <span>银行</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
};

const Container = styled.div`
.room-mate-container{
     display: flex;
     flex-wrap: wrap;
     .mate-block{
        background: rgba(0,0,0,.03);
        border-radius: 4px;
        margin-bottom: 20px;
        margin-right: 20px;
        padding: 22px 0;
        width: 330px;
        display: flex;
        .head-img{
            border-radius: 100px;
            height: 60px;
            margin-left: 20px;
            margin-right: 14px;
            overflow: hidden;
            width: 60px;
        }
        .info{
            font-size: 17px;
            width: 236px;
            color: rgba(0,0,0,.85);
            letter-spacing: 0;
            .room{
                color: rgba(0,0,0,.85);
                letter-spacing: 0;
                .time{
                    color: rgba(0,0,0,.4);
                    font-size: 17px;
                    letter-spacing: 0;
                    line-height: 20px;
                    margin-left: 9px;
                }
            }
            .person{
                margin-top: 10px;
                .slash{
                    display: inline-block;
                    height: 18px;
                    margin: 0 6px;
                    position: relative;
                    top: 3px;
                    &:after{
                        border-right: 1px solid rgba(0,0,0,.4);
                        bottom: 0;
                        box-sizing: border-box;
                        color: #000;
                        color: rgba(0,0,0,.4);
                        content: " ";
                        height: 200%;
                        position: absolute;
                        right: 0;
                        top: 0;
                        transform: scale(.5);
                        transform-origin: 0 0;
                        width: 1px
                    }
                }
            }
        }
    }
`;

export default RoomMateInfo;
