import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Tools from "@utils/tools";
import {Divider, Empty, message, Popconfirm, Table, Tabs, Tag, Modal, Avatar} from "antd";
import {CarryOutOutlined, CheckCircleOutlined, DeleteOutlined} from "@ant-design/icons/lib";
import AdminApi from "@apis/admin";
import {handleResponse} from "@utils/handle-reponse";
import ReserveCommonProps from "@views-client/user/common/ReserveCommonProps";
import {HouseInfoColumnComponent} from "@views-client/user/user-center/star";

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

    const [userInfoModal, setUserInfoModal] = useState<any>({
        visible: false,
        user: {}
    });

    const columns: any = [
        {
            title: '房源信息',
            dataIndex: 'house',
            key: 'house',
            width: 370,
            render: (record) => <HouseInfoColumnComponent data={record}/>,
        },
        {
            title: '联系电话',
            dataIndex: 'telephone',
            key: 'telephone',
            align: "center" as "center",
            width: 120,
            render: value => <span>{value}</span>,
        },
        {
            title: '约看时间',
            dataIndex: 'orderTime',
            key: 'orderTime',
            align: "center" as "center",
            sorter: true,
            sortOrder: searchParams.orderBy === 'orderTime' && Tools.sortDirectionMap(searchParams.sortDirection),
        },
        {
            title: '约看描述',
            dataIndex: 'description',
            key: 'description',
            align: "center" as "center",
            width: 100,
            ellipsis: true
        },
        {
            title: '用户信息',
            dataIndex: 'user',
            key: 'user',
            align: "center" as "center",
            render: (user) => <Tag color="#51c6cf" style={{cursor: "pointer"}} onClick={() => setUserInfoModal({
                visible: true,
                user: user
            })}>{user?.name}</Tag>,
        }
    ];

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
            <Modal title={null} footer={null} bodyStyle={{padding: "60px 40px 90px"}} visible={userInfoModal.visible} onCancel={() => setUserInfoModal({...userInfoModal, visible: false})}>
                <ModalBodyContainer>
                    <h3>用户信息</h3>
                    <div className="info">
                        <Avatar src={userInfoModal.user?.avatar} size={60} style={{marginRight: 20, marginLeft: 30}}>
                            {userInfoModal.user?.name}
                        </Avatar>
                        <div>
                            <div className="name">{userInfoModal.user?.name}</div>
                            <div className="phone">{userInfoModal.user?.phoneNumber}</div>
                        </div>
                    </div>
                    <p className="tip">
                        温馨提示：为保障您的租住权益以及财产安全，请务必通过管家与自如签订房屋租赁合同。
                    </p>
                </ModalBodyContainer>
            </Modal>
        </Container>
    )
};
const Container = styled.div`

`;
const ModalBodyContainer = styled.div`
    h3{
        font-size: 30px;
        color: rgba(0,0,0,.85);
    }
    .info{
        background: rgba(0,0,0,.03);
        border-radius: 2px;
        margin-top: 30px;
        padding: 30px 0;
        display: flex;
        align-items: center;
    }
    .name{
        font-size: 24px;
        color: rgba(0,0,0,.85);
        line-height: 27px;
    }
    .phone{
        font-size: 24px;
        color: rgba(0,0,0,.6);
        margin-top: 6px;
        line-height: 27px;
    }
    .tip{
        font-size: 15px;
        color: rgba(0,0,0,.4);
        line-height: 22px;
        margin-top: 16px;
    }
`;

export default ReserveManage;
