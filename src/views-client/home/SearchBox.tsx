import React, {useState} from "react";
import {AutoComplete, Input} from "antd";
import styled from "styled-components";
import MapBtnImage from "@assets/img/map-bg.png";
import { CSSTransition } from 'react-transition-group'
import debounce from "lodash/debounce"
import HouseApi from "@apis/house";
import {handleResponse} from "@utils/handle-reponse";
import axios from 'axios'
const SEARCH_HISTORY_KEY = "SEARCH_HISTORY";



/**
 * 搜索栏
 * @constructor
 */
const SearchBox = (props) => {

    const {onSearchClick, value, onChange} = props;

    const [mapSearchBtnShow, setMapSearchBtnShow] = useState(false);
    const [searchBtnShow, setSearchBtnShow] = useState(false);

    const [options, setOptions] = useState([]);

    const [searchRef, setSearchRef] = useState();

    const [searchButtonLoading ,setSearchButtonLoading] = useState(false);

    // 取消回车请求标识
    let cancelTokenSource: any = null;

    // 输入框改变处理
    const handleSearchChange = debounce((value) => {
        if(value){
            getOption(value);
        }
        else{
            setOptions([]);
        }
    }, 300);

    // 获取自动补全
    const getOption = (value) => {
        handleResponse(HouseApi.getAutoComplete(value), (data) => {
            if(data){
                setOptions(data);
            }
        }, "获取自动补全失败");
    };

    // 点击搜索时， 如果value存在则往 搜索历史中添加一条数据
    const handleSearchClick = (e) => {
         e.stopPropagation();
         e.preventDefault();
        addSearchHistory(value);
        searchRef.blur();
        handleSearch(value);
    };

    // 获取搜索历史
    const getSearchHistory = () => {
        let searchHistory =  localStorage.getItem(SEARCH_HISTORY_KEY);
        let arr: Array<string> = [];
        if(searchHistory){
            try{
                const tmp = JSON.parse(searchHistory);
                if(tmp instanceof Array){
                    arr = tmp;
                }
            }catch (e) {
                console.error("搜索历史数据有误")
            }
        }
        return arr;
    };
    // 添加搜索历史
    const addSearchHistory = (value) => {
        if(value){
            let arr = getSearchHistory();
            const set = new Set(arr);
            set.add(value);
            arr = Array.from(set.values());
            const res = JSON.stringify(arr);
            localStorage.setItem(SEARCH_HISTORY_KEY, res);
        }
    };

    // 清空历史记录
    const handleClickHistory = () => {
         localStorage.removeItem(SEARCH_HISTORY_KEY);
         searchRef.blur();
         setOptions([]);
    };

    // 处理搜索
    const handleSearch = (value) => {
        if(cancelTokenSource){
            cancelTokenSource?.cancel("取消上一个查询");
            cancelTokenSource  = null;
        }
        if(onSearchClick){
            cancelTokenSource = axios.CancelToken.source();
            setSearchButtonLoading(true);
            onSearchClick(value, cancelTokenSource).then(() => setSearchButtonLoading(false));
        }
    };

    const searchHistory = getSearchHistory();

    // 历史记录搜索选项
    const historyOption = [
        {
            label: (
                    <div style={{
                        fontSize: "17px",
                        color: "rgba(0,0,0,.85)",
                        letterSpacing: 0,
                        display: "flex",
                        fontWeight: "bold",
                        justifyContent: "space-between"
                    }}>
                        <span>历史记录</span>
                        <span style={{ fontWeight: 400,
                            fontSize: "12px",
                            color: "rgba(0,0,0,.4)",
                            cursor: "pointer"}} onClick={handleClickHistory}>清空历史</span>
                    </div>
            ),
            options: searchHistory.map((item, index) => ({value: item, label: item}))
        }
    ];
    const searchOption = options.map(item => ({value: item}));

    // 自动补全选项转换
    const optionSwitcher = () => {
        if(options.length > 0 || searchHistory.length === 0){
            return searchOption;
        }
        return historyOption;
    };


    return (
        <Container>
            <AutoComplete
                dropdownMatchSelectWidth={252}
                onSearch={handleSearchChange}
                onChange={(value) => {
                    onChange && onChange(value);
                }}
                value={value}
                options={optionSwitcher()}
                onSelect={(value) => {
                    addSearchHistory(value);
                    searchRef.blur();
                    handleSearch(value);
                }}
                ref={setSearchRef}
            >
                <Input.Search  size="large" placeholder="请输入小区/商圈/地铁站等..." onPressEnter={e => {
                    addSearchHistory(value);
                    searchRef.blur();
                    handleSearch(value);
                }} enterButton={
                    <div  onMouseOver={() => setSearchBtnShow(true)} onMouseLeave={() => setSearchBtnShow(false)} onClick={handleSearchClick} style={{height: "48px", lineHeight: "48px"}}>
                        <CSSTransition in={searchBtnShow} classNames="slide"  timeout={300} >
                            <i className="hover-background"/>
                        </CSSTransition>
                        开始找房
                    </div>
                } loading={searchButtonLoading}/>
            </AutoComplete>

            <div className="map-btn" onMouseOver={() => setMapSearchBtnShow(true)} onMouseLeave={() => setMapSearchBtnShow(false)}>
                <i className="iconfont icon-location">
                    &#xe620;
                </i>
                <CSSTransition in={mapSearchBtnShow} classNames="slide"  timeout={300} >
                    <i className="hover-background"/>
                </CSSTransition>
                地图找房
            </div>
        </Container>
    )
};
const Container = styled.div`
    width: 798px;
    height: 50px;
    display: flex;
    position: relative;
    .ant-input {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        font-variant: tabular-nums;
        list-style: none;
        -webkit-font-feature-settings: 'tnum', "tnum";
        font-feature-settings: 'tnum', "tnum";
        position: relative;
        display: inline-block;
        width: 411px;
        min-width: 0;
        height: 50px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 20px;
        padding: 15px 11px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 8px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }
    .ant-btn-lg {
        height: 50px;
        padding: 0;
        font-size: 16px;
        border-radius: 8px;
        width: 132px;
        position: relative;
        overflow: hidden;
    }
    .map-btn{
        width: 132px;
        margin-left: 20px;
        background: #fff url(${MapBtnImage}) no-repeat 50% scroll;
        background-size: cover;
        color: #000;
        color: rgba(0,0,0,.4);
        border: 1px solid #000;
        border: 1px solid rgba(0,0,0,.12);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .hover-background{
        position: absolute;
        top: -100%;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.1);
    }
    .icon-location{
        color: rgba(0,0,0,.85);
        font-size: 18px;
        font-weight: 500;
        margin-right: 2px;
    }
    .slide-enter{
        top: 100%;
    }
    .slide-enter-active{
        top: 0;
        transition: top 0.3s ease-in;
    }
    .slide-enter-done{
        top: 0;
    }
    .slide-exit{
        top: 0;
    }
    .slide-exit-active{
        top: -100%;
        transition: top  0.3s ease-in;
    }
    .slide-exit-done{
        top: -100%;
    }
`;
export default SearchBox;
