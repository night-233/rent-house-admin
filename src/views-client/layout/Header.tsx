import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Logo from "@assets/img/logo.png";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import BaiduApi from "@apis/baidu";
import AddressApi from "@apis/address";
import { useDispatch, useSelector } from 'react-redux'
import {changeCity} from "../../store/redux/common.redux";
import LoginRegisterModal, {ModalModeType} from "./LoginRegiestModal"
import cookie, {TokenKey} from "@utils/cookie";
import userApi from "@apis/user";
import {changeUserInfo, loginOut, logout} from "../../store/redux/user.redux";
import {RequestStatus} from "../../base/RequestStatus"
import {useHistory} from "react-router";
const Header = (props) => {

    const {fixed = true, showCity = true} = props;

    const [supportCitiesList, setSupportCitiesList] = useState([]);

    const city = useSelector(state => state.common.city);

    // 登录注册模态框控制
    const [loginRegisterModalType, setLoginRegisterModalType] = useState(ModalModeType.CODE_LOGIN);
    const [loginRegisterModalVisible, setLoginRegisterModalVisible] = useState(false);

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const token = cookie.getCookie(TokenKey);
        if(token){
            getClientUser();
        }
    }, []);

    const history = useHistory();


    useEffect(() => {
        if(showCity){
            getSupportCities().then(res => {
                if(res){
                    const cityList = res.list;
                    setSupportCitiesList(cityList);
                    getCurrentCity().then( (result:any) => {
                        const city = result?.content?.address_detail?.city?.replace("市", "");
                        const matchCity = cityList.find(item => item.cnName === city);
                        if(matchCity){
                            dispatch(changeCity({cnName: matchCity.cnName, enName: matchCity.enName}));
                        }else if(cityList.length > 0){
                            dispatch(changeCity({cnName: cityList[0].cnName, enName: cityList[0].enName}))
                        }
                    })
                }
            })
        }
    }, []);

    // 获取当前城市
    const getCurrentCity = () => {
        return BaiduApi.getCurrentCity();
    };

    // 获取支持城市列表
    const getSupportCities = async () => {
        return  AddressApi.getSupportCities();
    };

    // 处理城市选择
    const handleCityClick = ({item, key}) => {
        if(city.enName !== key){
            dispatch(changeCity({cnName: item.props.title,  enName: key}));
        }
    };

    // 处理登录成功
    const handleLoginSuccess = () => {
        getClientUser();
        setLoginRegisterModalVisible(false);
    };

    // 获取当前用户
    const getClientUser = () => {
        userApi.clientGetUserInfo().then((res: any) => {
            if (res.code === RequestStatus.SUCCESS) {
                dispatch(changeUserInfo(res.data))
            }else{
                cookie.removeCookie(TokenKey);
            }
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        history.push('/client/home');
    };

    return (
        <Container fixed={fixed}>
            {/* 登录注册模态框 */}
            <LoginRegisterModal
                visible={loginRegisterModalVisible}
                type={loginRegisterModalType}
                onTypeChange={setLoginRegisterModalType}
                onCancel={() => setLoginRegisterModalVisible(false)}
                onOk={handleLoginSuccess}
            />
            <div className="content">
                <div style={{display: "flex"}}>
                    <LogoContainer src={Logo}/>
                    {
                        showCity &&
                        <LocationContainer>
                            <Dropdown overlay={<Menu onClick={handleCityClick}>
                                {
                                    supportCitiesList.map((item: any) => <Menu.Item key={item.enName} title={item.cnName}>{item.cnName}</Menu.Item>)
                                }
                            </Menu>}>
                                <div className="city">
                                    <span style={{marginRight: "5px"}}>{city.cnName}</span><DownOutlined />
                                </div>
                            </Dropdown>
                        </LocationContainer>
                    }
                </div>
                <div className="tab-menu">
                    <div className="item"><span className="title"> 首页 <span className="underline"/></span></div>
                    <div className="item"><span className="title"> 租房 <span className="underline"/></span></div>
                    <div className="item"><span className="title"> 一夜租房 <span className="underline"/></span></div>
                    <div className="item"><span className="title"> 拼室友 <span className="underline"/></span></div>
                    <div className="item"><span className="title"> APP下载 <span className="underline"/></span></div>
                    <div className="item"><span className="title"> 房东中心 <span className="underline"/></span></div>
                </div>
                <div className="login-register">
                    {
                        !user.authed ?
                        <>
                        <span className="btn" onClick={() => {
                            setLoginRegisterModalType(ModalModeType.CODE_LOGIN)
                            setLoginRegisterModalVisible(true);
                        }}>登录</span>
                            <span className="btn" style={{margin: "0 10px"}}>|</span>
                            <span className="btn" onClick={() => {
                            setLoginRegisterModalType(ModalModeType.REGISTER)
                            setLoginRegisterModalVisible(true);
                            }}>注册</span>
                        </>
                            :
                            <>
                        <span className="btn" style={{marginRight: 10}}>
                            {user.userInfo.nickName}
                        </span>
                        <span className="btn" onClick={handleLogout}>退出</span>
                        </>
                    }

                </div>
            </div>
        </Container>
    )
};

const Container = styled.div`
    ${({fixed = true}: {fixed?: boolean}) => fixed ? 
    `
        position: fixed;
        top: 0;
        left: 0;
    `
    :
        ``
    }
    height: 60px;
    line-height: 60px;
    color: #fff;
    width: 100%;
    z-index: 11;
    -webkit-transition: none!important;
    transition: none!important;
    background-color: #fff;
    color: #000!important;
    color: rgba(0,0,0,.85)!important;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,.08);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.08);
    display: flex;
    justify-content: center;
    .content{
        width: 1152px;
        margin: 0 auto;
        position: relative;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .tab-menu{
        width: 400px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item{
            cursor: pointer;
            font-size: 15px;
            .title{
                padding: 9px 5px;
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
        }
    }
    .login-register{
        height: 100%;
        display: flex;
        align-items: center;
        .btn{
           cursor: pointer;
        }
    }
`;
const LogoContainer = styled.img`
    margin: 0;
    height: 100%;
    width: 160px;
    padding: 14px 0;
`;
const LocationContainer = styled.div`
    line-height: 25px;
    width: 92px;
    position: relative;
    height: 60px;
    padding: 14px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    .city{
        height: 25px;
        color: rgba(0,0,0,.4);
        line-height: 25px;
        width: 60px;
        border-radius: 25%;
        border: 1px solid rgba(0,0,0,.4);
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export default Header;
