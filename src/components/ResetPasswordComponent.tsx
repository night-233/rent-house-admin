import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Button, Form, Input, Steps} from "antd";
import {CheckCircleOutlined, SmileOutlined, SolutionOutlined, UserOutlined} from "@ant-design/icons/lib";
import SlideImageVerify from "@components/SlideImageVerify";
import Tools from "@utils/tools";
import openApi from "@apis/open";
import {handleResponse} from "@utils/handle-reponse";
import {useForm} from "antd/es/form/Form";
import {useSelector, useDispatch} from 'react-redux'
import {logout} from "@store/redux/user.redux";
import {useHistory} from "react-router";

const { Step } = Steps;
/**
 * 重置密码
 * Created by Administrator on 2020/8/10
 */
const ResetPasswordComponent = (props) => {

    const {phone} = props;

    const [inputPhone, setInputPhone] = useState();

    const [smsCode, setSmsCode] = useState();

    const [verifyIdentityBtnLoading, setVerifyIdentityBtnLoading] = useState(false);
    const [changePasswordLoading, setChangePasswordLoading] = useState(false);

    const [timer, setTimer] = useState({
        count: 60,
        active: false
    });

    const [sendSmsBtn, setSendSmsBtn] = useState<any>({
        text: "获取验证码",
        disabled: false,
        sending: false
    });

    useEffect(() => {
        setInputPhone(phone);
    }, [phone]);

    const [showVerify, setShowVerify] = useState(false);

    const limits = useSelector(state => state.common.limits);

    const dispatch = useDispatch();
    const history = useHistory();

    // 第二步表单
    const [stepTwoForm] = useForm();
    // 当前步骤
    const [step, setStep] = useState(0);
    // 重置密码令牌
    const [resetPasswordToken ,setResetPasswordToken] = useState();

    const [redirectTimer, setRedirectionTimer] = useState({
        active: false,
        count: 3
    });

    useEffect(() => {
        let timeout: any = null;
        if(redirectTimer.active){
            if(redirectTimer.count === 0){
                history.push("/login");
            }else{
                timeout = setTimeout(() => {
                    setRedirectionTimer({active: true, count: redirectTimer.count - 1})
                }, 1000);
            }
        }else{
            clearTimeout(timeout);
        }
        return () => clearTimeout(timeout);
    }, [redirectTimer]);

    const handleCheckSuccess = (code) => {
        setShowVerify(false);
        setSendSmsBtn({text: "短信发送中", disable: true, sending: true});
        openApi.sendMessage({  operationType: "resetPassword",
            phoneNumber: inputPhone, verifyCode: code}).then(res => {
            if(res){
                setTimer({count: 60, active: true});
                setSendSmsBtn({text: "重新获取" + 60, disable: true, sending: false});
            }else{
                setSendSmsBtn({text: "获取验证码", disable: false, sending: false});
            }
        });
    };

    // 获取验证码倒计时
    useEffect(() => {
        let timeout: any = null;
        if(timer.active){
            if(timer.count === 0){
                setTimer({active: false, count: 60});
                setSendSmsBtn({text: "获取验证码", disable: false, sending: false});
            }else{
                timeout = setTimeout(() => {
                    const nextCount = timer.count - 1;
                    setTimer({active: true, count: nextCount});
                    setSendSmsBtn({text: "重新获取" + nextCount, disable: true, sending: false});
                }, 1000);
            }
        } else if (!timer.active && timer.count !== 0) {
            clearTimeout(timeout);
        }
        return () => clearTimeout(timeout);
    }, [timer]);

    // 发送按钮点击
    const handleSendClick = () => {
        setShowVerify(true);
    };

    // 验证身份
    const handleCheckIdentity = () => {
        handleResponse(openApi.getResetPasswordToken(inputPhone, smsCode), (res) => {
            const token = res.token;
            setStep(1);
            setResetPasswordToken(token);
        }, "身份验证失败", setVerifyIdentityBtnLoading);
    };

    // 修改密码
    const handleChangePassword = (password) => {
        handleResponse(openApi.resetPasswordByToken(resetPasswordToken, password), (res) => {
            setStep(2);
            dispatch(logout());
            setRedirectionTimer({...redirectTimer, active: true});
        }, "重置密码失败", setChangePasswordLoading);
    };


    return (
        <Container>
            <Steps current={step} className="steps">
                <Step title="验证身份" icon={<UserOutlined/>}/>
                <Step title="重置密码" icon={<SolutionOutlined/>}/>
                <Step title="完成" icon={<SmileOutlined />}/>
            </Steps>
            {/* 验证身份 */}
            {
                step === 0 &&
                <div className="step-form">
                    <div className="row" style={{marginBottom: 20}}>
                        <div className="left-title">
                            手机号
                        </div>
                        <div className="right-input">
                            {
                                phone ? <span>{phone}</span>
                                    :
                                    <Input style={inputStyle} placeholder="请输入手机号" value={inputPhone} onChange={e => setInputPhone(e.target.value)}/>
                            }
                        </div>
                    </div>
                    <div className="row" style={{marginBottom: 20}}>
                        <div className="left-title">
                            手机验证码
                        </div>
                        <div className="right-input">
                            <Input style={inputStyle} placeholder="请输入手机验证码" value={smsCode} onChange={e => setSmsCode(e.target.value)}/>
                            <Button type="primary"
                                    style={{height: 40, width: 116, borderRadius: 3, marginLeft: 10}}
                                    onClick={handleSendClick}
                                    loading={sendSmsBtn.sending}
                                    disabled={(!(inputPhone && Tools.checkPhone(inputPhone)) || sendSmsBtn.disable)}>
                                {sendSmsBtn.text}
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="left-title"/>
                        <div className="right-input">
                            <SlideImageVerify phone={inputPhone} onSuccess={handleCheckSuccess} visible={showVerify}/>
                            {
                                !showVerify &&  <Button type="primary"
                                                        style={{height: 40, width: 102, borderRadius: 3}}
                                                        onClick={handleCheckIdentity}
                                                        loading={verifyIdentityBtnLoading}
                                                        disabled={!(inputPhone && Tools.checkPhone(inputPhone) && smsCode)}>
                                    {
                                        verifyIdentityBtnLoading ? "提交中" : "下一步"
                                    }
                                </Button>
                            }
                        </div>
                    </div>
                </div>
            }
            {
                step === 1 &&
                    <div className="step-form">
                        <Form form={stepTwoForm}  onFinish={(values) => handleChangePassword(values.password)}>
                            <div className="row">
                                <div className="left-title">
                                    设置密码
                                </div>
                                <div className="right-input">
                                    <Form.Item rules={[{required: true, message: "请输入登录密码"}, {pattern: limits.userPasswordRegex, message: "请输入6-16位字母与数字组合密码"}]} name="password" >
                                        <Input.Password style={{...inputStyle, width: 300}} placeholder="请输入6-16位字母与数字组合密码"  autoComplete="new-password"/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row">
                                <div className="left-title">
                                    验证密码
                                </div>
                                <div className="right-input">
                                    <Form.Item dependencies={["password"]}
                                               rules={[{required: true, message: "请确认登录密码"},
                                                   ({ getFieldValue }) => ({
                                                       validator(rule, value) {
                                                           if (!value || getFieldValue('password') === value) {
                                                               return Promise.resolve();
                                                           }
                                                           return Promise.reject('两次密码不一致');
                                                       },
                                                   })]}
                                               name="passwordConfirm">
                                        <Input.Password style={{...inputStyle, width: 300}} placeholder="再次输入您的登录密码" autoComplete="new-password"/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row">
                                <div className="left-title"/>
                                <div className="right-input">
                                    <Button type="primary"
                                            htmlType="submit"
                                            style={{height: 40, width: 102, borderRadius: 3}}
                                            loading={changePasswordLoading}
                                    >
                                        {changePasswordLoading ? "提交中" : "确定"}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
            }
            {
                step === 2 &&
                    <div className="finish-container">
                        <CheckCircleOutlined style={{fontSize: 25, color: "#51c6cf", marginRight: 10}}/>重置密码完成! {redirectTimer.count}秒后自动跳转到登录页
                    </div>
            }
        </Container>
    )
};
const inputStyle = {
    height: 40,
    color: "#999",
    width: 172,
    borderRadius: 5
};
const Container = styled.div`
    width: 740px;
    margin: 30px auto;
    .step-form{
        margin-top: 30px;
        .row{
            display: flex;
            .left-title{
                height: 40px;
                line-height: 40px;
                width: 90px;
                font-size: 14px;
                color: #000;
            }
            .right-input{
                color: #999;
            }
        }
    }
    .finish-container{
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
    }

`;

export default ResetPasswordComponent;
