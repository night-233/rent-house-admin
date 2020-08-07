import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HouseSortComponent from "@components/HouseSortComponent";
import { Link } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import { LoadingOutlined } from "@ant-design/icons/lib";
import NoHousePng from "@assets/img/none.png"

/**
 *  地图房屋列表
 */
const MapHouseList = ({ orderBy, sortDirection, onSortChange, houseData, onArriveBottom, loading }) => {

  const handleScrollFrame = (frame) => {
    if (frame.top > 0.8 && !loading && houseData.list.length < houseData.total) {
      onArriveBottom();
    }
  };

  return (
    <Container>
      <div className="sort">
        <HouseSortComponent sortType={orderBy} sortDirection={sortDirection} onSortChange={onSortChange} />
      </div>
      {
        houseData.dirty && houseData.list.length > 0 &&
        <Scrollbars className="house-list"
                    renderThumbVertical={(props) => <div {...props} style={{ ...props.style, backgroundColor: "rgba(0, 0, 0, 0.1)", transform: "translateY(0px)" }} />}
                    onScrollFrame={handleScrollFrame}
        >
          {
            houseData.list.map(item => (
                <Link to={`/client/house/${item.id}`} target="_black" key={item.id}>
                  <div className="house-item">
                    <div className="img">
                      <img src={item.cover} alt="房屋图片" />
                    </div>
                    <div className="content">
                      <h3>{item.title}</h3>
                      <div className="desc">
                        <span className="floor">{item.area}㎡ | {item.floor}/{item.totalFloor}层</span>
                        <span className="price"><span className="number">¥{item.price}</span>/月</span>
                      </div>
                      <div className="position">
                        <i className="iconfont" style={{ fontSize: "12px", fontWeight: "bold" }}>&#xe620;</i> {item.houseDetail.address}
                      </div>
                      <div className="tags">
                        {
                          item.tags.map((tag, index) => <span key={index}>{tag}</span>)
                        }
                      </div>
                    </div>
                  </div>
                </Link>
            ))
          }
          {
            houseData.total === houseData.list.length && houseData.dirty && houseData.list.length > 5 &&
            <div className="bottom-hint">我也是有底线的...</div>
          }
          {
            loading && houseData.dirty && houseData.list.length > 5 &&
            <div className="bottom-hint"><LoadingOutlined />更多加载中...</div>
          }
        </Scrollbars>
      }
      {
        houseData.dirty && houseData.list.length === 0 &&
        <div className="no-house">
          <img src={NoHousePng} alt=""/>
          <p>地球上没有你要找的房子...</p>
        </div>
      }
    </Container>
  )
};

const Container = styled.div`
   @media (min-width: 1280px){
      width: 30%;
   }
   @media (min-width: 1920px){
      width: 25%;
   }
    height: 100%;
    display: flex;
    flex-direction: column;
   .sort{
        width: 300px;
        border: solid 1px #eee;
        border-radius: 4px;
        margin: 20px auto 14px;
   }
   .house-list{
        flex: 1;
        .house-item{
            height: 180px;
            margin: 0 24px;
            padding: 24px 0;
            border-bottom: solid 1px #eee;
            display: flex;
            justify-content: space-between;
            .img{
                 width: 176px;
                 height: 132px;
                 img{
                    width: 100%;
                    height: 100%;
                 }
            }
            .content{
                width: 238px;
                position: relative;
                height: 132px;
                margin-left: 15px;
                h3{
                    line-height: 20px;
                    position: relative;
                    top: -3px;
                    height: 46px;
                    color: #444;
                    font-weight: 500;
                }
                .desc{
                    font-size: 14px;
                    color: #999;
                    position: relative;
                    height: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .floor{
                        font-size: 15px;
                    }
                    .price{
                        font-size: 12px;
                        color: #444;
                        .number{
                            font-size: 17px;
                            font-weight: bold;
                            color: #ffa000;
                        }
                    }
                }
                .position{
                    margin-top: 10px;
                    font-size: 14px;
                    color: #999;
                    line-height: 1.2;
                }
                .tags{
                    position: absolute;
                    left: 0;
                    bottom: -4px;
                    width: 100%;
                    font-size: 12px;
                    height: 20px;
                    overflow: hidden;
                    span{
                        display: inline-block;
                        border: solid 1px #666;
                        border-radius: 2px;
                        padding: 2px 6px;
                        font-size: 12px;
                        color: #666;
                        line-height: 14px;
                        margin-right: 2px;
                    }
                }
            }
        }
        .bottom-hint{
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-weight: 500;
            font-size: 14px;
        }     
   }
   .no-house{
        text-align: center;
        font-size: 12px;
        color: #999;
        line-height: 30px;
        padding: 20% 0 0 0;
   }
`;

export default MapHouseList;
