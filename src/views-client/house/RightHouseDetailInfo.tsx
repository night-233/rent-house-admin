import React from "react";
import styled from "styled-components";
import {Popover, Skeleton} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons/lib";
import {useSelector} from "react-redux"
import {HouseDirectionList} from "../../base/HouseBaseEntity";
/**
 * 右侧房屋详细信息
 */
const RightHouseDetailInfo = () => {

    const houseInfo = useSelector(state => state.house.house);

    return (
        <Container>
            <div className="title">
                    {houseInfo.title}
            </div>
            <div className="price"><span className="icon">￥</span>
                <span className="number">
                    {houseInfo.price}
                </span>/月（季付价）
            </div>
            <div className="tags">
                {houseInfo?.tags.map((item, index) => <span key={index}>{item}</span> )}
            </div>
            <div className="info">
                <div className="info-block">
                    <div className="value">{houseInfo.area}㎡</div>
                    <div className="name">使用面积</div>
                </div>
                <div className="info-block">
                    <div className="value">{HouseDirectionList.find(item => item.value === houseInfo.direction)?.label}</div>
                    <div className="name">朝向</div>
                </div>
                <div className="info-block">
                    <div className="value">{houseInfo.room}室{houseInfo.parlour}厅{houseInfo.bathroom}卫</div>
                    <div className="name">户型</div>
                </div>
            </div>
            <div className="detail">
                <div className="detail-block">
                    <div className="name">地址</div>
                    <Popover content={houseInfo?.houseDetail?.traffic}>


                        <div className="value">
                            {houseInfo?.houseDetail?.address}
                        </div>
                    </Popover>
                    <Popover content={<div style={{width: 300, color: "rgba(0,0,0,.6)"}}>
                        房源详情页标注的房源到地铁站距离实际为该房源所在小区到地铁站的步行距离。当小区面积较大时，距离有一定误差，标注距离仅供参考，请以实际看房为准。
                    </div>}>
                        <QuestionCircleOutlined style={{
                            fontSize: "20px",
                            marginLeft: 5,
                            background: "#CCCCCC",
                            color: "#FFFFFF",
                            borderRadius: "50%",
                            cursor: "pointer"
                        }}/>
                    </Popover>
                </div>
                <div className="detail-block">
                    <div className="name">楼层</div>
                    <div className="value">{houseInfo.floor}/{houseInfo.totalFloor}</div>
                </div>
                <div className="detail-block">
                    <div className="name">电梯</div>
                    <div className="value">有</div>
                </div>
                <div className="detail-block">
                    <div className="name">年代</div>
                    <div className="value">{houseInfo.buildYear}年建成</div>
                </div>
                <div className="detail-block">
                    <div className="name">门锁</div>
                    <div className="value">智能门锁</div>
                </div>
                <div className="detail-block">
                    <div className="name">绿化</div>
                    <div className="value">40%</div>
                </div>
            </div>
        </Container>
    )
};
const Container = styled.div`
   .tags{
        margin-top: 15px;
        span {
            display: inline-block;
            background: rgba(0,0,0,.03);
            padding: 6px 10px;
            font-size: 12px;
            margin-right: 5px;
            margin-bottom: 5px;
            border-radius: 2px;
            white-space: nowrap;
        }
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(224,224,224, .6);
    }
    .info{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        height: 70px;
        border-bottom: 1px solid rgba(224,224,224, .6);
        align-items: center;
        padding-bottom: 20px;
        .info-block{
            display: flex;
            flex-direction: column;
            align-items: center;
            .name{
                color: rgba(0,0,0,.4);
                margin-top: 6px;
                font-size: 16px;
            }
            .value{
                -webkit-margin-start: 0;
                color: rgba(0,0,0,.85);
                font-size: 20px;
                line-height: 24px;
                margin-inline-start: 0;
                margin-left: 0;
            }
        }
    }
    .detail{
        padding-bottom: 40px;
        .detail-block{
            display: flex;
            font-size: 18px;
            padding: 10px 0;
            border-bottom: 1px solid rgba(224,224,224, .6);
            line-height: 20px;
           .name{
                width: 62px;
                color: rgba(0,0,0,.4);
           }
           .value{
                color: #000000;
                display: inline-block;
                max-width: 258px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
           }
        }
    }
`;

export default RightHouseDetailInfo;
