import React, {useState} from "react";
import styled from "styled-components";
import {Button, Form, Input} from "antd"
import {LoginStyle, LoginTitle} from "@views-client/login/index";
import {useForm} from "antd/es/form/Form";
import {MessageOutlined, UserOutlined} from "@ant-design/icons/lib";
import SmsCodeButton from "@components/SmsCodeButton";
import {ModalModeType} from "@components/LoginRegiestModal";
import openApi from "@apis/open";
import {loginIn} from "@store/redux/user.redux";
import { useDispatch } from 'react-redux'
/**
 *  免密登录
 * Created by Administrator on 2020/8/12
 */
const NoPassLoginForm = (props) => {

    const [form] = useForm();

    const [phone, setPhone] = useState();

    const {onSwitchMode, onLoginSuccess} = props;

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = (values) => {
        setLoading(true);
        openApi.loginInNoPwd({
            phoneNumber: values.phone,
            verifyCode: values.code
        }).then(res => {
            setLoading(false);
            if(res){
                dispatch(loginIn(res, res.token));
                onLoginSuccess();
            }
        });
    };
    return (
        <Container>
            <LoginTitle>免密登录</LoginTitle>
            <Form form={form} onFinish={handleLogin}>
                <Form.Item name="phone"  rules={[{required: true, message: "请输入手机号"}, {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '手机号格式错误'}]}>
                    <Input placeholder="请输入手机号" style={LoginStyle.input} prefix={<UserOutlined style={LoginStyle.inputPrefix}/>} onChange={e => setPhone(e.target.value)}/>
                </Form.Item>
                    <Form.Item name="code" rules={[{required: true, message: "请输入短信验证码"}]}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Input placeholder="短信验证码" style={{...LoginStyle.input, width: 150}} prefix={<MessageOutlined style={LoginStyle.inputPrefix}/>}/>
                            <SmsCodeButton phone={phone} operateType={"login"}/>
                        </div>
                    </Form.Item>

                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <span className="span-btn">账号登录</span>
                </div>
                <Button type="primary" htmlType="submit" style={LoginStyle.button} loading={loading}>
                    {loading ? "登录中" : "登录"}
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

export default NoPassLoginForm;
