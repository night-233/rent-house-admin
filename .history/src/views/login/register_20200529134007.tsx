import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Spin, Row, Col } from 'antd';
import { } from '@/store/redux/user.redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { loginIn } from '@/store/redux/user.redux'
import LoginApi from '@apis/login'
interface Func {
  (value: string): void
}
interface Props {
  goToLogin: Func,
  limits: any
}
const RegisterBlock = (props: Props) => {
  const dispatch = useDispatch()
  const { limits } = props
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const history = useHistory();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  let time = 60;
  let timer: any, codetext: any, setCodeText: any;
  [codetext, setCodeText] = useState('获取验证码')
  const onFinish = values => {
    const data = {
      password: values.password,
      phoneNumber: values.phone,
      verifyCode: values.verifyCode
    }
    setLoading(true)
    LoginApi.registerPhone(data).then((res) => {
      setLoading(false)
      if (res) {
        dispatch(loginIn(res, res.token))
        history.push('/')
      }
    })
  };
  const getCapcha = async () => {
    await form.validateFields(['phone'])
    const data = {
      operationType: 'signUp',
      phoneNumber: form.getFieldsValue().phone
    }
    LoginApi.sendMessage(data).then((res) => {
      if (res) {
        message.success('验证码发送成功，请注意查收')
      }
    })
    timer = setInterval(() => {
      time--;
      setCodeText(time);
      if (time === 0 && timer) {
        clearInterval(timer)
        setCodeText('获取验证码')
        timer = 60
      }
    }, 1000)
  }
  const onFinishFailed = errorInfo => {
    message.error('请完成校验再登录')
  };
  const checkPassword = (rule, value, callback) => {
    try {
      if (value !== form.getFieldsValue().password) {
        throw new Error('两次密码输入不一致');
      } else {
        callback()
      }
    } catch (err) {
      callback(err);
    }
  }
  const checkPwd = (rule, value, callback) => {
    try {
      if (!new RegExp(limits?.userPasswordRegex).test(value)) {
        throw new Error('请检查输入密码是否符合规范');
      } else {
        callback()
      }
    } catch (err) {
      callback();
    }
  }
  useEffect(() => {
    return (): void => {
      clearInterval(timer)
    }
  }, [timer])
  return (<Style>
    <div className="title">注册房东管理系统</div>
    <section className="login-block">
      {!loading ? (
        <Form
          name="basic"
          form={form}
          {...layout}
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
          <Form.Item label="验证码">
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="verifyCode"
                  noStyle
                  rules={[{ required: true, message: '请先获取验证码' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button className="code-text" disabled={codetext !== '获取验证码'} onClick={getCapcha}>{codetext}</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }, { validator: checkPwd }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="ensurePwd"
            rules={[{ required: true, message: '确认密码不能为空' }, { validator: checkPassword }]}
          >
            <Input.Password />
          </Form.Item>
          <div className='footer-btn'>
            <Button className="plain-btn" onClick={() => props.goToLogin('login')}>
              返回登录
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button">
              注册
              </Button>
          </div>

        </Form>) : <Spin />}
    </section>
  </Style>)
}
export default React.memo(RegisterBlock);

const Style = styled.div`
 .ant-form-item-explain {
   text-align: left;
   font-size: 13px;
 }
 .footer-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    width: 100%;
  }
  .code-text {
    min-width: 120px;
  }

`