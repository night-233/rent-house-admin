import React from "react";
import styled from "styled-components";
import {HouseDevicesConfigIcon} from "../../base/HouseBaseEntity";
import {useSelector} from "react-redux"

/**
 * 房屋简介
 */
const HouseIntroduction = () => {

    const houseInfo = useSelector(state => state.house.house);

    return (
        <Container id="components-anchor-house-introduction_0">
            <div className="house-introduction">
                <h2 className="title">{houseInfo.title}</h2>
                <div className="house-desc">
                    {houseInfo?.houseDetail?.description || "这个人很懒，没有房屋描述"}
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
