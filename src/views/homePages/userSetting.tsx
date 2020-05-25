
import React, { useEffect } from 'react'
import { Button, Form, Input, message, Spin } from 'antd';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import userApi from '@apis/login'
import { changeUserInfo } from '@/store/redux/user.redux'

interface Data {
  introduction: string;
  nickName: string
}

export default () => {
  const user = useSelector(state => state.get('user'))
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const onFinish = (value) => {
    const data = {
      introduction: value.introduction,
      nickName: value.nickName
    }
    updateUserInfo(data)

  }
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const updateUserInfo = (data: Data) => {
    userApi.updateUserInfo(data).then((res) => {
      if (res) {
        dispatch(changeUserInfo(res))
        message.success('成功更新个人信息')
      }
    })
  }
  const onFinishFailed = () => {
    message.error('请检查表单是否填写完整')
  }

  useEffect(() => {
    form.setFieldsValue(user);
  }, [form, user]);

  return <>
    <UserInfo >
      <Form
        name="basic"
        form={form}
        {...layout}
        initialValues={user}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input value={user.nickName} />
        </Form.Item>

        <Form.Item
          label="电话"
          name="phoneNumber"
          rules={[{ required: true }]}
        >
          <Input defaultValue={user.phoneNumber} disabled />
        </Form.Item>
        {/* <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true }]}
        >
          <Input defaultValue={user.email} disabled />
        </Form.Item> */}
        <Form.Item
          label="介绍"
          name="introduction"
        >
          <Input defaultValue={user.introduction} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            更新
        </Button>
        </Form.Item>
      </Form>
    </UserInfo>
  </>
}

const UserInfo = styled.div`
    width: 60%;
    margin: auto;
`