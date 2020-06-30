import React, {useState} from "react";
import styled from "styled-components";
import {CloseOutlined} from "@ant-design/icons/lib";

/**
 *  右侧房屋联系人
 */
const RightHouseAdminSideFix = () => {

    const [qrCodeVisible, seQrCodetVisible] = useState(true);

    return (
        <Container>
            <div className="side-fix">
                <div className="order">
                    {/*<div className="title">自如友家·瑞立中央花城·4居室-05卧</div>
                            <div className="price" style={{marginBottom: 20}}><span className="icon">￥</span><span className="number">1860 </span>/月（季付价）</div>*/}
                    <div className="btn">预约看房</div>
                    <div className="collect-tip">房源已被收藏0次</div>
                </div>
                <div className="admin">
                    <div className="avatar">
                        <img src="http://pic.ziroom.com/steward_images/60026661.png" alt="房东头像"/>
                    </div>
                    <div className="admin-info">
                        <div className="name">徐齐斌</div>
                        <div className="phone">17879502601</div>
                    </div>
                </div>
                {
                    qrCodeVisible &&
                    <div className="qrcode">
                        <div className="close" onClick={() => seQrCodetVisible(false)}><CloseOutlined/></div>
                        <div className="code"> <img src="//static8.ziroom.com/phoenix/pc/images/qrcode/2019/PC_info.png" alt="自如app"></img></div>
                        <div className="content">
                            <p>扫码下载自如APP</p>
                            <p>即时接收房源优惠及订阅信息～</p>
                        </div>
                    </div>
                }
            </div>
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
                background: #ff961e;
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
