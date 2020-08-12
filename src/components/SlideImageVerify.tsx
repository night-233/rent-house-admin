import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Spin} from "antd"
import OpenApi from "@apis/open";
import {handleResponse} from "@utils/handle-reponse";
import {
    ArrowRightOutlined,
    CheckOutlined,
    CloseOutlined,
    LoadingOutlined,
    LockFilled,
    ReloadOutlined
} from "@ant-design/icons/lib";
import {RequestStatus} from "@base/RequestStatus";

/**
 * 滑动图形验证
 * Created by Administrator on 2020/8/10
 */
let mouseUpListener: any = null;

const SlideImageVerify = ({phone, onSuccess, visible, defaultActive = false}) => {

    const [image, setImage] = useState({
        y: 0,
        backImage: "",
        slideImage: ""
    });

    const [loading, setLoading] = useState(false);

    const [checkLoading, setCheckLoading] = useState(false);

    const [moveFlag, setMoveFlag] = useState(false);

    const [mouseDownX, setMouseDownX] = useState(0);

    const [slideRef] = useState<any>([]);

    const [success, setSuccess] = useState(false);

    const [error, setError] = useState(false);

    const [left, setLeft] = useState(0);

     const [active, setActive] = useState(false);

     useEffect(() => {
         if(!visible){
           setActive(false);
           setSuccess(false);
         }
     }, [visible]);

    const containerRef = useRef<any>();

    useEffect(() => {
        setActive(defaultActive);
        if(defaultActive === false){
            const handleMouseDown = (e) => {
                if(!containerRef.current.contains(e.target)){
                    setActive(false);
                }
            };
            window.addEventListener("mousedown", handleMouseDown);
            return () => {
                window.removeEventListener("mousedown", handleMouseDown);
            }
        }else{
            getVerifyCode(setImage);
        }
    }, []);


    const handleSlideMove = (e) => {
        if(moveFlag){
            const left = e.clientX - mouseDownX;
            if(left > 0 && left < 260){
                setLeft(left);
            }
        }
    };

    const handleMoseDown = (e) => {
        setMoveFlag(true);
        setMouseDownX(e.clientX);
        mouseUpListener = handleMouseUp;
        window.addEventListener("mouseup", mouseUpListener);
    };

    const handleMouseUp = () => {
        if(mouseUpListener){
            window.removeEventListener("mouseup", mouseUpListener);
        }
        const left = slideRef[0].style.left.replace("px", "");
        setMouseDownX(0);
        setMoveFlag(false);
        checkCode(phone, left);
    };

    const getVerifyCode = (callBack) => {
         handleResponse(OpenApi.getVerifyImage(phone), callBack, "获取图形验证码失败", setLoading);
    };

    const checkCode = (phone, x) => {
        handleResponse(OpenApi.checkVerifyImage(phone, x), (res: any) => {
            if(res.code === RequestStatus.SUCCESS){
                setSuccess(true);
                setLeft(0);
                onSuccess(res.data.verifyCode)
            }else{
                getVerifyCode(setImage);
                setLeft(0);
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 300);
            }
        }, "校验失败", setCheckLoading);
    };

    // 激活按钮点击
    const handleActiveButtonClick = () => {
        getVerifyCode((res) => {
            setActive(true);
            setImage(res)
        });
    };

    return (
        <Container  onMouseMove={handleSlideMove} ref={containerRef} visible={visible}>
            {/* 未验证成功, 但是已激活*/}
            {
                !success && active &&
                <div className="slide-verify-container">
                        <div className="image-container">
                            <Spin spinning={loading}>
                                <img alt="" src={"data:image/png;base64," + image.backImage} className="back-image"/>
                                <img alt="" src={"data:image/png;base64," + image.slideImage} className={"slide-image " + (error && "img-error")}
                                     style={{top: image.y, left: left - 5}}
                                     onMouseDown={handleMoseDown}
                                     onMouseUp={handleMouseUp}
                                     draggable="false"
                                />
                                <ReloadOutlined className="reload-btn" onClick={() => getVerifyCode(setImage)}/>
                            </Spin>
                        </div>
                    <div className={"slide-container"}>
                        <div className={"drag-area " + (error && "area-error")} style={{width: left}}/>
                        <div className={"slide-button " + (error && "btn-error")} onMouseDown={handleMoseDown} style={{left: left}} ref={ref => slideRef[0] = ref}>
                            {
                                error ? <CloseOutlined/> : <ArrowRightOutlined/>
                            }
                        </div>
                        {
                            (!moveFlag && !checkLoading)  && <span style={{userSelect: "none"}}>{loading ? "加载中..." : "向右拖动滑块填充拼图"}</span>
                        }
                    </div>
                </div>
            }
            {/* 未验证成功,并且未激活 */}
            {
                 !success && !active &&
                <div className={"slide-container not-active " + (loading && "not-active-loading")} onClick={handleActiveButtonClick}>
                    <span>
                        <span className="lock-icon">
                            {
                                loading ? <LoadingOutlined/> : <LockFilled/>
                            }
                        </span>
                        {
                            loading ? "正在加载验证" : "点击完成验证"
                        }
                    </span>
                </div>
            }
            {/* 验证成功 */}
            {
                success &&
                <div className={"slide-container verify-success"}>
                    <span><CheckOutlined style={{fontWeight: "bold", marginRight: 5}}/>验证成功</span>
                </div>
            }
        </Container>
    )
};
const Container = styled.div`
   position: relative;
   user-select: none;
   width: 320px;
   display: ${({visible}: {visible: boolean}) => visible ? "block" : "none"};
   .image-container{
      position: absolute;
      top: -165px;
      width: 300px;
      height: 150px;
      z-index: 99;
      .slide-image{
          position: absolute;
          left: -5px;
          cursor: pointer;
          margin-bottom: 15px;
      }
   }
   .reload-btn{
        width: 30px;
        height: 30px;
        font-size: 20px;
        cursor: pointer;
        text-align: center;
        line-height: 30px;
        color: #B0AAAA;
        font-weight: 500;
        &:hover{
            color: #FFF;
        }
        position: absolute;
        right: 0;
        top: 0;
   }
   .slide-container{
        color: #49454c;
        border: 1px solid #e4e7eb;
        border-radius: 2px;
        background-color: #f7f9fa;
        position: relative;
        width: 300px;
        height: 40px;
        line-height: 40px;
        box-sizing: content-box;
        text-align: center;
        .slide-button{
            position: absolute;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            background: #fff;
            box-shadow: 0 0 3px rgba(0,0,0,.3);
            color: #000;
            &:hover{
              background: #51c6cf;
              color: #fff;
            }
        }
        .drag-area{
            position: absolute;
            left: 0;
            height: 40px;
            width: 0px;
            background: rgba(81,198,207, 0.2);
            border-radius: 2px;
            border: 1px solid #51c6cf;
        }
   }
    .area-error{
            color: #fff;
            background: rgb(255,84,71, 0.2) !important;
            border: 1px solid rgb(255,84,71) !important;
            transition: width 0.3s;
    }
    .btn-error{
        color: #fff !important;
        background: #F06767 !important;
        transition: left 0.3s;
    }
    .img-error{
        transition: left 0.3s;
    }
   .verify-success{
       color: #52ccba !important;
       border-color: #52ccba !important;
       background-color: #d2f4ef !important;
   }
   .not-active{
       cursor: pointer;
       transition: all .2s linear;
       &:hover{
            color: #51c6cf;
       }
       &:hover .lock-icon{
           background-color: #51c6cf;
           color: #fff;
       }
       .lock-icon{
           box-shadow: 0 2px 8px 1px rgba(188,196,204,.5);
           background: #fff;
           transition: all .2s linear;
           display: inline-block;
           margin-right: 5px;
           width: 28px;
           height: 28px;
           color: #858A8F;
           border-radius: 50%;
           text-align: center;
           line-height: 28px;         
       }
   }
   .not-active-loading{
      color: #51c6cf;
     .lock-icon{
           background-color: #51c6cf;
           color: #fff;
     }
   }
`;

export default SlideImageVerify;
