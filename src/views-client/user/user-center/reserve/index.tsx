import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Tabs, Button, Table } from 'antd';
import {HouseInfoColumnComponent} from "@views-client/user/user-center/star";
import UserApi from "@apis/user";
import {handleResponse} from "@utils/handle-reponse";
const { TabPane } = Tabs;

const initSearchParams = {
    status: 2,
    page: 1,
    pageSize: 5,
};

/**
 *  我的约看
 * Created by Administrator on 2020/7/29
 */
const UserReserve = () => {

    const columns = [
        {
            title: '房源信息',
            dataIndex: 'house',
            key: 'house',
            width: 500,
            render: (record) => <HouseInfoColumnComponent data={record}/>,
        },
        {
            title: '房东信息',
            dataIndex: 'agentName',
            key: 'agentName',
            align: "center" as "center",
        },
        {
            title: '约看时间',
            dataIndex: 'orderTime',
            key: 'orderTime',
            align: "center" as "center",
        },
        {
            title: '约看描述',
            dataIndex: 'description',
            key: 'description',
            align: "center" as "center",
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: "center" as "center",
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align: "center" as "center",
        },
    ];

    const [searchParams, setSearchParams] = useState(initSearchParams);

    const [reserveData, setReserveData] = useState({
        total: 0,
        list: []
    });

    const [loading, setLoading] = useState(false);


    const pagination = {
        showSizeChanger: false,
        current: searchParams.page,
        pageSize: searchParams.pageSize,
        total: reserveData.total,
        hideOnSinglePage: true,
        showTotal: total => `共计${total}条数据`,
        onChange: page => {

        }
    };

    useEffect(() => {
        getReserveData(searchParams);
    }, []);

    // 获取约看列表
    const getReserveData = (params) => {
        debugger
        handleResponse(UserApi.getReserveHouseList(params), setReserveData, "获取约看列表失败", setLoading);
    };

    return (
        <Container>
            <Tabs>
                <TabPane tab="未确认" key={1}/>
                <TabPane tab="待看房" key={2}/>
                <TabPane tab="已完成" key={3}/>
                <TabPane tab="已取消" key={4}/>
            </Tabs>
            <Table columns={columns} pagination={pagination}/>
        </Container>
    )
};
const Container = styled.div`

`;

export default UserReserve;
