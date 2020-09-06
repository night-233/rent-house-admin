import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Divider, Empty, message, Popconfirm, Table, Tabs} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    HeartOutlined
} from "@ant-design/icons/lib";
import moment from "moment";
import AdminApi from "@apis/admin";
import {handleResponse} from "@utils/handle-reponse";
import {Link, useHistory} from "react-router-dom";
import Tools from "@utils/tools";
import { Prompt } from 'react-router'

const { TabPane } = Tabs;
/**
 * Created by Administrator on 2020/8/4
 */
const HouseManage = () => {

    const [searchParams, setSearchParams] = useState({
        page: 1,
        pageSize: 5,
        orderBy: undefined,
        direction: undefined,
        status: "1"
    });

    const [houseData, setHouseData] = useState({
        total: 0,
        list: []
    });

    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const columns:any = [
        {
            title: '房源信息',
            dataIndex: 'house',
            key: 'house',
            width: 500,
            render: value => <HouseInfo data={value}/>
        },
        {
            title: '最近更新',
            dataIndex: 'lastUpdateTime',
            key: 'lastUpdateTime',
            align: "center" as "center",
            render: value => <span>{moment(value).fromNow()}</span>,
            sorter: true,
            sortOrder: searchParams.orderBy === 'lastUpdateTime' && Tools.sortDirectionMap(searchParams.direction),
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            align: "center" as "center",
            render: value => <span>{value}元/月</span>,
            sorter: true,
            sortOrder: searchParams.orderBy === 'price' && Tools.sortDirectionMap(searchParams.direction),
        },

    ];

    if(searchParams.status === "1"){
        columns.push( {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align: "center" as "center",
            render: (text, record) => (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <EditOutlined style={{cursor: "pointer", color: "#51c6cf"}} title="编辑" onClick={() => {
                        history.push("/user/house-edit/" + record.key);
                    }}/>
                    <Divider type="vertical"/>
                    <Popconfirm title="修改房屋状态为已出租？" okText="确认" cancelText="取消"  onConfirm={() => handleHouseStatusUpdate(record.key, 2)}>
                        <CheckCircleOutlined title="已出租" style={{cursor: "pointer", color: "#51c6cf"}}/>
                    </Popconfirm>
                    <Divider type="vertical"/>
                    <Popconfirm title="确认要删除该房源吗？" okText="确认" cancelText="取消" onConfirm={() => handleHouseStatusUpdate(record.key, 3)}>
                        <DeleteOutlined style={{cursor: "pointer", color: "red"}} title="删除"/>
                    </Popconfirm>
                </div>
            )
        });
    }else{
        columns.push( {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align: "center" as "center",
            render: (text, record) => (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Divider type="vertical"/>
                    <Popconfirm title="修改房屋状态为待出租？" okText="确认" cancelText="取消"  onConfirm={() => handleHouseStatusUpdate(record.key, 1)}>
                        <CloseCircleOutlined  title="待出租" style={{cursor: "pointer", color: "#51c6cf"}}/>
                    </Popconfirm>
                    <Divider type="vertical"/>
                    <Popconfirm title="确认要删除该房源吗？" okText="确认" cancelText="取消" onConfirm={() => handleHouseStatusUpdate(record.key, 3)}>
                        <DeleteOutlined style={{cursor: "pointer", color: "red"}} title="删除"/>
                    </Popconfirm>
                </div>
            )
        });
    }

    useEffect(() => {
        getHouseList(searchParams);
    }, []);

    const getHouseList = (params) => {
        handleResponse(AdminApi.getHouseList(params), setHouseData, "获取出租列表失败", setLoading)
    };

    const dataSource = houseData.list.map((item: any) => ({
        key: item.id,
        price: item.price,
        lastUpdateTime: item.lastUpdateTime,
        house: item
    }));

    const pagination = {
        hideOnSinglePage: true,
        showSizeChanger: false,
        total: houseData.total,
        pageSize: searchParams.pageSize,
        current: searchParams.page,
        showTotal: (total) => `共计${total}条数据`,
        onChange: page => {
            const tmp = {...searchParams, page: page};
            setSearchParams(tmp);
            getHouseList(tmp);
        }
    };

    const handleChange = (pagination, filters, sorter, extra) => {
        const direction = Tools.sortDirectionMap(sorter.order);
        const orderBy = direction ? sorter.field : undefined;
        if((orderBy !== searchParams.orderBy) || (direction !== searchParams.direction)){
            const tmp:any = {...searchParams, page: 1, orderBy: orderBy, direction: direction};
            setSearchParams(tmp);
            getHouseList(tmp);
        }
    };

    const handleStatusTabClick = (key) => {
        const tmp: any = {...searchParams, status: key, page: 1, orderBy: undefined, direction: undefined};
        setSearchParams(tmp);
        getHouseList(tmp);
    };

    const handleHouseStatusUpdate = (houseId, status) => {
        let loadingMsg:any = "";
        let successMsg:any = "";
        switch (status) {
            case 1: loadingMsg = "房源发布中..."; successMsg = "房源发布成功"; break;
            case 2: loadingMsg = "房源状态更新中..."; successMsg = "房源状态更新成功"; break;
            case 3: loadingMsg = "房源删除中..."; successMsg = "房源删除成功"; break;
        }
        const key = houseId;
        const hide = message.loading({content: loadingMsg, duration: 0, key: key});
        AdminApi.updateHouseStatus(houseId, status).then(res => {
            if(res){
                message.success({content: successMsg, key: key});
                let page = houseData.list.length <= 1 ? searchParams.page - 1 : searchParams.page;
                page = page >= 1 ? page : 1;
                const tmp = {...searchParams, page: page};
                setSearchParams(tmp);
                setHouseData({...houseData, total: houseData.total - 1});
                getHouseList(tmp);
            }else{
                hide();
            }
        });
    };

    return (
        <Container>
            <Tabs activeKey={searchParams.status} onTabClick={handleStatusTabClick}>
                <TabPane tab="发布中" key="1"/>
                <TabPane tab="已出租" key="2"/>
            </Tabs>
           <Table
               columns={columns}
               locale={{
                 emptyText: <Empty  description="暂无数据"/>
               }}
               loading={loading}
               pagination={pagination}
               dataSource={dataSource}
               onChange={handleChange}
           />
        </Container>
    )
};
const Container = styled.div`

`;

const HouseInfoContainer = styled.div`
    display: flex;
    .img{
        cursor: pointer;
        img{
            width: 140px;
            height: 90px;
        }
        margin-right: 15px;
    }
    .info{
        .title{
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            width: 300px;
            &:hover{
                color: #5cc6cf;
            }
        }
    }
`;

const HouseInfo = ({data}) => {
    return (
        <HouseInfoContainer>
            <div className="img">
                <Link to={"/client/house/" + data.id} target="_blank">
                    <img  src={data.cover} alt=""/>
                </Link>
            </div>
            <div className="info">
                <Link to={"/client/house/" + data.id} target="_blank">
                    <p className="title">
                        {data.title}
                    </p>
                </Link>
                <p>{data.floor}/{data.totalFloor}层 | {data.area}平方米 | { data.houseDetail?.rentWay === 0 ? "合租" : "整租"}</p>
                <p>发布时间：{moment(data.createTime).format("YYYY/MM/DD hh:mm:ss")}</p>
                <p><span style={{marginRight: 10}}><HeartOutlined/> 0次</span><EyeOutlined /> 0次</p>
            </div>
        </HouseInfoContainer>
    )
};

export default HouseManage;
