import React, {useEffect, useState} from "react";
import 'swiper/css/swiper.css';
import styled from "styled-components";
import HouseImagePreview from "./HouseImagePreview";
import Header from "../layout/Header";
import HouseIntroduction from "./HouseIntroduction";
import RentInfo from "./RentInfo";
import RoomMateInfo from "./RoomMateInfo";
import HouseNavigation from "./HouseNavigation";
import RightHouseDetailInfo from "./RightHouseDetailInfo";
import RightHouseAdminSideFix from "./RightHouseAdminSideFix";
import DistrictIntroduction from "./DistrictIntrodction";
import RoundService from "./RoundService";
import UserRights from "./UserRights";
import RecommendHouse from "./RecommendHouse";
import {Sticky, StickyContainer} from 'react-sticky';
import {useDispatch} from "react-redux";
import {Spin, Skeleton} from "antd";
import {getHouseById} from "../../store/redux/house.redux";
import {useSelector} from "react-redux"
import FullScreenLoading from "../../components/FullScreenLoading"
const HouseDetail = (props) => {


    const loading = useSelector(state => state.house.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        const houseId = props.match.params.houseId;
        dispatch(getHouseById(houseId));
    }, []);

    return (
        <FullScreenLoading loading={loading}>
            <Header fixed={false} showCity={false}/>
            <Container>
                    <HouseBodyContainer>
                        <LeftInfoContainer>
                            <HouseImagePreview/>
                            {/*导航栏*/}
                            <HouseNavigation/>
                            {/*房屋简介*/}
                            <HouseIntroduction/>
                            {/*租约信息*/}
                            <RentInfo/>
                            {/*室友信息*/}
                            <RoomMateInfo/>
                            {/*小区简介*/}
                            <DistrictIntroduction/>
                        </LeftInfoContainer>
                        <RightInfoContainer>
                            <RightHouseDetailInfo/>
                            <StickyContainer style={{flex: 1}}>
                                <Sticky  disableCompensation={true} topOffset={-80}>
                                    {({
                                          style,
                                          isSticky,
                                          wasSticky,
                                          distanceFromTop,
                                          distanceFromBottom,
                                          calculatedHeight
                                      }) => (
                                        <div style={{...style}}>
                                            <RightHouseAdminSideFix isSticky={isSticky}/>
                                        </div>
                                    )}
                                </Sticky>
                            </StickyContainer>
                        </RightInfoContainer>
                    </HouseBodyContainer>
                {/*周边配套*/}
                <RoundService/>
                {/*用户权益*/}
                <UserRights/>
                {/*推荐房源*/}
                <RecommendHouse/>
            </Container>
        </FullScreenLoading>
    )
};


const Container = styled.div`
    margin: 0 auto;
    margin-top: 20px;
    width: 1152px;
    box-sizing: border-box;
    position: relative;
   .title{
        display: flex;
        font-weight: 700;
        font-size: 24px;
        position: relative;
        color: rgba(0,0,0,.85);
        line-height: 32px;
        margin: 16px 0;
   }
`;
const HouseBodyContainer = styled.div`
    display: flex;
    box-sizing: border-box;
`;

const LeftInfoContainer = styled.div`
     width: 764px;
    .nav-container{
        margin-top: 60px;
    }
`;

const RightInfoContainer = styled.div`
    margin-left: 30px;
    width: 358px;
    display: flex;
    flex-direction: column;
    .price{
        color: #ff961e;
        margin-top: 10px;
        font-size: 28px;
        display: flex;
        align-items: center;
        .icon{
            font-size: 32px;
            letter-spacing: -3px;
        }
        .number{
            margin-left: -2px;
            font-size: 35px;
        }
    }
`;

export default HouseDetail;
