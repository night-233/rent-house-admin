import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Avatar, Button, Col, Divider, Input, message, Row, Tag, Upload} from "antd";
import {useSelector, useDispatch} from 'react-redux'
import {TagOutlined, UploadOutlined} from "@ant-design/icons/lib";
import AdminApi from "@apis/admin";
import Tools from "@utils/tools";
import {beforeUpload} from "@components/PictureUploader";
import UserApi from "@apis/user";
import {Link} from "react-router-dom";
import {handleResponse} from "@utils/handle-reponse";
import {changeUserInfo} from "@store/redux/user.redux";



/**
 * 个人信息
 * Created by Administrator on 2020/8/8
 */
const PersonInfo = () => {

    const user = useSelector(state => state.user.userInfo);

    const limits = useSelector(state => state.common.limits);

    const [fileList, setFileList] = useState<any>([]);

    const [uploadLoading, setUploadLoading] = useState(false);

    const [stateUser, setStateUser] = useState({
        avatar: "",
        nickName: "",
        introduction: "",
    });

    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        setStateUser({
            avatar: user.avatar,
            nickName: user.nickName,
            introduction: user.introduction,
        })
    }, [user]);

    const handleFileChange = (info) => {
        if (info.file.status === 'uploading') {
           setUploadLoading(true);
        }else{
            setUploadLoading(false);
            if (info.file.status === 'done') {
                setStateUser({...stateUser, avatar: info.file.response?.cdnPrefix + info.file.response?.hash});
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name}文件上传失败.`);
            }
        }
        setFileList([info.file]);
    };

    // 处理上传图片
    const handleUpload = ({ file, onError, onSuccess }) => {
        return UserApi.uploadPhoto(file).then(async (res) => {
            if (res) {
                onSuccess(res, file);
            } else {
                onError('上传失败')
            }
        })
    };

    const dispatch = useDispatch();

    const handleSave = () => {
        if(!stateUser.nickName){
            message.error("昵称不能为空！");
            return;
        }
        handleResponse(UserApi.updateUserInfo(stateUser), (res) => {
            message.success("保存成功");
            dispatch(changeUserInfo({
                ...user,
                avatar: stateUser.avatar,
                nickName: stateUser.nickName,
                introduction: stateUser.introduction,
            }));
        }, "修改信息失败", setFormLoading)
    };

    return (
        <Container>
            <Row className="row">
                <Col span={2} className="col-left">
                    头像
                </Col>
                <Col className="col-right">
                    <Avatar size={140} style={{fontSize: 25}} src={stateUser.avatar}>
                        {user.nickName}
                    </Avatar>
                    <Upload showUploadList={false} fileList={fileList} onChange={handleFileChange} customRequest={handleUpload} beforeUpload={(file => beforeUpload(file, {
                        types: limits.avatarTypeLimit,
                        size: limits.avatarSizeLimit
                    }))}>
                        <div className="upload-area">
                            <Button type="primary" style={{height: 40, width: 120, borderRadius: 0}} loading={uploadLoading}>
                                <UploadOutlined />{uploadLoading ? "上传中" : "本地照片"}
                            </Button>
                            <p>仅支持{limits.avatarTypeLimit.map(item => item + "，")}格式，文件小于{Tools.unitConversion(limits.avatarSizeLimit)}。</p>
                        </div>
                    </Upload>
                </Col>
            </Row>
            <Divider style={{borderTop: "1px solid #eee", marginTop: 0}}/>
            <Row className="row" style={{marginBottom: 20}}>
                <Col span={2} className="col-left">
                    手机号
                </Col>
                <Col className="col-right">
                    <span style={{color: "#ccc"}}>{user.phoneNumber}</span>
                </Col>
            </Row>
            <Row className="row">
                <Col span={2} className="col-left">
                    昵称
                </Col>
                <Col className="col-right">
                    <Input value={stateUser.nickName} style={inputStyle} onChange={e => setStateUser({...stateUser, nickName: e.target.value})}/>
                </Col>
            </Row>
            <Row className="row">
                <Col span={2} className="col-left">
                    密码
                </Col>
                <Col className="col-right">
                    <Link to="/user/account/reset-password" style={{color: "#51c6cf"}}>修改密码</Link>
                </Col>
            </Row>
            <Row className="row">
                <Col span={2} className="col-left">
                    兴趣爱好
                </Col>
                <Col className="col-right">
                    <Input defaultValue={user.introduction}
                           style={{...inputStyle, width: 470}}
                           prefix={<TagOutlined/>}
                           placeholder="点此输入兴趣爱好"
                           onChange={e => setStateUser({...stateUser, introduction: e.target.value})}
                    />
                </Col>
            </Row>
            <Row className="row">
                <Col span={2} className="col-left">
                </Col>
                <Col className="col-right">
                    <Button type="primary" style={{height: 40, width: 88, borderRadius: 5}} onClick={handleSave} loading={formLoading}>
                        {formLoading ? "提交中" : " 保存"}
                    </Button>
                </Col>
            </Row>
        </Container>
    )
};
const inputStyle = {
    height: 40,
    width: 300,
    color: "#999",
    borderRadius: 5
};
const Container = styled.div`
    .row{
        margin-bottom: 20px;
        min-height: 40px;
    }
    .col-left{
        text-align: left;
        display: flex;
        align-items: center;
        color: #000;
    }
    .col-right{
        display: flex;
        align-items: center;
        .ant-input-affix-wrapper > input.ant-input {
            color: #999;
        }
    }
    .upload-area{
        margin-left: 20px;
        p{
            color: #ccc;
            margin-top: 10px
        }
    }
`;

export default PersonInfo;
