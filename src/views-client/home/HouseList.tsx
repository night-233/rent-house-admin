import React, {useEffect} from "react";
import styled from "styled-components";
import {Col, Empty, Pagination, Row, Spin} from "antd";
import LazyLoad, {forceCheck} from 'react-lazyload';
import {Link} from "react-router-dom";

interface HouseListProps {
    data: {total: number, list: Array<any>},
    page?: number,
    onPageChange?: any,
    pageSize?: number,
    onPageSizeChange?: any,
    listLoading?: boolean,
    onSortChange?: any
}


/**
 * 房源列表
 */
const HouseList = (props: HouseListProps) => {

    const {data, page = 1, onPageChange, pageSize = 10, onPageSizeChange, listLoading} = props;

    // 强制延迟加载检查
    useEffect(() => {
        forceCheck();
    }, [data.list])

    return (
        <Container>
            {
                data.total === 0 ?
                <Empty description={"未搜到对应房源，换个搜索条件试试"} style={{marginTop: 100, fontSize: "12px", color: "rgba(0, 0, 0, 0.2)"}}/> :
                <Spin spinning={listLoading}>
                    {/* 房源列表*/}
                    <ListContainer>
                        <Row gutter={[21, 21]}>
                            {
                                data.list.map(item => <Col span={8} key={item.id}><HouseBox data={item}/></Col>)
                            }
                        </Row>
                    </ListContainer>
                    {/* 分页器*/}
                    <PaginationContainer>
                        <Pagination
                            hideOnSinglePage={false}
                            total={data.total}
                            pageSize={pageSize}
                            current={page}
                            pageSizeOptions={['20', '30', '50']}
                            showSizeChanger
                            showQuickJumper
                            onChange={onPageChange}
                            onShowSizeChange={onPageSizeChange}
                            showTotal={total => `共${total}条数据`}
                        />
                        {/*<Button type="primary" style={{marginLeft: "15px"}}>确认</Button>*/}
                    </PaginationContainer>
                </Spin>
            }
        </Container>
    )
};

const Container = styled.div`
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
        .title-container{
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
        .title{
            font-size: 17px;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 0;
            line-height: 17px;
            &:hover {
               color: #51c6cf;
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


export const HouseBox = (props) => {

    const {data} = props;

    return (
        <HouseBoxContainer>
            <div className="pic">
                <Link to={{
                    pathname: "/client/house/" + data.id,
                }}
                    target="_blank"
                >
                    <LazyLoad height="100%" placeholder={<div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "30px"}}>图片加载中...</div>}>
                        <img src={data.cover} style={{objectFit: "cover", width: "100%", height: "100%"}} alt={data.title}/>
                    </LazyLoad>
                </Link>
            </div>
            <div className="info">
                <div className="title-container"><span className="icon-sign">签</span><div className="title">{data.title}</div> </div>
                <div className="desc">
                    <span>{data.area}㎡ | {data.floor}/{data.totalFloor}层 </span>
                    <span className="price"><span className="number">{data.price}</span> <span className="unit">/月</span></span>
                </div>
                <div className="location"><i className="iconfont" style={{fontSize: "12px"}}>&#xe620;</i>{data.houseDetail?.address}</div>
                <div className="tag">
                        {
                            data.tags?.map((item, index) => <span key={index}>{item}</span>)
                        }
                </div>
                <div className="tip"><i className="iconfont iconair air"/> 空气质量已检测</div>
            </div>
        </HouseBoxContainer>
    )
}
export default HouseList;
