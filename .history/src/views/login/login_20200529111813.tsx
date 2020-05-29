import React, { useState } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { login } from '@/store/redux/user.redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

interface Func {
  (value: string): void
}
interface Props {
  goToRegister: Func,
  limits: Object
}
const LoginBlock = (props: Props) => {
  console.log(props.limits)
  const { limits } = props
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const onFinish = values => {
    const data = JSON.parse(JSON.stringify(values))
    setLoading(true)
    dispatch(login(data)).then(() => {
      setLoading(false)
      history.push('/')
    })
  };
  const checkTel = (rule, value, callback) => {
    try {
      // const telErg = limits.
      if (!limits.phoneRegex.test(value)) {
        throw new Error('两次密码输入不一致');
      } else {
        callback()
      }
    } catch (err) {
      callback(err);
    }
  }
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
            rules={[{ required: true, message: '请输入电话号码' }, { validator: checkTel }]}
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
export default React.memo(LoginBlock);