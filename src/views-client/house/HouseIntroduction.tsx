import React from "react";
import styled from "styled-components";
import {HouseDevicesConfigIcon} from "../../base/HouseBaseEntity";

/**
 * 房屋简介
 */
const HouseIntroduction = () => {

    return (
        <Container id="components-anchor-house-introduction_0">
            <div className="house-introduction">
                <h2 className="title">房屋简介</h2>
                <div className="house-desc">
                    感谢您选择自如！本房次卧朝南带阳台，温馨的卧室，等待着你的到来。让喜欢阳光，喜欢看书听音乐的你露出开心的笑容。
                </div>
                <div className="tag-icons">
                    {
                        HouseDevicesConfigIcon.map(item => (
                            <div className="tag" key={item.value}>
                                <i className={`iconfont ${item.value} icon`}/>
                                <div className="name">{item.name}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Container>
    )
};

const Container = styled.div`
  .house-introduction{
    .house-desc{
        color: rgba(0,0,0,.6);
        line-height: 23px;
        margin-top: 30px;
        font-size: 17px;
        letter-spacing: 0;
    }
  }
   .tag-icons{
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        .tag{
            color: rgba(0,0,0,.6);
            font-size: 15px;
            height: 60px;
            margin: 0 0 30px;
            text-align: center;
            width: 80px;
            .icon{
                font-size: 32px;
                line-height: 36px;
            }
            .name{
                margin-top: 7px;
                line-height: 17px;
            }
        }
   }
`;

export default HouseIntroduction;
