import React, {useEffect, useState} from "react";
import AdminApi from "@apis/admin";
import {handleResponse} from "@utils/handle-reponse";
import HouseForm from "../../../components/HouseForm";
import {message, Spin} from 'antd';
import moment from "moment";
import {useHistory} from "react-router";
/**
 * 编辑房源
 * @constructor
 */
const HouseEdit = (props) => {

    const houseId = props.match.params.houseId;

    const [isFormLoading, setIsFormLoading] = useState(false);

    const [formValues, setFormValues] = useState<any>(undefined);

    const [buttonLoading, setButtonLoading] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if(houseId){
            getHouseInfoById(houseId);
        }
    }, [houseId]);


    const getHouseInfoById = (houseId) => {
        handleResponse(AdminApi.getHouse(houseId), (data) => {
            const imageList = data.house.housePictureList.map(item => {
               return {
                   ...item,
                   uid: item.id,
                   url: item.cdnPrefix + item.path
               }
            });
            const cover = imageList.find(item => item.url === data.house.cover)?.uid;

            const form = {
                title: data.house.title,
                city: data.city.enName,
                region: data.region.enName,
                street: data.house.street,
                district: data.house.district,
                address: data.house.houseDetail.address,
                direction: data.house.direction,
                room: data.house.room,
                parlour: data.house.parlour,
                bathroom: data.house.bathroom,
                floor: data.house.floor,
                area: data.house.area,
                price: data.house.price,
                buildYear: moment(data.house.buildYear, "YYYY"),
                rentWay: data.house.houseDetail.rentWay,
                totalFloor: data.house.totalFloor,
                subway: data.subway.id,
                subwayStation: data.subwayStation.id,
                distanceToSubway: data.house.distanceToSubway,
                tags: data.house.tags,
                layoutDesc: data.house.houseDetail.layoutDesc,
                traffic: data.house.houseDetail.traffic,
                roundService: data.house.houseDetail.roundService,
                description: data.house.houseDetail.description,
                picture: {
                    imageList: imageList,
                    cover: cover
                }
            }
            setFormValues(form)
        }, "获取房屋信息失败", setIsFormLoading);
    }

    const onSubmit = (houseForm, callBack) => {
        setButtonLoading(true);
        AdminApi.updateHouse({
            ...houseForm,
            id: houseId
        }).then(data => {
            if(data){
                message.success("更新成功");
                history.push("/houseList");
            }else{
                setButtonLoading(false);
            }
        });
    }

    return (
        <Spin spinning={isFormLoading}>
            <HouseForm initValue={formValues} onSubmit={onSubmit} buttonName="修改" buttonLoading={buttonLoading}/>
        </Spin>
    )
}

export default HouseEdit;
