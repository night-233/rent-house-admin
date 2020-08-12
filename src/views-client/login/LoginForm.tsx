import React, {useState} from "react";
import styled from "styled-components";
import {Button, Form, Input} from "antd"
import {LoginStyle, LoginTitle} from "@views-client/login/index";
import {useForm} from "antd/es/form/Form";
import {LockOutlined, UserOutlined} from "@ant-design/icons/lib";
import {ModalModeType} from "@components/LoginRegiestModal";
import openApi from "@apis/open";
import {loginIn} from "@store/redux/user.redux";
import { useDispatch } from 'react-redux'
import {Link} from "react-router-dom";
/**
 * Created by Administrator on 2020/8/12
 */
const LoginForm = (props) => {

    const [form] = useForm();

    const {onSwitchMode, onLoginSuccess} = props;

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = (values) => {
        setLoading(true);
        openApi.userLogin({
            password: values.password,
            phone: values.phone
        }).then((res) => {
            setLoading(false);
            if(res){
                dispatch(loginIn(res, res.token));
                onLoginSuccess();
            }
        })
    };

    return (
        <Container>
            <LoginTitle>欢迎登录</LoginTitle>
            <Form form={form} onFinish={handleLogin}>
                <Form.Item name="phone"  rules={[{required: true, message: "请输入手机号"}, {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '手机号格式错误'}]}>
                    <Input placeholder="请输入手机号" style={LoginStyle.input} prefix={<UserOutlined style={LoginStyle.inputPrefix}/>}/>
                </Form.Item>
                <input style={{display: "none"}}/>
                <Form.Item name="password" rules={[{required: true, message: "请输入密码"}]}>
                    <Input.Password placeholder="请输入6-16位密码" style={LoginStyle.input} prefix={<LockOutlined style={LoginStyle.inputPrefix}/>} autoComplete="new-password"/>
                </Form.Item>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <span className="span-btn" onClick={() => onSwitchMode(ModalModeType.CODE_LOGIN)}>免密登录</span>
                    <Link to="/forget-password" className="span-btn">忘记密码？</Link>
                </div>
                <Button type="primary" htmlType="submit" style={LoginStyle.button} loading={loading}>
                    {
                        loading ? "登录中" : "登录"
                    }
                </Button>
                <div style={{marginTop: 20, textAlign: "center"}}>
                    没有账号？现在就<span className="span-btn" style={{marginLeft: 5}} onClick={() => onSwitchMode(ModalModeType.REGISTER)}>注册</span>
                </div>
            </Form>
        </Container>
    )
};
const Container = styled.div`

`;

export default LoginForm;
