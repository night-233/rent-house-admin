import React, {useEffect, useState} from "react";
import styled from "styled-components";
import B1JPG from "@assets/tmp/b1.jpg";
import B2JPG from "@assets/tmp/b2.jpg";
import B3JPG from "@assets/tmp/b3.jpg";
import B4JPG from "@assets/tmp/b4.jpg";
import B5JPG from "@assets/tmp/b5.jpg";
import B6JPG from "@assets/tmp/b6.jpg";
import Swiper from "swiper"
import "swiper/css/swiper.css"
import { Button, Popover } from 'antd';
import {LeftOutlined, RightOutlined, ShareAltOutlined, HeartOutlined} from "@ant-design/icons"
const HouseImagePreview = () => {


    const [activeNav, setActiveNav] = useState(0);

    const [previewArrowVisible, setPreviewArrowVisible] = useState(false);

    const [previewSwiper, setPreviewSwiper] = useState<any>(null);

    useEffect(() => {
        // 缩略图
        var thumbnail = new Swiper('.thumbnail .swiper-container', {
            // visibilityFullFit: true,
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

    return <Container>
        <div className="preview" onMouseEnter={() => setPreviewArrowVisible(true)} onMouseLeave={() => setPreviewArrowVisible(false)}>
            <div className="function-box">
                <div className="btn" ><HeartOutlined style={{marginRight: 5}}/>收藏</div>
                <Popover content={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <div style={{width: "100px", height: "100px"}}>
                        <img src="//www.ziroom.com/qrcode.php?makeUrl=http://m.ziroom.com/HZ/room/61177299.html" alt="" style={{width: "100px", height: "100px"}}/>
                    </div>
                    <div>微信扫码分享</div>
                </div>} title={null} trigger="hover" placement="bottom" overlayClassName="overlay-class">
                    <div className="btn"><ShareAltOutlined style={{marginRight: 5}}/>分享</div>
                </Popover>
            </div>
            <div className="swiper-container">
                {
                    previewArrowVisible &&
                        <>
                            <ArrowContainer style={{left: 0, top: "50%", marginTop: "-45px"}} onClick={handleLeftArrowClick}><LeftOutlined /></ArrowContainer>
                            <ArrowContainer style={{right: 0, top: "50%", marginTop: "-45px"}} onClick={handleRightArrowClick}><RightOutlined /> </ArrowContainer>
                        </>
                }
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><img src={B1JPG} alt="" /></div>
                    <div className="swiper-slide"><img src={B2JPG} alt="" /></div>
                    <div className="swiper-slide"><img src={B3JPG} alt="" /></div>
                    <div className="swiper-slide"><img src={B4JPG} alt="" /></div>
                    <div className="swiper-slide"><img src={B5JPG} alt="" /></div>
                    <div className="swiper-slide"><img src={B6JPG} alt="" /></div>
                    <div className="swiper-slide"><img src={B6JPG} alt="" /></div>
                    <div className="swiper-slide"><img src={B6JPG} alt="" /></div>
                    <div className="swiper-slide"><img src={B6JPG} alt="" /></div>
                </div>
            </div>
        </div>
        <div className="thumbnail">
            <ArrowContainer style={{left: 0}} onClick={handleLeftArrowClick}><LeftOutlined /></ArrowContainer>
            <ArrowContainer style={{right: 0}} onClick={handleRightArrowClick}><RightOutlined /> </ArrowContainer>
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className={"swiper-slide " + (activeNav === 0 ? "active-nav" : "")}><img src={B1JPG} alt="" /></div>
                    <div className={"swiper-slide " + (activeNav === 1 ? "active-nav" : "")}><img src={B2JPG} alt="" /></div>
                    <div className={"swiper-slide " + (activeNav === 2 ? "active-nav" : "")}><img src={B3JPG} alt="" /></div>
                    <div className={"swiper-slide " + (activeNav === 3 ? "active-nav" : "")}><img src={B4JPG} alt="" /></div>
                    <div className={"swiper-slide " + (activeNav === 4 ? "active-nav" : "")}><img src={B5JPG} alt="" /></div>
                    <div className={"swiper-slide " + (activeNav === 5 ? "active-nav" : "")}><img src={B6JPG} alt="" /></div>
                    <div className={"swiper-slide " + (activeNav === 6 ? "active-nav" : "")}><img src={B6JPG} alt="" /></div>
                    <div className={"swiper-slide " + (activeNav === 7 ? "active-nav" : "")}><img src={B6JPG} alt="" /></div>
                    <div className={"swiper-slide slide-last " + (activeNav === 8 ? "active-nav" : "")}><img src={B6JPG} alt="" /></div>
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
