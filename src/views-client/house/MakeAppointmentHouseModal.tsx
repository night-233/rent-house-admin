import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Avatar, Button, Form, Input, message, Modal, notification} from "antd";
import {useSelector, useDispatch} from "react-redux"
import {MessageFilled, PhoneFilled} from "@ant-design/icons/lib";
import UserApi from "@apis/user";
import {setHouseReserve} from "@store/redux/house.redux";
/**
 * 预约看房模态框
 * Created by Administrator on 2020/7/28
 */
const MakeAppointmentHouseModal = ({visible = true, onCancel, houseId, onSuccess}) => {

    const agent = useSelector(state => state.house.agent);

    const userInfo = useSelector(state => state.user.userInfo);

    const [loading ,setLoading] = useState(false);


    const [form] = Form.useForm();

    const dispatch = useDispatch();

    useEffect(() => {
        if(userInfo && form && visible){
            form.setFieldsValue({phone: userInfo.phoneNumber})
        }
    }, [userInfo, visible]);


    const handleFormFinish = (values) => {
        const phone = values.phone;
        const description = values.description;
        reserveHouse({
            phone,
            description,
            houseId
        })
    };

    const reserveHouse = (data) => {
      UserApi.reserveHouse(data).then(res => {
          if(res){
              message.success("预约成功");
              dispatch(setHouseReserve(true));
              onSuccess();
          }
      });
    };

    return (
        <Modal
            centered={true}
            visible={visible}
            title={null}
            footer={null}
            width={486}
            onCancel={onCancel}
            bodyStyle={{padding: "60px 40px"}}
        >
            <Container>
                <h3>咨询约看</h3>
                <div className="agent">
                    <div className="img">
                        <Avatar  size={60} src={agent.avatar}>房东</Avatar>
                    </div>
                    <div className="info">
                        <p className="name">{agent.nickName}</p>
                        <p className="tip">提交约看后我会尽快联系您确认时间和地点</p>
                    </div>
                </div>
                <Form form={form} onFinish={handleFormFinish}>
                    <Form.Item label={null}
                               name="phone"
                               rules={[{required: true, message: '请输入手机号' }, {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '手机号格式错误'}]}
                               style={{marginTop: 10}}
                    >
                        <Input prefix={<PhoneFilled style={{color: "#ccc", marginRight: 5}}/>} size="large" style={{height: 50, borderRadius: 0}} placeholder="请输入您的手机号"/>
                    </Form.Item>
                    <Form.Item     label={null}
                                   name="description"
                                   style={{marginBottom: 30}}
                    >
                        <Input prefix={<MessageFilled style={{color: "#ccc",  marginRight: 5}}/>} size="large" placeholder="请输入约看描述" style={{height: 50, borderRadius: 0}}/>
                    </Form.Item>
                    <Button block size="large" type="primary" style={{height: 50, borderRadius: 2}} htmlType="submit" loading={loading}>
                        {
                            loading ? "提交中" : "提交约看"
                        }
                    </Button>
                </Form>
            </Container>
        </Modal>
    )
};
const Container = styled.div`
    h3{
        font-size: 30px;
        color: rgba(0,0,0,.85);
        font-weight: 600;
    }
    .agent{
        display:flex;
        margin-top: 10px;
        .img{
            width: 60px;
            border-radius: 72px;
            height: 60px;
            overflow: hidden;
            margin-right: 12px;
        }
        .name{
            color: rgba(0,0,0,.85);
            font-size: 18px;
        }
        .tip{
            font-size: 15px;
            margin-bottom: 10px;
            margin-top: 8px;
        }
        
    }
`;

export default MakeAppointmentHouseModal;
