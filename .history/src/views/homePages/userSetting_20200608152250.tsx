
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import openApi from '@apis/open'
import userApi from '@apis/user'
import style from '@/assets/global-style'
import { changeUserInfo, getUserInfo } from '@/store/redux/user.redux'
import UploadAvatar from '@/components/uploadAvatar'
interface Data {
  introduction: string;
  nickName: string
}

const UserSetting = () => {
  const user = useSelector(state => state.user.userInfo)
  const limits = useSelector(state => state.common.limits)
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [isNickNameRight, setJudge] = useState('')
  const { TextArea } = Input;
  let nickNameTemp = user.nickName
  let commandTemp = user.introduction
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const onFinish = async (value) => {
    const data = {
      introduction: value.introduction,
      nickName: value.nickName
    }
    let res = await handleJudgeName()
    console.log('d', res)
    if (res) {
      updateUserInfo(data)
    }
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
  const handleJudgeName = () => {
    setJudge('')
    if (nickNameTemp === form.getFieldsValue().nickName) return
    const param = { nickName: form.getFieldsValue().nickName }
    return openApi.judgeNickName(param).then((res) => {
      if (res.code === 200) {
        nickNameTemp = form.getFieldsValue().nickName
        setJudge('right')
        return true
      } else {
        setJudge('wrong')
        return false
      }
    })
  }
  const handleUpdateInfo = async () => {

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
          <UploadAvatar name={user.nickName} url={user.avatar} callback={handleUpdateInfo} limits={limits} />
        </Form.Item>
        <Form.Item
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input value={user.nickName}
            onFocus={() => { setJudge('') }}
            suffix={
              isNickNameRight === 'wrong' && <i className={`iconfont iconwrong`}></i> ||
              isNickNameRight === 'right' && <i className={`iconfont iconCorrect`}></i> ||
              isNickNameRight === '' && <i ></i>
            }
            onBlur={handleJudgeName} />
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
   .iconwrong, .iconCorrect {
     font-size: 13px;
   }
   .iconCorrect {
     color: ${style['theme-color']}
   }
   .iconwrong {
     color: ${style['danger-color']}
   }
`
export default React.memo(UserSetting)