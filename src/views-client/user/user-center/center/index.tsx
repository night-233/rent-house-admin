import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Avatar, Divider, Empty, Spin} from "antd";
import {Link} from "react-router-dom";
import { useSelector} from 'react-redux'
import {MailOutlined, PhoneOutlined} from "@ant-design/icons/lib";
import UserApi from "@apis/user";
import {handleResponse} from "@utils/handle-reponse";

/**
 * Created by Administrator on 2020/7/29
 */
const UserCenter= () => {

    const userInfo = useSelector(state => state.user.userInfo);

    const [recentStar, setRecentStar] = useState([]);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getStarList();
    }, []);

    const getStarList = () => {
        handleResponse( UserApi.getUserStarHouseList({
            page: 1,
            pageSize: 3
        }), (res) => setRecentStar(res.list), "获取最近收藏失败", setLoading);
    };

    return (
        <Container>
            <div className="user-info">
                <div style={{display: "flex"}}>
                    <div className="photo">
                        <Avatar size={120} src={userInfo.avatar}>
                            {userInfo.name}
                        </Avatar>
                    </div>
                    <div className="information">
                        <p className="p1">下午好，
                            <Link to="/user/info"> <span className="name">{userInfo.name}</span></Link>
                        </p>
                        <p style={{marginTop: 15, lineHeight: "14px"}}>
                            <Link to="/user/info"> <span style={{fontSize: "14px", color: "#999999"}}>修改个人资料</span></Link>
                        </p>
                        <p className="bind">
                    <span className="active" style={{marginRight: 20}}>
                           <PhoneOutlined style={{marginRight: 5}}/>
                            已绑定手机号
                    </span>
                            <span>
                          <MailOutlined style={{marginRight: 5}}/>
                        未绑定邮箱
                    </span>
                        </p>
                    </div>
                </div>
                <div className="right">
                    <div style={{textAlign: "center"}}>
                        <p>钱包余额</p>
                        <p className="money">¥999</p>
                    </div>
                    <Divider type="vertical" style={{height: 90, margin: "0 50px"}}/>
                    <div style={{textAlign: "center"}}>
                        <p>自如分</p>
                        <p style={{marginTop: 24, fontSize: 22}}>未授权</p>
                        <p style={{fontSize: 12}}>请到自如APP授权</p>
                    </div>
                </div>
            </div>
            <div className="collection">
                <h5>最近收藏</h5>
                <Spin spinning={loading}>
                    {
                        recentStar.length === 0 ?
                            <Empty description="您还没有收藏的房源，快去看看吧"/>
                            :
                            <div className="star-list">
                                {
                                    recentStar.map((item: any) => (
                                        <div className="item" key={item.house.id}>
                                            <Link to={`/client/house/${item.house?.id}`}>
                                                <div className="img">
                                                    <img height={190} width="100%" src={item.house?.cover} alt=""/>
                                                </div>
                                                <div className="info">
                                                    <div className="name">{item.house?.title}</div>
                                                    <div className="price">¥{item.house?.price}/月</div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </Spin>
            </div>
        </Container>
    )
};
const Container = styled.div`
    .user-info{
        display: flex;
        padding: 30px 10px;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        .photo{
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 30px;
        }
        .information{
            .p1{
                font-size: 20px;
                color: #444;
                padding-top: 15px;
            }
            .name{
                color: #51c6cf;
            }
            .bind{
                font-size: 14px;
                color: #999;
                margin-top: 15px;
                .active{
                    color: #444;
                }
            }
        }
        .right{
            font-size: 14px;
            color: #999;
            display: flex;
            align-items: center;
            .money{
                font-size: 30px;
                color: #ffa000;
                margin-top: 26px;
            }
        }
    }
    .collection{
        padding: 30px 0;
        h5{
            display: inline-block;
            font-size: 16px;
            color: #333;
            padding-bottom: 14px;
            border-bottom: 2px solid #51c6cf;
            margin-bottom: 20px;
        }
        .star-list{
            display: flex;
            .item{
                position: relative;
                width: calc(33.33%);
                font-size: 14px;
                padding: 0 10px;
                &:last-child{
                    margin-right: 0;
                }
                .img{
                    width: 100%;
                    height: 190px;
                    overflow: hidden;
                    margin-bottom: 10px;
                }
                .info{
                    display: flex;
                    justify-content: space-between;
                    .name{
                        color: #444;
                        width: 200px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .price{
                        color: #51c6cf;
                        font-weight: 400;
                    }
                }
            }
        }
    }

`;

export default UserCenter;
