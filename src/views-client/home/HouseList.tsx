import React from "react";
import styled from "styled-components";
import {Col, Empty, Pagination, Row} from "antd";
import LazyLoad from 'react-lazyload';


interface HouseListProps {
    data: {total: number, list: Array<any>},
    page?: number,
    onPageChange?: any,
    pageSize?: number,
    onPageSizeChange?: any,
    sort?: {
        type: SortTypeEnum,
        direction: SortDirectionEnum
    },
    onSortChange?: any
}
export enum SortTypeEnum {DEFAULT = "lastUpdateTime", PRICE = "price", AREA = "area"};
export enum SortDirectionEnum {
    ASC = "ASC",
    DESC = "DESC"
}

/**
 * 房源列表
 */
const HouseList = (props: HouseListProps) => {

    const {data, page = 1, onPageChange, pageSize = 10, onPageSizeChange, sort = {type: SortTypeEnum.DEFAULT, direction: SortDirectionEnum.DESC}, onSortChange} = props;


    // 排序过滤点击
    const handleSortClick = (type) => {
        if(type === SortTypeEnum.DEFAULT){
            if(sort.type !== type){
                onSortChange && onSortChange(SortTypeEnum.DEFAULT, SortDirectionEnum.DESC);
            }
            return;
        }
        if(type === SortTypeEnum.PRICE || type === SortTypeEnum.AREA){
            if(type !== sort.type){
                onSortChange && onSortChange(type, SortDirectionEnum.ASC);
            }else{
               const direction = sort.direction === SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC;
                onSortChange && onSortChange(type, direction);
            }
        }
    };

    return (
        <Container>
            {
                data.total === 0 ?
                    <Empty description={"未搜到对应房源，换个搜索条件试试"} style={{marginTop: 100, fontSize: "12px", color: "rgba(0, 0, 0, 0.2)"}}/> :
                    <>
                        {/* 排序过滤 */}
                        <FilterContainer>
                            <FilterTypeComponent title="默认排序" checked={sort.type === SortTypeEnum.DEFAULT} onClick={() => handleSortClick(SortTypeEnum.DEFAULT)}/>
                            <FilterTypeComponent title="价格" checked={sort.type === SortTypeEnum.PRICE} direction={sort.direction} showDirection={true} onClick={() => handleSortClick(SortTypeEnum.PRICE)}/>
                            <FilterTypeComponent title="面积" checked={sort.type === SortTypeEnum.AREA} direction={sort.direction}  showDirection={true} onClick={() => handleSortClick(SortTypeEnum.AREA)}/>
                        </FilterContainer>
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
                    </>
            }
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
    .name-active .underline{
       width: 100%;
    }
    .name-active, .icon-active{
        color: #51c6cf;
    }
`;
const FilterTypeComponent = ({checked = false, title = "", showDirection = false, direction = SortDirectionEnum.DESC, onClick = () => {}}) => {

    return (
        <div className={"name " + (checked && "name-active")} onClick={onClick}>
            {title}
            {
                showDirection &&
                <>
                    <i className={"iconfont icon " + (checked && direction === SortDirectionEnum.DESC && "icon-active")} >&#xe679;</i>
                    <i className={"iconfont icon " + (checked && direction === SortDirectionEnum.ASC && "icon-active")} style={{marginLeft: -8}}>&#xe66a;</i>
                </>
            }
            <span className="underline"/>
        </div>
    )
};
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
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
                <LazyLoad height="100%" placeholder={"图片加载中"}>
                    <img src={data.cover} style={{objectFit: "cover", width: "100%", height: "100%"}} alt={data.title}/>
                </LazyLoad>
            </div>
            <div className="info">
                <div className="title-container"><span className="icon-sign">签</span><div className="title">{data.title}</div> </div>
                <div className="desc">
                    <span>{data.area}㎡ | {data.floor}/{data.totalFloor}层 </span>
                    <span className="price"><span className="number">{data.price}</span> <span className="unit">/月</span></span>
                </div>
                <div className="location"><i className="iconfont" style={{fontSize: "12px"}}>&#xe620;</i>{data.houseDetail?.description}</div>
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
