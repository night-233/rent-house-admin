import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Spin, Row, Col } from 'antd';
import { } from '@/store/redux/user.redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { loginIn } from '@/store/redux/user.redux'
import openApi from '@apis/open'
interface Func {
  (value: string): void
}
interface Props {
  goToRegister: Func,
  limits: any
}

const RegisterBlock = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  let time = 60, timer: any
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const [codetext, setCodeText] = useState<any>('获取验证码')


  const onFinish = values => {
    const data = {
      phoneNumber: values.phone,
      verifyCode: values.verifyCode
    }
    setLoading(true)
    openApi.loginInNoPwd(data).then((res) => {
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
      operationType: 'login',
      phoneNumber: form.getFieldsValue().phone
    }
    openApi.sendMessage(data).then((res) => {
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

  useEffect(() => {
    return (): void => {
      clearInterval(timer)
    }
  }, [timer])

  return (<Style>
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
          <div className='footer-btn'>
            <Button className="plain-btn" onClick={() => props.goToRegister('register')}>
              注册
              </Button>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
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
    justify-content: flex-end;
    margin: auto;
    width: 100%;
  }
  .code-text {
    min-width: 120px;
  }

`