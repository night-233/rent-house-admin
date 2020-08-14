import React, {useEffect, useState} from "react";
import styled from "styled-components";
import AdminApi from "@apis/admin";
import {message, notification} from "antd";
import HousePublishForm, {HousePublishFormType} from "@views-client/user/common/HousePublishForm";
import Loading from "@components/Loading";
import moment from "moment";
import {useHistory} from "react-router";
import {RequestStatus} from "@base/RequestStatus";
import {useDispatch, useSelector} from 'react-redux'
import StorageUtil from "@utils/storage";
import {changeCity} from "@store/redux/common.redux";
import {USER_CITY_KEY} from "@components/SupportCityDropMenu";
/**
 * 房屋编辑
 * Created by Administrator on 2020/8/7
 */
const HouseEdit = (props) => {

    const houseId = props.match.params.houseId;

    const [houseForm, setHouseForm] = useState();

    const history = useHistory();

    const city = useSelector(state => state.common.city);

    const dispatch = useDispatch();

    useEffect(() => {
        if(houseId){
            getEditHouseInfo(houseId);
        }
    }, [houseId]);

    const getEditHouseInfo = (houseId) => {
        AdminApi.getEditHouse(houseId).then(res => {
            if(res.code === RequestStatus.SUCCESS){
                const data = res.data;
                const imageList = data.house.housePictureList.map(item => {
                    return {
                        ...item,
                        uid: item.id,
                        url: item.cdnPrefix + item.path
                    }
                });
                const cover = imageList.find(item => item.url === data.house.cover)?.uid;
                const form = {
                    id: houseId,
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
                };
                if(city.enName !== data.city.enName){
                    StorageUtil.set(USER_CITY_KEY, data.city.enName);
                    dispatch(changeCity({...data.city}));
                }
                setHouseForm(form);
            }else{
                message.error(res.message);
                history.push("/user/house-publish");
            }
        })
    };



    return (
        <Container>
            {
                houseForm ? <HousePublishForm initData={houseForm} type={HousePublishFormType.EDIT}/> : <Loading/>
            }
        </Container>
    )
};
const Container = styled.div`

`;
export default HouseEdit;
