import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal} from 'antd';
import styled from "styled-components";
import "./LoginRegiestModal.scss"
import {LoadingOutlined} from "@ant-design/icons/lib";
import openApi from '@apis/open'
import { useDispatch } from 'react-redux'
import {loginIn} from "@/store/redux/user.redux";
/**
 * 登录注册模态框
 * @constructor
 */
const LoginRegisterModal = ({type, onTypeChange, visible, onCancel, onOk}) => {

    const [codeSending, setCodeSending] = useState(false);

    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const [timer, setTimer] = useState({
        count: 60,
        active: false
    });

    const [codeBtn, setCodeBtn] = useState({
        text: "获取验证码",
        disable: false
    });

    const [formButtonLoading ,setFormButtonLoading] = useState(false);

    const onFinish = values => {
        const phone = values.phone;
        if(type === ModalModeType.CODE_LOGIN){
            const code = values.code;
            loginByCode(phone, code);
            return;
        }
        if(type === ModalModeType.PASSWORD_LOGIN){
            const password = values.password;
            loginByPassword(phone, password);
            return;
        }
        if(type === ModalModeType.REGISTER){
            const code = values.code;
            const password = values.password;
            register(phone, code, password);
        }
    };

    // 验证码登录
    const loginByCode = (phone, code) => {
        setFormButtonLoading(true);
       openApi.loginInNoPwd({
            phoneNumber: phone,
            verifyCode: code
        }).then(res => {
            setFormButtonLoading(false);
            if(res){
                dispatch(loginIn(res, res.token));
                onOk();
            }
        });
    };

    // 发送短信
    const sendSms = (phone, type) => {
        return openApi.sendMessage({  operationType: type,
            phoneNumber: phone})
    };

    // 账号密码登录
    const loginByPassword = (phone, password) => {
        setFormButtonLoading(true);
        openApi.userLogin({
            password: password,
            phone: phone
        }).then((res) => {
            setFormButtonLoading(false);
            if(res){
                dispatch(loginIn(res, res.token));
                onOk();
            }
        })
    };

    // 注册
    const register = (phone, code, password) => {
        setFormButtonLoading(true);
      openApi.registerPhone({phoneNumber: phone, password: password, verifyCode: code}).then(res => {
          setFormButtonLoading(false);
          if(res){
              dispatch(loginIn(res, res.token));
              onOk();
          }
      })
    };

    // 获取验证码倒计时
    useEffect(() => {
        let timeout: any = null;
        if(timer.active){
            if(timer.count === 0){
                setTimer({active: false, count: 60});
                setCodeBtn({text: "获取验证码", disable: false});
            }else{
                timeout = setTimeout(() => {
                    const nextCount = timer.count - 1;
                    setTimer({active: true, count: nextCount});
                    setCodeBtn({text: "重新获取" + nextCount, disable: true});
                }, 1000);
            }
        } else if (!timer.active && timer.count !== 0) {
            clearTimeout(timeout);
        }
        return () => clearInterval(timeout);
    }, [timer]);

    // 获取验证码点击
    const handleGetCodeClick = () => {
        form.validateFields(["phone"]).then((nameList) => {
            const codeType = type === ModalModeType.CODE_LOGIN ? "login" : "signUp";
            setCodeSending(true);
            setCodeBtn({text: "短信发送中", disable: true});
            sendSms(nameList.phone, codeType).then(res => {
                setCodeSending(false);
                if(res){
                    setTimer({count: 60, active: true});
                    setCodeBtn({text: "重新获取" + 60, disable: true});
                }else{
                    setCodeBtn({text: "获取验证码", disable: false});
                }
            });
        });
    };

    const initModal = () => {
        form.resetFields();
        setTimer({count: 60, active: false});
        setCodeBtn({text: "获取验证码", disable: false});
        setFormButtonLoading(false);
        setCodeSending(false);
    };

    // 手机号注册校验
    const phoneRegisterValidator = () => {
        if(type === ModalModeType.REGISTER){
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
                },
            }
        }
        return {};
    };

    useEffect(() => {
        form.resetFields();
    }, [type]);

    return (
            <Modal
                afterClose={initModal}
                onCancel={onCancel}
                centered={true}
                visible={visible}
                title={null}
                footer={null}
                width={486}
                forceRender={true}
                wrapClassName="login-register-modal-wrap"
            >
                <Container>
                    {
                        type === ModalModeType.REGISTER ?
                            <>
                                <div className="title">注册</div>
                                <div className="text">已有账号
                                    <span style={{color: "#79d8db", cursor: "pointer"}} onClick={() => {
                                        onTypeChange(ModalModeType.CODE_LOGIN);
                                    }}>登录</span>
                                </div>
                            </>
                            :
                            <>
                                <div className="title">登录</div>
                                <div className="text">没有账号？可以去
                                    <span style={{color: "#79d8db", cursor: "pointer"}} onClick={() => {
                                        onTypeChange(ModalModeType.REGISTER);
                                    }}>注册</span>
                                </div>
                            </>
                    }
                    <Form
                        form={form}
                        preserve={false}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            hasFeedback={type === ModalModeType.REGISTER}
                            label={null}
                            name="phone"
                            rules={[
                                { required: true, message: '请输入手机号' },
                                {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '手机号格式错误'},
                                phoneRegisterValidator,
                                ]}
                        >
                            <Input  placeholder="请输入手机号" size="large" style={{height: 50, borderRadius: 0}}/>
                        </Form.Item>
                        {
                            type !== ModalModeType.PASSWORD_LOGIN &&
                            <Form.Item
                                label={null}
                                name="code"
                                rules={[{ required: true, message: '请输入验证码' }]}
                            >
                                <div  style={{display: "flex"}}>
                                    <div style={{width: 260, marginRight: 10}}>
                                        <Input placeholder="请输入验证码" size="large" style={{height: 50,  borderRadius: 0}} autoComplete="new-password"/>
                                    </div>
                                    <GetCodeBtn disable={codeBtn.disable}  onClick={() => {
                                        if(!codeBtn.disable){
                                            handleGetCodeClick()
                                        }
                                    }}>{codeSending && <LoadingOutlined style={{marginRight: 5}}/>}
                                    <span style={{userSelect: "none"}}>{codeBtn.text}</span>
                                    </GetCodeBtn>
                                </div>
                            </Form.Item>
                        }
                        {
                            type !== ModalModeType.CODE_LOGIN &&
                            <Form.Item
                                label={null}
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input.Password placeholder="请输入6-16位字母与数字组合密码" size="large" style={{height: 50,  borderRadius: 0}} autoComplete="new-password"/>
                            </Form.Item>
                        }
                        <Form.Item>
                            <Button block size="large" type="primary" style={{height: 50, borderRadius: 0}} htmlType="submit" loading={formButtonLoading}>
                                {type === ModalModeType.REGISTER ? "注册" : "登录"}{formButtonLoading && "中..."}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        {
                            type === ModalModeType.CODE_LOGIN &&
                            <div className="login-switch">
                                <span onClick={() => onTypeChange(ModalModeType.PASSWORD_LOGIN)}>
                                    账号密码登录
                                </span>
                            </div>
                        }
                        {
                            type === ModalModeType.PASSWORD_LOGIN &&
                            <div className="login-switch">
                                <span onClick={() => onTypeChange(ModalModeType.CODE_LOGIN)}>
                                    手机验证码登录
                                </span>
                            </div>
                        }
                    </div>
                </Container>
            </Modal>
    )
};

const Container = styled.div`
    font-size: 17px;
   .title{
        font-size: 30px;
        line-height: 36px;
        color: rgba(0,0,0,.85);
   }
   .text{
        margin-top: 14px;
        margin-bottom: 30px;
        line-height: 20px;
   }
   .login-switch{
        color: #79d8db;
        line-height: 20px;
        text-align: center;
        margin-top: 20px;
        cursor: pointer;
   }
`;
const GetCodeBtn = styled.div`
    display: block;
    width: 136px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 2px;
    outline: 0 none;
    cursor: pointer;
    ${({disable}: {disable: boolean}) => disable ? 
        `
            border: 0;
            background-color: #000;
            background-color: rgba(0,0,0,.06);
            color: rgba(0,0,0,.4);
            cursor: not-allowed;
        `
    :
        `
            border: 1px solid rgba(121,216,219,.8);
            background-color: #fff;
            color: rgba(121,216,219);
        `
    }   
`;

// 模态框模式
export enum ModalModeType {
    CODE_LOGIN,
    PASSWORD_LOGIN,
    REGISTER
}
export default LoginRegisterModal;
