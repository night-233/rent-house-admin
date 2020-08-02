import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Swiper from "swiper"
import "swiper/css/swiper.css"
import {Popover, Spin} from 'antd';
import {HeartOutlined, LeftOutlined, RightOutlined, ShareAltOutlined} from "@ant-design/icons"
import {changeLoginModalType, changeLoginModalVisible, setLoginModalCallback} from "@store/redux/common.redux";
import { useDispatch, useSelector } from 'react-redux'
import {ModalModeType} from "@components/LoginRegiestModal";
import {HeartFilled} from "@ant-design/icons/lib";
import {decreaseHouseStarNumber, increaseHouseStarNumber, setHouseStar} from "@store/redux/house.redux";
import UserApi from "@apis/user";
import QRCode from "qrcode.react";
import {useHistory} from "react-router";

const HouseImagePreview = () => {


    const cover = useSelector(state => state.house.house.cover);

    const pictureList = useSelector(state => state.house.house.housePictureList || []).filter(item => (item.cdnPrefix + item.path) !== cover);

    const user = useSelector(state => state.user);

    const houseId = useSelector(state => state.house.house.id);

    const star = useSelector(state => state.house.star);

    const [activeNav, setActiveNav] = useState(0);

    const [previewArrowVisible, setPreviewArrowVisible] = useState(false);

    const [previewSwiper, setPreviewSwiper] = useState<any>(null);




    useEffect(() => {
        // 缩略图
        var thumbnail = new Swiper('.thumbnail .swiper-container', {
            // visibilityFullFit: true,
            observer: true,
            slidesPerView: "auto",
            allowTouchMove: false,
            on:{
                tap: function() {
                    preview.slideTo(thumbnail.clickedIndex)
                }
            }
        });
        // 预览图片
        var preview = new Swiper('.preview .swiper-container', {
            on:{
                slideChangeTransitionStart: function() {
                   const index = preview.activeIndex;
                    setActiveNav(index);
                    thumbnail.slideTo(index - 2)
                }
            },
            observer: true,
            effect : 'cube',
            cubeEffect: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 100,
                shadowScale: 0.6
            }
        });
        setPreviewSwiper(preview);
    }, []);

    const handleLeftArrowClick = () => {
        if(previewSwiper){
            if (previewSwiper.activeIndex === 0) {
                previewSwiper.slideTo(previewSwiper.slides.length - 1, 1500);
                return
            }
            previewSwiper.slidePrev();
        }
    };

    const handleRightArrowClick = () => {
        if(previewSwiper){
            if (previewSwiper.activeIndex === previewSwiper.slides.length - 1) {
                previewSwiper.slideTo(0, 1000);
                return
            }
            previewSwiper.slideNext();
        }
    };

    const handleThumbClick = (index) => {
        if(previewSwiper.activeIndex !== index){
            previewSwiper.slideTo(index, 1000);
        }
    };

    const dispatch = useDispatch();
    const setLoginRegisterModalVisible = (visible) => dispatch(changeLoginModalVisible(visible));
    const setLoginRegisterModalType = (type) => dispatch(changeLoginModalType(type));

    const handleStarClick = () => {
        if(user.authed){
            houseStarSwitch(star);
        }else{
            setLoginRegisterModalVisible(true);
            setLoginRegisterModalType(ModalModeType.CODE_LOGIN);
        }
    };

    const houseStarSwitch = (isStar) => {
        if(isStar){
            cancelHouseStar(houseId);
        }else{
            starHouse(houseId);
        }
    };

    const starHouse = (houseId) => {
        UserApi.starHouse(houseId).then((res: any) => {
            if(res){
                dispatch(setHouseStar(true));
                dispatch(increaseHouseStarNumber());
            }
        })
    };

    const cancelHouseStar = (houseId) => {
        UserApi.cancelStarHouse(houseId).then((res: any) => {
            if(res){
                dispatch(setHouseStar(false));
                dispatch(decreaseHouseStarNumber());
            }
        })
    };

    const url = window.location.href;

    return <Container>
            <div className="preview" onMouseEnter={() => setPreviewArrowVisible(true)} onMouseLeave={() => setPreviewArrowVisible(false)}>
                <div className="function-box">
                    <div className="btn"  onClick={handleStarClick}>
                        {
                            star ?
                                <><HeartFilled style={{color: "#51c6cf", marginRight: 5}}/>已收藏</>
                                :
                                <><HeartOutlined style={{marginRight: 5}}/>收藏</>
                        }
                    </div>
                    <Popover content={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <div style={{width: "100px", height: "100px"}}>
                            <QRCode value={url} style={{width: "100px", height: "100px"}}/>
                        </div>
                        <div>微信扫码分享</div>
                    </div>} title={null} trigger="hover" placement="bottom" overlayClassName="overlay-class">
                        <div className="btn"><ShareAltOutlined style={{marginRight: 5}}/>分享</div>
                    </Popover>
                </div>
                <div className="swiper-container">
                    {
                        previewArrowVisible && pictureList.length > 0 &&
                        <>
                            <ArrowContainer style={{left: 0, top: "50%", marginTop: "-45px"}} onClick={handleLeftArrowClick}><LeftOutlined /></ArrowContainer>
                            <ArrowContainer style={{right: 0, top: "50%", marginTop: "-45px"}} onClick={handleRightArrowClick}><RightOutlined /> </ArrowContainer>
                        </>
                    }
                    <div className="swiper-wrapper">
                        <div className="swiper-slide"><img src={cover} alt="" /></div>
                        {
                            pictureList.map(item => <div className="swiper-slide" key={item.id}><img src={item.cdnPrefix + item.path} alt="" /></div>)
                        }
                    </div>
                </div>
            </div>
        <div className="thumbnail">
                {
                    pictureList.length > 0  &&
                    <>
                        <ArrowContainer style={{left: 0}} onClick={handleLeftArrowClick}><LeftOutlined /></ArrowContainer>
                        <ArrowContainer style={{right: 0}} onClick={handleRightArrowClick}><RightOutlined /> </ArrowContainer>
                    </>
                }
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className={"swiper-slide " + (activeNav === 0 ? "active-nav" : "")}><img src={cover} alt="" /></div>
                        {
                            pictureList.map((item, index) =>  <div key={item.id} className={"swiper-slide " + (activeNav === index + 1? "active-nav" : "")}
                                                                   onClick={() => handleThumbClick(index + 1)}><img src={item.cdnPrefix + item.path} alt="" />
                            </div>)
                        }
                    </div>
                </div>
            </div>
    </Container>
};

const Container = styled.div`
    .preview {
        position: relative;
        .function-box{
            position: absolute;
            right: 0;
            top: 20px;
            z-index: 10;
            .btn{
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                border: 0;
                border-radius: 2px;
                color: #000;
                color: rgba(0,0,0,.6);
                float: right;
                font-size: 15px;
                height: 36px;
                line-height: 36px;
                margin-right: 20px;
                position: relative;
                width: 82px;
            }
        }
         .swiper-container {
             height: 573px;
             border-radius: 2px;
        }
        .swiper-slide img{
            width: 100%;
            height: 100%;
        }
    }
    .thumbnail {
         width: 100%;
         margin-top: 10px;
         position: relative;
         .swiper-container {
             width: 100%;
             height: 90px;
        }
        .swiper-slide {
             width: 120px;
             height: 90px;
             cursor:pointer;
             margin-right: 10px;
            &:after{
                background: rgba(0,0,0,.5);
                 content: "";
                 height: 100%;
                 left: 0;
                 position: absolute;
                 top: 0;
                 width: 100%;
                 border-radius: 2px;
             }
             img {
                 padding: 1px;
                 width: 100%;
                 height: 100%;
                 border-radius: 2px;
            }
        }
        .slide-last{
            margin-right: 0;
        }
         .active-nav: after {
            background: transparent;
        }
    }
`;
const ArrowContainer = styled.div`
    background-color: rgba(0,0,0,.5);
    border-radius: 2px;
    color: #fff;
    font-size: 16px;
    height: 90px;
    width: 30px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    cursor: pointer;
    user-select: none;
`;

export default HouseImagePreview;
