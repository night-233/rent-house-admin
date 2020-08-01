import React, {useState} from "react";
import styled from "styled-components";
import {CloseOutlined} from "@ant-design/icons/lib";
import {useSelector, useDispatch} from "react-redux"
import MakeAppointmentHouseModal from "@views-client/house/MakeAppointmentHouseModal";
import {Avatar, Button, notification} from 'antd';
import {ModalModeType} from "@components/LoginRegiestModal";
import {
    changeLoginModalType,
    changeLoginModalVisible,
    setLoginModalCallback
} from "@store/redux/common.redux";
/**
 *  右侧房屋联系人
 */
const RightHouseAdminSideFix = ({isSticky}) => {

    const [qrCodeVisible, seQrCodetVisible] = useState(true);

    const houseInfo = useSelector(state => state.house.house);

    const agent = useSelector(state => state.house.agent);

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const reserve = useSelector(state => state.house.reserve);

    const [reserveModalVisible, setReserveModalVisible] = useState(false);


    // 处理预约看房点击
    const handleHouseClick = () => {
            if(user.authed){
                if(reserve) {
                    notification.info({
                        message: "不能重复预约",
                        description: "您已约看过该房源,可在 个人中心->我的约看, 中查看预约信息"
                    });
                }else{
                    setReserveModalVisible(true);
                }
            }else{
                dispatch(changeLoginModalType(ModalModeType.CODE_LOGIN));
                dispatch(changeLoginModalVisible(true));
                dispatch(setLoginModalCallback(() => setReserveModalVisible(true)));
            }
    };

    // 预约成功
    const handleReserveSuccess = () => {
        setReserveModalVisible(false);
        notification.success({
            message: "预看成功",
            description: "您已成功约看当前房源，稍后房东确认后将会通过手机号与您联系确认。请保持电话畅通",
            duration: 0
        });
    };

    return (
        <Container>
            {
                isSticky &&
                    <div style={{height: 80, zIndex: -1}}/>
            }
            <div className="side-fix">
                <div className="order">
                    {
                        isSticky &&
                        <>
                            <div className="title">{houseInfo.title}</div>
                            <div className="price" style={{marginBottom: 20}}><span className="icon">￥</span><span className="number">{houseInfo.price} </span>/月（季付价）</div>
                        </>
                    }
                    <Button type="primary" style={{width: "100%", height: "46px", borderRadius: "2px"}} onClick={handleHouseClick}>
                        { reserve ? "已预约" : "预约看房" }
                    </Button>
                    <div className="collect-tip">房源已被收藏{houseInfo.starNumber || 0}次</div>
                </div>
                <div className="admin">
                    <div className="avatar">
                        <Avatar  size={60} src={agent.avatar}>房东</Avatar>
                        {/*<img src={agent.avatar} alt="房东头像"/>*/}
                    </div>
                    <div className="admin-info">
                        <div className="name">{agent.nickName}</div>
                        <div className="phone">{agent.phoneNumber}</div>
                    </div>
                </div>
                {
                    qrCodeVisible &&
                    <div className="qrcode">
                        <div className="close" onClick={() => seQrCodetVisible(false)}><CloseOutlined/></div>
                        <div className="code"> <img src="//static8.ziroom.com/phoenix/pc/images/qrcode/2019/PC_info.png" alt="自如app"/></div>
                        <div className="content">
                            <p>扫码下载自如APP</p>
                            <p>即时接收房源优惠及订阅信息～</p>
                        </div>
                    </div>
                }
            </div>
            <MakeAppointmentHouseModal visible={reserveModalVisible} onCancel={() => setReserveModalVisible(false)} houseId={houseInfo.id} onSuccess={handleReserveSuccess}/>
        </Container>
    )
};

const Container = styled.div`
    .side-fix{
        .order {
            border-radius: 2px;
            font-size: 0;
            padding: 20px;
            position: relative;
            width: 358;
            border: 1px solid rgba(0,0,0,.12);
            .title{
                font-size: 17px;
                margin: 0;
            }
            .btn{
                background: #51c6cf;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size:
                border-radius: 2px;
                font-size: 17px;
                height: 46px;
                line-height: 46px;
                text-align: center;
                cursor: pointer;
            }
            .collect-tip{
                color: rgba(0,0,0,.4);
                font-size: 13px;
                margin-top: 16px;
                text-align: center;
            }
        }
        .admin{
            display: flex;
            margin-top: 20px;
            .avatar{
                border-radius: 72px;
                height: 60px;
                margin-right: 12px;
                overflow: hidden;
                width: 60px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        .admin-info{
            display: flex;
            flex-direction: column;
            justify-content: center;
          .name{
            color: rgba(0,0,0,.85);
            font-size: 18px;
           }
           .phone{
               color: rgba(0,0,0,.4);
               font-size: 15px;
               margin-top: 10px;
           }
        }
    }
    .qrcode{
        border-radius: 2px;
        margin-top: 20px;
        padding: 20px;
        position: relative;
        border: 1px solid rgba(0,0,0,.12);
        border-radius: 4px;
        display: flex;
        .close{
            position: absolute;
            right: 14px;
            top: 14px;
            cursor: pointer;
            font-size: 18px;
        }
        .code{
            width: 60px;
            height:60px;
        }
        .content {
            padding-left: 15px;
             p {
                line-height: 30px;
                color: rgba(0,0,0,.85);
                font-size: 15px;
                font-weight: 600;
                line-height: 30px;
            }
        }
    }
}
`;

export default RightHouseAdminSideFix;
