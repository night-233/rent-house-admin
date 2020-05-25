import React, { useState } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { login } from '@/store/redux/user.redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import style from '@assets/global-style'
import { useHistory } from 'react-router-dom';

interface Func {
  (value: string): void
}
interface Props {
  goToRegister: Func
}
const LoginBlock = (props: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const history = useHistory();
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
  return (<Style>

    <div className="title">登录房东管理系统</div>
    <section className="login-block">
      {!loading ? (
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="电话"
            name="phone"
            rules={[{ required: true, message: '请输入电话号码' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <div className='footer-btn'>
              <Button className="plain-btn" onClick={() => props.goToRegister('register')}>
                注册
              </Button>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </div>
          </Form.Item>
        </Form>) : <Spin />}
    </section>
  </Style>)
}
export default LoginBlock;

const Style = styled.div`
.register-form-button {

}
 .footer-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    width: 100%;
  }

`