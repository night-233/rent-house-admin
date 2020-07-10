import React, {useEffect, useState} from "react";
import LoginRegisterModal, {ModalModeType} from "@views-client/layout/LoginRegiestModal";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux'
import userApi from "@apis/user";
import {RequestStatus} from "@base/RequestStatus";
import {changeUserInfo, logout} from "@store/redux/user.redux";
import cookie, {TokenKey} from "@utils/cookie";
import {useHistory} from "react-router";
/**
 * 登录注册按钮
 * @constructor
 */
const LoginRegisterBtn = () => {

    const user = useSelector(state => state.user);
    const history = useHistory();
    const dispatch = useDispatch();

    // 登录注册模态框控制
    const [loginRegisterModalType, setLoginRegisterModalType] = useState(ModalModeType.CODE_LOGIN);
    const [loginRegisterModalVisible, setLoginRegisterModalVisible] = useState(false);


    useEffect(() => {
        const token = cookie.getCookie(TokenKey);
        if(token){
            getClientUser();
        }
    }, []);


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
        <Container>
            {/* 登录注册模态框 */}
            <LoginRegisterModal
                visible={loginRegisterModalVisible}
                type={loginRegisterModalType}
                onTypeChange={setLoginRegisterModalType}
                onCancel={() => setLoginRegisterModalVisible(false)}
                onOk={handleLoginSuccess}
            />
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

        </Container>
    )
};

const Container = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    .btn{
       cursor: pointer;
    }
`;
export default LoginRegisterBtn;
