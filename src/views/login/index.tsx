
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
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinish = values => {
    const data = JSON.parse(JSON.stringify(values))
    dispatch(login(data)).then(() => {
      history.push('/')
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
      <div className="root-wrap">
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
      </div>
    </LoginWrap>
  );
}

const LoginWrap = styled.div`
  background: ${style["theme-color"]};
  height: calc(100vh);
  padding-top: 15%;
  .root-wrap {
    border-radius: 4px;
    background:#fff;
    width: 350px;
    height: 400px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
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
