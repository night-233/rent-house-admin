import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {message, Popconfirm, Table} from "antd";
import UserApi from "@apis/user";
import {handleResponse} from "@utils/handle-reponse";
import moment from "moment";
import {DeleteOutlined} from "@ant-design/icons/lib";
import {Link} from "react-router-dom";
import {HouseStatusMap} from "@base/HouseBaseEntity";

/**
 * Created by Administrator on 2020/7/29
 */
const UserStar = () => {

    const [searchParams, setSearchParams] = useState({
        page: 1,
        pageSize: 5,
        sortDirection: "DESC",
        orderBy: "createTime"
    });

    const [starData, setStarData] = useState({
        total: 0,
        list: []
    });

    const [loading,setLoading] = useState(false);

    const columns = [
        {
            title: '房源信息',
            dataIndex: 'house',
            key: 'house',
            render: (record) => (
                <div className="info-container">
                    <div className="img">
                        <Link to={"/client/house/" + record.id} target="_blank">
                            <img  src={record.cover} alt=""/>
                        </Link>
                    </div>
                    <div className="info">
                        <Link to={"/client/house/" + record.id} target="_blank">
                            <p className="title">
                                {record.title}
                            </p>
                        </Link>
                        <p>{record.floor}/{record.totalFloor}层 | {record.area}平方米 | { record.houseDetail?.rentWay === 0 ? "合租" : "整租"}</p>
                    </div>
                </div>
            ),
            width: 500,
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            align: "center" as "center",
            width: 100,
            render: value => <span>{value}元/月</span>,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: "center" as "center",
            render: value => <span>{HouseStatusMap[value]}</span>,
        },
        {
            title: '收藏时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: value => <span>{moment(value).fromNow()}</span>,
            align: "center" as "center"
        },
        {
            title: '收藏人气',
            dataIndex: 'starNumber',
            key: 'starNumber',
            align: "center" as "center"
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align: "center" as "center",
            render: (text, record) => (
                <Popconfirm title="确认要删除该收藏吗？" okText="确认" cancelText="取消" onConfirm={() => handleDeleteStar(record.house.id)}>
                    <DeleteOutlined style={{cursor: "pointer", color: "red"}} title="删除"/>
                </Popconfirm>
            )
        },
    ];

    useEffect(() => {
        getHouseStarList(searchParams);
    }, []);

    const getHouseStarList = (params) => {
        handleResponse(UserApi.getUserStarHouseList(params), setStarData, "获取收藏列表失败", setLoading);
    };

    const handleDeleteStar = (houseId) => {
        const key = houseId;
        message.loading({content: "删除收藏中...", duration: 0, key: key});
        UserApi.cancelStarHouse(houseId).then(res => {
            if(res){
                message.success({content: "删除收藏成功", key: key});
                let page = starData.list.length <= 1 ? searchParams.page - 1 : searchParams.page;
                page = page >= 1 ? page : 1;
                const tmp = {...searchParams, page: page};
                setSearchParams(tmp);
                setStarData({...starData, total: starData.total - 1});
                getHouseStarList(tmp);
            }
        })
    };

    const dataSource = starData.list.map((item: any) => ({
        key: item.id,
        house: item.house,
        price: item.house.price,
        status: item.house.status,
        createTime: item.createTime,
        starNumber: item.house.starNumber,
    }));

    const pagination = {
        hideOnSinglePage: true,
        total: starData.total,
        pageSize: searchParams.pageSize,
        current: searchParams.page,
        showTotal: (total) => `共计${total}条数据`,
        onChange: (page) => {
            const tmp = {...searchParams, page: page};
            setSearchParams(tmp);
            getHouseStarList(tmp);
        }
    };

    return (
        <Container>
           <Table
               columns={columns}
               dataSource={dataSource}
               pagination={pagination}
               loading={loading}
           />
        </Container>
    )
};
const Container = styled.div`
    .info-container{
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
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                &:hover{
                    color: #5cc6cf;
                }
            }
        }
    }
`;

export default UserStar;
