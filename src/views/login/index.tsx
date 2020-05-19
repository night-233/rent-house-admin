
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { login } from '@/store/redux/user.redux'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import style from '@assets/global-style'
import { useHistory } from 'react-router-dom';

function Login () {
  const dispatch = useDispatch()
  const test = useSelector(state => state.get('user'))
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
    dispatch(login(data)).then(() => {
      message.success('登录成功正跳转到主页', 2, onclose = () => {
        history.push('/')
      })
    })
  };
  const onFinishFailed = errorInfo => {
    message.error('请完成校验再登录')
  };
  useEffect(() => {
    console.log('redux', test)
  })
  return (
    <LoginWrap>
      <section className="login-box">
        <div className="root-wrap">
          <div className="title">登录房东管理系统</div>
          <section className="login-block">
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
            </Form>
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
  .login-box {
    padding-top: 20px;
   .title {
     padding-top: 48px;
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
    height: 300px;
    /* background: ${style["theme-aniyu"]}; */
    background: #fff;
    box-shadow: 0 10px 30px 0 rgba(0,0,0,.05);
    &:hover {
  
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .login-block {
     display: flex;
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
