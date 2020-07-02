import React, {useState} from "react";
import styled from "styled-components";
import {Anchor, Popover} from "antd";
import {HeartOutlined, ShareAltOutlined} from "@ant-design/icons/lib";
const { Link } = Anchor;

/**
 * 房屋信息导航栏
 */
const HouseNavigation = () => {

    const [stickNav, setStickNav] = useState(false);

    const [refArray, setRefArray] = useState<any>([]);

    const [navLineProps, setNavLineProp] = useState({
        width: 0,
        x: 0
    });


    const handleAnchorChange = (link) => {
      if(link){
          const index = link.split("_")[1];
          const width = refArray[index].offsetWidth;
          let left = 10;
          for(let i = 0; i < index; i++){
              left += refArray[i].offsetWidth;
          }
          setNavLineProp({
              width: width,
              x: left
          });
          console.log("width:" + width + "; left:" + left);
          setStickNav(true);
      }else{
          setStickNav(false);
      }
    };

    return (
        <Container>
            <div className={`page-nav  ${stickNav && " stick"}`}>
                <Anchor style={{display: "flex"}} showInkInFixed={false} targetOffset={50} onChange={handleAnchorChange}>
                    <div ref={ref => refArray[0] = ref} className="anchor-item-container">
                        <Link href="#components-anchor-house-introduction_0" title="房源简介"/>
                    </div>
                    <div ref={ref => refArray[1] = ref} className="anchor-item-container">
                        <Link href="#components-anchor-rent-info_1" title="租约信息"/>
                    </div>
                    <div ref={ref => refArray[2] = ref} className="anchor-item-container">
                        <Link href="#components-anchor-roommate-info_2" title="室友信息"/>
                    </div>
                    <div ref={ref => refArray[3] = ref} className="anchor-item-container">
                        <Link href="#components-anchor-district-info_3" title="小区简介"/>
                    </div>
                    <div ref={ref => refArray[4] = ref} className="anchor-item-container">
                        <Link href="#components-anchor-round-service_4" title="周边配套"/>
                    </div>
                </Anchor>
                {
                    stickNav &&
                        <div className="scroll-line" style={{width: navLineProps.width, left: navLineProps.x}}/>
                }
                {
                    stickNav &&
                    <div className="nav-start-share">
                        <Popover content={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <div style={{width: "100px", height: "100px"}}>
                                <img src="//www.ziroom.com/qrcode.php?makeUrl=http://m.ziroom.com/HZ/room/61177299.html" alt="" style={{width: "100px", height: "100px"}}/>
                            </div>
                            <div>微信扫码分享</div>
                        </div>} title={null} trigger="hover" placement="bottom" >
                            <div className="item"><ShareAltOutlined style={{marginRight: 5}}/>分享</div>
                        </Popover>
                        <div className="item" ><HeartOutlined style={{marginRight: 5}}/>收藏</div>
                    </div>
                }
            </div>
            {
                stickNav &&
                <div className="page-nav" style={{zIndex: -1}}/>
            }
        </Container>
    )
};

const Container = styled.div`
    .page-nav{
        background-color: #fff;
        height: 49px;
        margin-top: 20px;
        margin-bottom: 10px;
        position: relative;
        z-index: 140;
        .anchor-item-container{
            cursor: pointer;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .ant-anchor {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            color: rgba(0, 0, 0, 0.65);
            font-size: 14px;
            font-variant: tabular-nums;
            line-height: 1.5715;
            list-style: none;
            -webkit-font-feature-settings: 'tnum', "tnum";
            font-feature-settings: 'tnum', "tnum";
            position: relative;
            padding-left: 2px;
            display: flex;
            height: 48px;
            align-items: center;
        }
        .ant-anchor-link-title {
            color: rgba(0,0,0,.4);
            font-size: 15px;
            position: relative;
            display: block;
            margin-bottom: 6px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-transition: all 0.3s;
            transition: all 0.3s;
        }
        .ant-anchor-link-active > .ant-anchor-link-title {
            color: #51c6cf;
        }
        .ant-anchor-ink {
            display: none;
        }
        .scroll-line{
            transition: width .3s,left .3s,right .3s;
            top: 0;
            position: absolute;
            width: 100px;
            height: 2px;
            background: #51c6cf;
        }
        .nav-start-share{
            position: absolute;
            right: 50px;
            top: 0;
            display: flex;
            height: 100%;
            align-items: center;
            font-size: 15px;
            .item{
                cursor: pointer;
                margin-right: 50px;
            }
        }
    }
    .stick{
        border-bottom: .5px solid rgba(0,0,0,.2);
        width: 1152px;
        margin: 0;
        position: fixed;
        top: 0;
        width: 1152px;
    }
`;

export default HouseNavigation;
