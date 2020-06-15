import React, {useState} from 'react'
import HouseForm from "@/components/HouseForm";
import AdminApi from "@apis/admin";
import {message} from "antd";
import {useHistory} from "react-router";


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
  }

  return (
      <HouseForm onSubmit={onSubmit} buttonName="提交审核" buttonLoading={buttonLoading}/>
  )
}
export default AddHouse;
