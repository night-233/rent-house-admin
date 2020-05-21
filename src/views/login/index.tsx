
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { login } from '@/store/redux/user.redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import style from '@assets/global-style';
import { useHistory } from 'react-router-dom';

function Login () {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const history = useHistory();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 17, span: 8 },
  };
  const onFinish = values => {
    const data = JSON.parse(JSON.stringify(values))
    setLoading(true)
    dispatch(login(data)).then(() => {
      setLoading(false)
      history.push('/')
    })
  };
  const onFinishFailed = errorInfo => {
    message.error('请完成校验再登录')
  };
  return (
    <LoginWrap>
      <section className="login-box">
        <div className="threeD-txt threeD-txt--index-about"></div>
        <div className="root-wrap">
          <div className="title">登录房东管理系统</div>
          <section className="login-block">
            {!loading ? (
              <Form
                {...layout}
                name="basic"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>) : <Spin />}
          </section>

        </div>

      </section>

    </LoginWrap>
  );
}

const LoginWrap = styled.div`
  background: #f4f7ed;
  height: calc(100vh);
  display: flex;
  justify-content: center;
  position: relative;
  .threeD-txt:before {
    content: 'login in';
    text-shadow: 0 0 15px #658e8c;
    color: #8ddae0;
    position: absolute;
    z-index: -1;
    margin: -.1em 0 0;
    animation: skew 2s ease-in-out alternate infinite;
    transform-origin: bottom;
    box-sizing: border-box;
  }
  .threeD-txt {
    font-family: Montserrat;
    font-weight: 700;
    position: absolute;
    text-align: center;
    font-size: 12em;
    color: rgba(249, 249, 249, .7);
    animation: rotate 2s ease-in-out alternate infinite;
    z-index: 0;
    transform: translateZ(-888px) !important;
    text-shadow: rgb(208, 230, 231) -1px 1px, rgb(208, 230, 231) -2px 2px, rgb(208, 230, 231) -3px 3px, rgb(208, 230, 231) -4px 4px, rgb(208, 230, 231) -5px 5px, rgb(208, 230, 231) -6px 6px, rgb(208, 230, 231) -7px 7px, rgb(208, 230, 231) -8px 8px, rgb(208, 230, 231) -9px 9px, rgb(189, 214, 218) -10px 10px 40px;
  }
  .threeD-txt--index-about {
    color: rgba(255, 255, 255, .8);
    animation: rotate-white 2s ease-in-out alternate infinite;
  }
  .threeD-txt--index-about {
    animation: rotate-white 1.5s ease-in-out alternate infinite;
    top: 70px;
    color: rgba(255, 255, 255, .8);
    position: absolute;
    text-transform: uppercase;
    left:50px;
    font-size: 8em;
  }
  @keyframes rotate-white {
    0% {
      transform: rotate3d(0, 1, .1, -10deg);
      text-shadow: 1px -1px #eeeef0, 2px -1px #eeeef0, 3px -2px #eeeef0, 4px -2px #eeeef0, 5px -3px #eeeef0, 6px -3px #eeeef0, 7px -4px #eeeef0, 8px -4px #eeeef0, 9px -5px #eeeef0, 10px -5px 40px rgba(204, 204, 204, .7);
    }
    100% {
      transform: rotate3d(0, 1, .1, 10deg);
      text-shadow: -1px -1px #eeeef0, -2px -1px #eeeef0, -3px -2px #eeeef0, -4px -2px #eeeef0, -5px -3px #eeeef0, -6px -3px #eeeef0, -7px -4px #eeeef0, -8px -4px #eeeef0, -9px -5px #eeeef0, -10px -5px 40px rgba(204, 204, 214, .7);
    }
  }
  .login-box {
    padding-top: 20px;
   .title {
     padding-top: 35px;
     text-align: center;
     font-size: 20px;
     margin-bottom: 24px;
     color: ${style["theme-color"]};
   }
  }
  .root-wrap {
    border-radius: 8px;
    width: 420px;
    margin-top: 200px;
    min-height: 300px;
    /* background: ${style["theme-aniyu"]}; */
    background: #fff;
    box-shadow: 0 10px 30px 0 rgba(0,0,0,.05);
    &:hover {
  
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .login-block {
    text-align: center;
    display: flex;
    height: 100%;
    min-height: 150px;
    align-items: center;
    justify-content: center;
  }
  .submit-btn {
    border-radius: 8px;
    background: ${style["theme-apricot"]};
  }
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }`


export default Login;
