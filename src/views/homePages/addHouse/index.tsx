import React, {useState} from 'react'
import HouseForm from "@/components/HouseForm";
import AdminApi from "@apis/admin";
import {message, Modal} from "antd";
import {useHistory} from "react-router";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

const AddHouse = () => {

  const history = useHistory();

  const [buttonLoading, setButtonLoading] = useState(false);

  const onSubmit = (houseForm) => {
    setButtonLoading(true);
    AdminApi.updateHouse(houseForm).then(data => {
      if(data){
        message.success("新增成功");
        history.push("/houseList");
      }else{
        setButtonLoading(false);
      }
    });
  };
  // 处理表单取消
  const handleCancel = (dirty) => {
    if(dirty){
      confirm({
        title: '警告',
        icon: <ExclamationCircleOutlined />,
        content: '你的内容不会被保存，是否继续？',
        onOk() {
          history.push("/houseList");
        },
        onCancel() {},
      });
    }else{
      history.push("/houseList");
    }
  };

  return (
      <HouseForm onSubmit={onSubmit} buttonName="提交审核" buttonLoading={buttonLoading} onCancel={handleCancel}/>
  )
}
export default AddHouse;
