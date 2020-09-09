import React, {useEffect} from "react";
import styled from "styled-components";
import WeChatCodePng from "@assets/img/wechat-code.png";
import WeChatCodeCielPng from "@assets/img/wechat-code-ciel.png";
import Swiper from "swiper"
import "swiper/css/swiper.css"
import LogoPng from "@assets/img/logo.png";
const Footer = () => {

    useEffect(() => {
        new Swiper ('.friend-link .swiper-container', {
            // 轮播图的方向，也可以是vertical方向
            direction:'vertical',
            loop: true,
            // 自动播放时间
            autoplay:true,
            // 播放的速度
            speed:2000,
            // 这样，即使我们滑动之后， 定时器也不会被清除
            autoplayDisableOnInteraction : false,
        });
    }, []);

    return (
        <Container>
            <div className="area">
                <div className="top-item">
                    <div className="left-list">
                        <div className="item">
                            <div className="title">关于我们</div>
                            <a rel="noopener noreferrer"  target="_blank" href="https://github.com/harry-xqb/rent-house">开源不易</a>
                            <a rel="noopener noreferrer"  target="_blank" href="https://github.com/harry-xqb/rent-house">给个小星星</a>
                            <a rel="noopener noreferrer"  target="_blank" href="https://github.com/harry-xqb/rent-house">万分感谢</a>
                        </div>
                        <div className="item">
                            <div className="title">Github</div>
                            <a rel="noopener noreferrer"  target="_blank" href="https://github.com/harry-xqb/rent-house">后端源码(给个小星星吧)</a>
                            <a rel="noopener noreferrer"  target="_blank" href="https://github.com/night-233/rent-house-admin">前端源码(感谢支持)</a>
                        </div>
                        <div className="item">
                            <div className="title">关注我们</div>
                            <a rel="noopener noreferrer"  target="_blank" href="https://github.com/harry-xqb/rent-house">右边扫码加微信</a>
                            <a rel="noopener noreferrer"  target="_blank" href="https://github.com/harry-xqb/rent-house">左边github加关注</a>
                        </div>
                    </div>
                    <div className="right-code">
                        <div className="img">
                            <img src="http://qiniu.touchfish.top/wechat-code-ciel.png" onError={(e:any) => {e.target.src=WeChatCodeCielPng; e.target.onerror = null;}} />
                            <p>前端单身小姐姐</p>
                        </div>
                        <div className="img">
                            <img src="http://qiniu.touchfish.top/wechat-code.png" onError={(e:any) => {e.target.src=WeChatCodePng; e.target.onerror = null;}} />
                            <p>后端单身抠脚大汉</p>
                        </div>

                    </div>
                </div>
                <div className="friend-link">
                    <span style={{marginRight: 10}}>友情链接:</span>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <a rel="noopener noreferrer"  target="_blank" href="https://github.com/harry-xqb/rent-house">后端</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://www.java.com/zh_CN/">Java大法好</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://spring.io/">Spring全家桶官网</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://www.elastic.co/cn/">ElasticSearch官网</a>
                                <a rel="noopener noreferrer"  target="_blank" href="http://kafka.apache.org/">Kafka官网</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://redis.io/">Redis官网</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://www.mysql.com/">Mysql官网</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://www.docker.com/">Docker官网</a>
                            </div>
                            <div className="swiper-slide">
                                <a rel="noopener noreferrer"  target="_blank" href="https://github.com/night-233/rent-house-admin">前端</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://react.docschina.org/">React官网</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://redux.js.org/">Redux官网</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://reactrouter.com/web/guides/quick-start">React Router文档</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://ant.design/index-cn">Antd官网</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://www.swiper.com.cn/">Swiper中文网</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://styled-components.com/">Styled Component官网</a>
                            </div>
                            <div className="swiper-slide">
                                <a rel="noopener noreferrer"  target="_blank" href="http://hz.ziroom.com/?utm_source=pinzhuan&utm_medium=baidu&utm_term=&utm_content=biaoti">参考网站</a>
                                <a rel="noopener noreferrer"  target="_blank" href="http://hz.ziroom.com/?utm_source=pinzhuan&utm_medium=baidu&utm_term=&utm_content=biaoti">自如官网</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://hz.58.com/?utm_source=market&spm=u-2d2yxv86y3v43nkddh1.BDPCPZ_BT">58同城</a>
                                <a rel="noopener noreferrer"  target="_blank" href="https://hz.fang.com/">房天下</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>本站信息数据非真实数据,界面风格主要借鉴自如网.如有涉及侵权,请加右上方微信联系我</p>
                    <p>京ICP备19043967号-2</p>
                </div>
            </div>
        </Container>
    )
};

const Container = styled.div`
    padding: 20px 0px;
    line-height: 20px;
    border-top: solid 1px #ccc;
    font-size: 14px;
    p{
        color: #000;
        font-size: 12px;
    }
    .area{
        width: 1000px;
        margin: 0px auto;
        .top-item{
            display: flex;
           .left-list{
                width: 700px;
                display: flex;
                .item{
                    flex: 1;
                    .title{
                        font-weight: bold;
                        line-height: 35px;
                    }
                    a{
                        display: block;
                        font-size: 12px;
                        line-height: 24px;
                        transition: all .2s ease-in;
                        color: #000;
                        &:hover{
                            margin-left: 10px;
                            color: #51c6cf;
                            cursor: pointer;
                        }
                    }
                }
           }
           .right-code{
                display: flex;
                width: 300px;
                flex-direction: row-reverse;
                .img{
                    img{
                        width: 100px;
                        height: 100px;
                    }
                    text-align: center;
                    margin-left: 20px;
                }
                p{
                    font-size: 12px;
                    color: #000;
                }
           }
        }
        .friend-link{
            border-top: solid 1px #eee;
            border-bottom: solid 1px #eee;
            line-height: 47px;
            height: 47px;
            overflow: hidden;
            margin: 13px auto;
            display: flex;
            color: #000;
            font-size: 12px;
             .swiper-container{
                 margin-left: 0;
                 margin-right: 0;
                 .swiper-slide{
                    a{
                        color: #000;
                        margin: 0 5px;
                        cursor: pointer;
                        &:hover{
                            color: #51c6cf;
                        }
                    }
                 }
            }
        }
        .footer-bottom{
            padding-left: 200px;
            background: url(${LogoPng}) no-repeat left center;
            background-size: 150px 35px;
            height: 38px;
        }
    }
`;

export default Footer;
