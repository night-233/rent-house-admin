import React from "react";
import styled from "styled-components";
import {Col, Pagination, Row, Button} from "antd";
import LazyLoad from 'react-lazyload';
/**
 * 房源列表
 */
const HouseList = () => {

    return (
        <Container>
            {/* 排序过滤 */}
            <FilterContainer>
                <div className="name ">默认排序 <span className="underline"/></div>
                <div className="name">价格<i className="iconfont icon" >&#xe679;</i><i className="iconfont icon" style={{marginLeft: -8}}>&#xe66a;</i><span className="underline"/></div>
                <div className="name name-active">面积<i className="iconfont icon" >&#xe679;</i><i className="iconfont icon icon-active" style={{marginLeft: -8}}>&#xe66a;</i><span className="underline"/></div>
            </FilterContainer>
            {/* 房源列表*/}
            <ListContainer>
                <Row gutter={[21, 21]}>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox src="http://qiniu.touchfish.top/FtpxeJvUYvEQjbZbiXzdesf4Fw_q"/></Col>
                </Row>
            </ListContainer>
            {/* 分页器*/}
            <PaginationContainer>
                <Pagination
                    hideOnSinglePage={true}
                    total={85}
                    pageSizeOptions={['10', '20', '30', '50']}
                    showSizeChanger
                    showQuickJumper
                    showTotal={total => `共${total}条数据`}
                />
                <Button type="primary" style={{marginLeft: "15px"}}>确认</Button>
            </PaginationContainer>
            {/*    最近浏览*/}
            <RecentViewContainer>
                <h1>最近浏览</h1>
                <Row gutter={[21, 21]}>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                    <Col span={8}><HouseBox/></Col>
                </Row>
            </RecentViewContainer>
        </Container>
    )
};

const Container = styled.div`
    margin-top: 30px;
`;
const FilterContainer = styled.div`
    border-bottom: 1px solid rgba(0,0,0,.06);
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: flex-end;
    .icon{
        font-weight: bold;
        color: #E0E0E0;
    }
    .name{
        margin-right: 20px;
        cursor: pointer;
        position: relative;
        .underline{
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: #51c6cf;
            border-radius: 1px;
            -webkit-transition: width .3s;
            transition: width .3s;
            will-change: width;
        }
        &:hover .underline{
            width: 100%;
        }
    }
    .name-active, .icon-active{
        color: #51c6cf;
    }
`;
const ListContainer = styled.div`
    margin-top: 30px;
`;
const HouseBoxContainer = styled.div`
    color: #000;
    color: rgba(0,0,0,.4);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 370px;
    display: inline-block;
    .pic{
        cursor: pointer;
        display: block;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border: 1px solid #000;
        border: 1px solid rgba(0,0,0,.12);
        overflow: hidden;
        height: 270px;
        width: 100%;
        position: relative;
        background: #fff;
        background: hsla(0,0%,100%,.3);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
    }
    .info{
        border: 1px solid #000;
        border: 1px solid rgba(0,0,0,.12);
        border-top: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 0 16px;
        position: relative;
        height: 170px;
        .title{
            display: flex;
            align-items: center;
            font-weight: 700;
            font-size: 17px;
            position: relative;
            padding: 20px 20px 0 0;
            color: #000;
            color: rgba(0,0,0,.85);
            line-height: 1em;
            margin: 0;
            cursor: pointer;
            &:hover {
               color: #51c6cf;
            }
            .icon-sign{
                background: #51c6cf;
                width: 20px;
                height: 20px;
                border-radius: 2px;
                color: #FFFFFF;
                font-size: 12px;
                padding: 2px 5px;
                margin-right: 5px;
            }
        }
        .desc{
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }
        .location {
            font-size: 12px;
            margin-top: 8px;
            position: relative;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .price{
            color:  #51c6cf;
            letter-spacing: -1px;
            display: flex;
            align-items: center;
            .number {
                font-size: 28px;
            }
            .unit{
              font-size: 25px;
            }
        }
        .tag{
            margin: 10px 0;
            height: 1.8em;
            overflow: hidden;
            span {
                display: inline-block;
                background: #000;
                background: rgba(0,0,0,.03);
                padding: 6px 10px;
                font-size: 12px;
                margin-right: 5px;
                margin-bottom: 5px;
                border-radius: 2px;
                white-space: nowrap;
            }
        }
        .tip{
            position: relative;
            font-size: 12px;
            width: 95%;
            display: inline-block;
            cursor: pointer;
            display: flex;
            align-items: center;
            .air{
                width: 16px;
                height: 16px;
                color: #6CB9A4;
                border: 1px solid #6CB9A4;
                font-size: 12px;
                border-radius: 2px;
                margin-right: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
`;
const PaginationContainer = styled.div`
    padding: 20px 0 60px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid rgba(0,0,0,.06);
`;
const RecentViewContainer = styled.div`
    h1{
        color: rgba(0,0,0,.85);
        margin: 40px 0 20px;
        font-size: 24px;
        font-weight: bold;
    }
`;

const HouseBox = ({src = "http://qiniu.touchfish.top/FgAb6JHwe9nHZ3e59WnHVMokawBa"}) => {

    return (
        <HouseBoxContainer>
            <div className="pic">
                <LazyLoad height="100%" placeholder={"图片加载中"}>
                    <img src={src} style={{objectFit: "cover", width: "100%", height: "100%"}}></img>
                </LazyLoad>
            </div>
            <div className="info">
                <div className="title"><span className="icon-sign">签</span> 杭州合租阳光郡990租房户型实景图</div>
                <div className="desc">
                    <span>4㎡ | 26/28层 </span>
                    <span className="price"><span className="number">990</span> <span className="unit">/月</span></span>
                </div>
                <div className="location"><i className="iconfont" style={{fontSize: "12px"}}>&#xe620;</i> 小区距墩祥街站步行约1552米</div>
                <div className="tag">
                    <span>深呼吸1.0</span>
                    <span>可短租</span>
                    <span>米苏4.0</span>
                </div>
                <div className="tip"><i className="iconfont iconair air"></i> 空气质量已检测</div>
            </div>
        </HouseBoxContainer>
    )
}
export default HouseList;
