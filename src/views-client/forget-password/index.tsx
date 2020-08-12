import React from "react";
import styled from "styled-components";
import ResetPasswordComponent from "@components/ResetPasswordComponent";
import {LoginHead} from "@views-client/login";
import Footer from "@views-client/layout/Footer";

/**
 * 忘记密码
 * Created by Administrator on 2020/8/12
 */
const ForgetPassword = () => {
    return (
        <>
            <LoginHead/>
            <Container>
                <div className="title">
                    忘记密码
                </div>
                <ResetPasswordComponent/>
            </Container>
            <Footer/>
        </>
    )
};
const Container = styled.div`
    margin: 50px auto;
    width: 980px;
    border: solid 1px #eee;
    min-height: 470px;
    .title{
        background: #fafafa;
        height: 50px;
        padding: 0 20px;
        font-size: 24px;
        font-size: 16px;
        border-bottom: solid 1px #eee;
        line-height: 50px;
    }
`;

export default ForgetPassword;
