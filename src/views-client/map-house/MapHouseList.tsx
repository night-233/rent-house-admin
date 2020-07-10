import React from "react";
import styled from "styled-components";
import HouseSortComponent from "@components/HouseSortComponent";
import {Link} from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import SortOrderFilter from "@views-client/home/SortOrderFilter";
/**
 *  地图房屋列表
 */
const MapHouseList = ({orderBy, sortDirection, onSortChange}) => {


    return (
        <Container>
            <div className="sort">
                <HouseSortComponent  sortType={orderBy} sortDirection={sortDirection} onSortChange={onSortChange}/>
            </div>
            <Scrollbars  className="house-list" renderThumbVertical={(props) => <div {...props}  style={{...props.style, backgroundColor: "rgba(0, 0, 0, 0.1)"}}/>}>
                <Link to="/client/house/10" target="_black"  >
                    <div className="house-item">
                        <div className="img">
                            <img src="http://img.ziroom.com/pic/static/images/slist_1207/defaultPZZ/misu-loading.jpg_C_640_480_Q100.jpg" alt="房屋图片"/>
                        </div>
                        <div className="content">
                            <h3>合租·协安蓝郡4居室-南卧</h3>
                            <div className="desc">
                                <span className="floor">18㎡ | 5/17层</span>
                                <span className="price"><span className="number">¥1860</span>/月</span>
                            </div>
                            <div className="position">
                                <i className="iconfont" style={{fontSize: "12px", fontWeight: "bold"}}>&#xe620;</i> 小区距金家渡站步行约237米
                            </div>
                            <div className="tags">
                                <span>独立卫生间</span>
                                <span>独立阳台</span>
                                <span>空调</span>
                                <span>精装修</span>
                                <span>洗衣机</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to="/client/house/10" target="_black"  >
                    <div className="house-item">
                        <div className="img">
                            <img src="http://img.ziroom.com/pic/static/images/slist_1207/defaultPZZ/misu-loading.jpg_C_640_480_Q100.jpg" alt="房屋图片"/>
                        </div>
                        <div className="content">
                            <h3>合租·协安蓝郡4居室-南卧</h3>
                            <div className="desc">
                                <span className="floor">18㎡ | 5/17层</span>
                                <span className="price"><span className="number">¥1860</span>/月</span>
                            </div>
                            <div className="position">
                                <i className="iconfont" style={{fontSize: "12px", fontWeight: "bold"}}>&#xe620;</i> 小区距金家渡站步行约237米
                            </div>
                            <div className="tags">
                                <span>独立卫生间</span>
                                <span>独立阳台</span>
                                <span>空调</span>
                                <span>精装修</span>
                                <span>洗衣机</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to="/client/house/10" target="_black"  >
                    <div className="house-item">
                        <div className="img">
                            <img src="http://img.ziroom.com/pic/static/images/slist_1207/defaultPZZ/misu-loading.jpg_C_640_480_Q100.jpg" alt="房屋图片"/>
                        </div>
                        <div className="content">
                            <h3>合租·协安蓝郡4居室-南卧</h3>
                            <div className="desc">
                                <span className="floor">18㎡ | 5/17层</span>
                                <span className="price"><span className="number">¥1860</span>/月</span>
                            </div>
                            <div className="position">
                                <i className="iconfont" style={{fontSize: "12px", fontWeight: "bold"}}>&#xe620;</i> 小区距金家渡站步行约237米
                            </div>
                            <div className="tags">
                                <span>独立卫生间</span>
                                <span>独立阳台</span>
                                <span>空调</span>
                                <span>精装修</span>
                                <span>洗衣机</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to="/client/house/10" target="_black"  >
                    <div className="house-item">
                        <div className="img">
                            <img src="http://img.ziroom.com/pic/static/images/slist_1207/defaultPZZ/misu-loading.jpg_C_640_480_Q100.jpg" alt="房屋图片"/>
                        </div>
                        <div className="content">
                            <h3>合租·协安蓝郡4居室-南卧</h3>
                            <div className="desc">
                                <span className="floor">18㎡ | 5/17层</span>
                                <span className="price"><span className="number">¥1860</span>/月</span>
                            </div>
                            <div className="position">
                                <i className="iconfont" style={{fontSize: "12px", fontWeight: "bold"}}>&#xe620;</i> 小区距金家渡站步行约237米
                            </div>
                            <div className="tags">
                                <span>独立卫生间</span>
                                <span>独立阳台</span>
                                <span>空调</span>
                                <span>精装修</span>
                                <span>洗衣机</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to="/client/house/10" target="_black"  >
                    <div className="house-item">
                        <div className="img">
                            <img src="http://img.ziroom.com/pic/static/images/slist_1207/defaultPZZ/misu-loading.jpg_C_640_480_Q100.jpg" alt="房屋图片"/>
                        </div>
                        <div className="content">
                            <h3>合租·协安蓝郡4居室-南卧</h3>
                            <div className="desc">
                                <span className="floor">18㎡ | 5/17层</span>
                                <span className="price"><span className="number">¥1860</span>/月</span>
                            </div>
                            <div className="position">
                                <i className="iconfont" style={{fontSize: "12px", fontWeight: "bold"}}>&#xe620;</i> 小区距金家渡站步行约237米
                            </div>
                            <div className="tags">
                                <span>独立卫生间</span>
                                <span>独立阳台</span>
                                <span>空调</span>
                                <span>精装修</span>
                                <span>洗衣机</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to="/client/house/10" target="_black"  >
                    <div className="house-item">
                        <div className="img">
                            <img src="http://img.ziroom.com/pic/static/images/slist_1207/defaultPZZ/misu-loading.jpg_C_640_480_Q100.jpg" alt="房屋图片"/>
                        </div>
                        <div className="content">
                            <h3>合租·协安蓝郡4居室-南卧</h3>
                            <div className="desc">
                                <span className="floor">18㎡ | 5/17层</span>
                                <span className="price"><span className="number">¥1860</span>/月</span>
                            </div>
                            <div className="position">
                                <i className="iconfont" style={{fontSize: "12px", fontWeight: "bold"}}>&#xe620;</i> 小区距金家渡站步行约237米
                            </div>
                            <div className="tags">
                                <span>独立卫生间</span>
                                <span>独立阳台</span>
                                <span>空调</span>
                                <span>精装修</span>
                                <span>洗衣机</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                                <span>热水器</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </Scrollbars>
        </Container>
    )
};

const Container = styled.div`
   width: 480px;
   height: 100%;
   display: flex;
   flex-direction: column;
   .sort{
        width: 300px;
        border: solid 1px #eee;
        border-radius: 4px;
        margin: 20px auto 14px;
   }
   .house-list{
        flex: 1;
        .house-item{
            height: 180px;
            margin: 0 24px;
            padding: 24px 0;
            border-bottom: solid 1px #eee;
            display: flex;
            justify-content: space-between;
            .img{
                 width: 176px;
                 height: 132px;
                 img{
                    width: 100%;
                    height: 100%;
                 }
            }
            .content{
                width: 238px;
                position: relative;
                height: 132px;
                h3{
                    line-height: 20px;
                    position: relative;
                    top: -3px;
                    height: 46px;
                    color: #444;
                    font-weight: 500;
                }
                .desc{
                    font-size: 14px;
                    color: #999;
                    position: relative;
                    height: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .floor{
                        font-size: 15px;
                    }
                    .price{
                        font-size: 12px;
                        color: #444;
                        .number{
                            font-size: 17px;
                            font-weight: bold;
                            color: #ffa000;
                        }
                    }
                }
                .position{
                    margin-top: 10px;
                    font-size: 14px;
                    color: #999;
                    line-height: 1.2;
                }
                .tags{
                    position: absolute;
                    left: 0;
                    bottom: -4px;
                    width: 100%;
                    font-size: 12px;
                    height: 20px;
                    overflow: hidden;
                    span{
                        display: inline-block;
                        border: solid 1px #666;
                        border-radius: 2px;
                        padding: 2px 6px;
                        font-size: 12px;
                        color: #666;
                        line-height: 14px;
                        margin-right: 2px;
                    }
                }
            }
        }
   }
   
`;

export default MapHouseList;
