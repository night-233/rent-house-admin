
import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import userApi from '@apis/login'
import { changeUserInfo, getUserInfo } from '@/store/redux/user.redux'
import UploadImg from '@/application/upload'
interface Data {
  introduction: string;
  nickName: string
}

const UserSetting = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };
  const onFinish = (value) => {
    const data = {
      introduction: value.introduction,
      nickName: value.nickName
    }
    updateUserInfo(data)
  }
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
  const handleUpdateInfo = () => {
    dispatch(getUserInfo())
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
        <Form.Item label="头像">
          <UploadImg name={user.nickName} url={user.avatar} callback={handleUpdateInfo} />
        </Form.Item>
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
          <TextArea defaultValue={user.introduction} />
        </Form.Item>
        <Form.Item className="footer">
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
   .footer {
     text-align: right;
     display: flex;
     align-items: flex-end;
     justify-content: flex-end;
   }
`
export default React.memo(UserSetting)