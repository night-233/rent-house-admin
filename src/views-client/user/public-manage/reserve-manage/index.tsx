import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Tools from "@utils/tools";
import {Divider, Empty, message, Popconfirm, Table, Tabs} from "antd";
import {CarryOutOutlined, CheckCircleOutlined, DeleteOutlined} from "@ant-design/icons/lib";
import AdminApi from "@apis/admin";
import {handleResponse} from "@utils/handle-reponse";
import ReserveCommonProps from "@views-client/user/common/ReserveCommonProps";

const { TabPane } = Tabs;
/**
 * Created by Administrator on 2020/8/4
 */
const ReserveManage = () => {


    const [searchParams, setSearchParams] = useState({
        status: "1",
        page: 1,
        pageSize: 5,
        orderBy: undefined,
        sortDirection: undefined,
    });

    const [loading, setLoading] = useState(false);

    const [reserveData, setReserveData] = useState({
        total: 0,
        list: []
    });

    const columns: any = ReserveCommonProps.columns(searchParams);

    if(searchParams.status === "1"){
        columns.push(  {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align: "center" as "center",
            render: (text, record) => (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Popconfirm title="已经联系用户并确认过该约看？" okText="确认" cancelText="取消" onConfirm={() => handleOperateReserve(record.key, 2)}>
                        <CarryOutOutlined style={{cursor: "pointer", color: "#51c6cf"}} title="已联系用户"/>
                    </Popconfirm>
                    <Divider type="vertical"/>
                    <Popconfirm title="确认要取消该预约吗？" okText="确认" cancelText="取消" onConfirm={() => handleOperateReserve(record.key, 1)}>
                        <DeleteOutlined style={{cursor: "pointer", color: "red"}} title="取消预约"/>
                    </Popconfirm>
                </div>
            )
        });
    }
    else if(searchParams.status === "2"){
        columns.push(  {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align: "center" as "center",
            render: (text, record) => (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Popconfirm title="用户已完成看房？" okText="确认" cancelText="取消" onConfirm={() => handleOperateReserve(record.key, 3)}>
                        <CheckCircleOutlined style={{cursor: "pointer", color: "#51c6cf"}} title="已看房" />
                    </Popconfirm>
                    <Divider type="vertical"/>
                    <Popconfirm title="确认要取消该预约吗？" okText="确认" cancelText="取消" onConfirm={() => handleOperateReserve(record.key, 1)}>
                        <DeleteOutlined style={{cursor: "pointer", color: "red"}} title="取消预约"/>
                    </Popconfirm>
                </div>
            )
        });
    }
    else{
        columns.push(  {
            title: '最近更新',
            dataIndex: 'lastUpdateTime',
            key: 'lastUpdateTime',
            align: "center" as "center",
        });
    }

    useEffect(() => {
        getReserveData(searchParams);
    }, []);

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

    const getReserveData = (params) => {
        handleResponse(AdminApi.getReserveData(params), setReserveData, "获取预约数据失败", setLoading);
    };

    const handleChange = (pagination, filters, sorter) => {
        const direction = Tools.sortDirectionMap(sorter.order);
        const orderBy = direction ? sorter.field : undefined;
        if((orderBy !== searchParams.orderBy) || (direction !== searchParams.sortDirection)){
            const tmp:any = {...searchParams, page: 1, orderBy: orderBy, sortDirection: direction};
            setSearchParams(tmp);
            getReserveData(tmp);
        }
    };

    const dataSource = ReserveCommonProps.dataSource(reserveData.list);

    const handleStatusTabClick = (key) => {
        const tmp: any = {...searchParams, status: key, page: 1, sortDirection: undefined, orderBy: undefined};
        setSearchParams(tmp);
        getReserveData(tmp);
    };

    // 处理预约操作
    const handleOperateReserve = (reserveId, operate) => {
        let loadingMsg = "";
        let successMsg = "";
        let request;
        switch (operate) {
            case 1:
                loadingMsg = "取消预约中...";
                successMsg = "预约取消成功";
                request = AdminApi.cancelReserve(reserveId);
                break;
            default:
                loadingMsg = "预约状态更新中...";
                successMsg = "预约状态更新成功";
                request = AdminApi.updateHouseReserveStatus(reserveId, operate);
        }
        const hide = message.loading({content: loadingMsg, duration: 0, key: reserveId});
        request.then(res => {
            if(res){
                message.success({content: successMsg, key: reserveId});
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

    return (
        <Container>
            <Tabs activeKey={searchParams.status} onTabClick={handleStatusTabClick}>
                <TabPane tab="待确认" key="1"/>
                <TabPane tab="待看房" key="2"/>
                <TabPane tab="已完成" key="3"/>
            </Tabs>
            <Table columns={columns} pagination={pagination} loading={loading} locale={{
                emptyText: <Empty description="暂无数据"/>
            }} onChange={handleChange} dataSource={dataSource}/>
        </Container>
    )
};
const Container = styled.div`

`;

export default ReserveManage;
