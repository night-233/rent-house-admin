import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Tabs, Button, Table, Popconfirm, message, Empty} from 'antd';
import {HouseInfoColumnComponent} from "@views-client/user/user-center/star";
import UserApi from "@apis/user";
import {handleResponse} from "@utils/handle-reponse";
import moment from "moment";
import {DeleteOutlined} from "@ant-design/icons/lib";
import Tools from "@utils/tools";
import ReserveCommonProps from "@views-client/user/common/ReserveCommonProps";
const { TabPane } = Tabs;

const initSearchParams = {
    status: "2",
    page: 1,
    pageSize: 5,
    orderBy: undefined,
    sortDirection: undefined,
};

/**
 *  我的约看
 * Created by Administrator on 2020/7/29
 */
const UserReserve = () => {

    const [searchParams, setSearchParams] = useState(initSearchParams);

    const columns: any = ReserveCommonProps.columns(searchParams);

    if(searchParams.status === "1" || searchParams.status === "2"){
        columns.push(  {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align: "center" as "center",
            render: (text, record) => (
                <Popconfirm title="确认要取消该预约吗？" okText="确认" cancelText="取消" onConfirm={() => handleCancelConfirm(record.key)}>
                    <DeleteOutlined style={{cursor: "pointer", color: "red"}} title="取消预约"/>
                </Popconfirm>
            )
        });
    }else{
        columns.push(  {
            title: '最近更新',
            dataIndex: 'lastUpdateTime',
            key: 'lastUpdateTime',
            align: "center" as "center",
        });
    }


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
            const tmp = {...searchParams, page: page};
            setSearchParams(tmp);
            getReserveData(tmp);
        }
    };

    useEffect(() => {
        getReserveData(searchParams);
    }, []);

    // 获取约看列表
    const getReserveData = (params) => {
        handleResponse(UserApi.getReserveHouseList(params), setReserveData, "获取约看列表失败", setLoading);
    };

    const dataSource = ReserveCommonProps.dataSource(reserveData.list);

    const handleStatusTabClick = (key) => {
        const tmp: any = {...searchParams, status: key, page: 1, sortDirection: undefined, orderBy: undefined};
        setSearchParams(tmp);
        getReserveData(tmp);
    };

    // 取消房源预约
    const handleCancelConfirm = (subscribeId) => {
        const key = subscribeId;
        const hide = message.loading({content: "取消预约中...", duration: 0, key: key});
        UserApi.cancelReserveHouse(subscribeId).then(res => {
            if(res){
                message.success({content: "取消预约成功", key: key});
                let page = reserveData.list.length <= 1 ? searchParams.page - 1 : searchParams.page;
                page = page >= 1 ? page : 1;
                const tmp = {...searchParams, page: page};
                setSearchParams(tmp);
                setReserveData({...reserveData, total: reserveData.total - 1});
                getReserveData(tmp);
            }else{
                hide();
            }
        })
    };

    const handleChange = (pagination, filters, sorter, extra) => {
        const direction = Tools.sortDirectionMap(sorter.order);
        const orderBy = direction ? sorter.field : undefined;
        if((orderBy !== searchParams.orderBy) || (direction !== searchParams.sortDirection)){
            const tmp:any = {...searchParams, page: 1, orderBy: orderBy, sortDirection: direction};
            setSearchParams(tmp);
            getReserveData(tmp);
        }
    };
    return (
        <Container>
            <Tabs activeKey={searchParams.status} onTabClick={handleStatusTabClick}>
                <TabPane tab="未确认" key="1"/>
                <TabPane tab="待看房" key="2"/>
                <TabPane tab="已完成" key="3"/>
            </Tabs>
            <Table columns={columns} pagination={pagination} dataSource={dataSource} loading={loading} locale={{
                emptyText: <Empty description="暂无数据"/>
            }} onChange={handleChange}/>
        </Container>
    )
};
const Container = styled.div`

`;

export default UserReserve;
