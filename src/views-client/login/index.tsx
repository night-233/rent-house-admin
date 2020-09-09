import React, {useState} from "react";
import styled from "styled-components";
import LogoPng from "@assets/img/logo-user.png";
import LoginBackJpg from "@assets/img/login-background.jpg";
import {Scrollbars} from 'react-custom-scrollbars';
import Footer from "@views-client/layout/Footer";
import {Link, useHistory, useLocation} from "react-router-dom";
import LoginForm from "@views-client/login/LoginForm";
import NoPassLoginForm from "@views-client/login/NoPassLoginForm";
import RegisterForm from "@views-client/login/RegisterForm";
import {ModalModeType} from "@components/LoginRegiestModal";

/**
 * 登录页
 * Created by Administrator on 2020/8/12
 */
const Login = () => {

    const [modalType, setModalType] = useState(ModalModeType.PASSWORD_LOGIN);

    const history = useHistory();

    const handleLogin = () => {
        if(history.location.pathname === "/login"){
            history.push("/client/home");
        }else{
            history.push(history.location.pathname);
        }
    };

    return (
        <Container>
            <Scrollbars>
                <LoginHead/>
                <div className="content">
                    <img src="http://qiniu.touchfish.top/login-background.jpg" alt="" width="100%" height="100%" style={{position: "absolute"}} onError={(e:any) => {e.target.src=LoginBackJpg;}}/>
                    <div className="form-container">
                        <div className="form-modal">
                            {
                                modalType === ModalModeType.PASSWORD_LOGIN && <LoginForm onSwitchMode={setModalType} onLoginSuccess={handleLogin}/>
                            }
                            {
                                modalType === ModalModeType.CODE_LOGIN && <NoPassLoginForm onSwitchMode={setModalType} onLoginSuccess={handleLogin}/>
                            }
                            {
                                modalType === ModalModeType.REGISTER && <RegisterForm onSwitchMode={setModalType} onRegisterSuccess={handleLogin}/>
                            }
                        </div>
                    </div>
                </div>
                <Footer/>
            </Scrollbars>
        </Container>
    )
};

export const LoginHead = () => {
    return (
        <LoginHeadContainer>
            <div className="head">
                <Link to="/client/home" style={{display: "block", height: 83, width: 150}}/>
            </div>
        </LoginHeadContainer>
    )
};
const LoginHeadContainer = styled.div`
    border-bottom: 2px solid #51c6cf;
    .head{
        width: 1200px;
        height: 83px;
        margin: 0 auto;
        background:  url(${LogoPng}) no-repeat 0 50%;
    }
`;
const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background: #FFFFFF;
    .content{
        position: relative;
        height: 580px;
        .form-container{
            position: relative;
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            .form-modal{
                border-radius: 4px;
                background: #fff;
                width: 360px;
                padding: 20px 40px;
                position: absolute;
                top: 44px;
                right: 0;
                .span-btn{
                    font-size: 14px;
                    cursor: pointer;
                    color: #51c6cf;
                }
            }
        }
    }
`;

export const LoginStyle = {
  input: {
      width: 280,
      height: 45,
      lineHeight: "45px",
      borderRadius: 5
  },
  inputPrefix: {
      fontSize: 20,
      marginRight: 10,
      color: "#51c6cf"
  },
  button:{
      width: 280,
      height: 50,
      borderRadius: 5,
      marginTop: 20
  }
};

export const LoginTitle = ({children}) => {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: 20, lineHeight: "20px", marginBottom: 20}}>
            <div style={{flex: 1 , background: "#E5E5E5", height: 1}}/>
            <div style={{margin: "0 20px"}}>
                {children}
            </div>
            <div style={{flex: 1, background: "#E5E5E5", height: 1}}/>
        </div>
    )
};

export default Login;
