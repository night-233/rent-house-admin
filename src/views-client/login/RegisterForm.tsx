import React, {useState} from "react";
import styled from "styled-components";
import {LoginStyle, LoginTitle} from "@views-client/login/index";
import {Button, Form, Input} from "antd";
import {LockOutlined, MessageOutlined, UserOutlined} from "@ant-design/icons/lib";
import SmsCodeButton from "@components/SmsCodeButton";
import {useForm} from "antd/es/form/Form";
import {ModalModeType} from "@components/LoginRegiestModal";
import openApi from "@apis/open";
import {loginIn} from "@store/redux/user.redux";
import {useDispatch, useSelector} from 'react-redux'

/**
 * 新用户注册
 * Created by Administrator on 2020/8/12
 */
const RegisterForm = (props) => {

    const [form] = useForm();

    const [phone, setPhone] = useState();

    const {onSwitchMode, onRegisterSuccess} = props;

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const limits = useSelector(state => state.common.limits);

    const handleRegister = (values) => {
        setLoading(true);
        openApi.registerPhone({phoneNumber: values.phone, password: values.password, verifyCode: values.code}).then(res => {
            setLoading(false);
            if(res){
                dispatch(loginIn(res, res.token));
                onRegisterSuccess();
            }
        })
    };
    // 手机号注册校验
    const phoneRegisterValidator = () => {
        return {
            validator(rule, value) {
                const pattern = /^1[3|4|5|7|8][0-9]\d{8}$/;
                if(value && pattern.test(value)){
                    const result = openApi.checkPhoneExist(value).then(res => {
                        if(res && res.exist){
                            return Promise.reject('该手机号已注册');
                        }else{
                            return Promise.resolve();
                        }
                    });
                    return result;
                }else{
                    return Promise.resolve();
                }
            }
        }
    };
    return (
        <Container>
            <LoginTitle>新用户注册</LoginTitle>
            <Form form={form} onFinish={handleRegister}>
                <Form.Item name="phone"  rules={[{required: true, message: "请输入手机号"}, {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '手机号格式错误'}, phoneRegisterValidator]}>
                    <Input placeholder="请输入手机号" style={LoginStyle.input} prefix={<UserOutlined style={LoginStyle.inputPrefix}/>} onChange={e => setPhone(e.target.value)}/>
                </Form.Item>
                <Form.Item name="code" rules={[{required: true, message: "请输入短信验证码"}]}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Input placeholder="短信验证码" style={{...LoginStyle.input, width: 150}} prefix={<MessageOutlined style={LoginStyle.inputPrefix}/>}/>
                        <SmsCodeButton phone={phone} operateType={"signUp"}/>
                    </div>
                </Form.Item>
                <Form.Item name="password" rules={[{required: true, message: "请输入密码"}, {pattern: limits.userPasswordRegex, message: "请输入6-16位字母与数字组合密码"}]}>
                    <Input.Password placeholder="请输入6-16位密码" style={LoginStyle.input} prefix={<LockOutlined style={LoginStyle.inputPrefix}/>} autoComplete="new-password"/>
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{...LoginStyle.button, marginTop: 0}}>
                    {loading ? "注册中" : "注册"}
                </Button>
                <div style={{marginTop: 20, textAlign: "center"}}>
                    已有账号？现在就<span className="span-btn" style={{marginLeft: 5}} onClick={() => onSwitchMode(ModalModeType.PASSWORD_LOGIN)}>登录</span>
                </div>
            </Form>
        </Container>
    )
};
const Container = styled.div`

`;

export default RegisterForm;
