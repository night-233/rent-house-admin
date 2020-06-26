import React, {Children, ReactChild, useState} from "react";
import styled from "styled-components";
import {AutoComplete, Button, Col, Input, InputNumber, message, Row, Skeleton, Tag} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons/lib";
import {houseTagsArray} from "../../components/HouseForm";
import { CSSTransition, SwitchTransition} from 'react-transition-group'
import {Gutter} from "antd/lib/grid/row";
import NumericInput from "../../components/NumericInput";
import AddressApi from "@apis/address";
import { useSelector } from 'react-redux'
import {handleResponse} from "@utils/handle-reponse";
import { Checkbox } from 'antd';
const { CheckableTag } = Tag;
interface OptionSpanRadio{
    value: any,
    index?: number,
    key?: any,
    onClick?: any,
    children: any,
    checked?: boolean
}
interface OptionSpanRadioGroupProp {
    children?: any,
    value?: any,
    defaultValue?: any,
    onChange?: Function,
    mode?: RadioModeEnum // 单选: "single" 多选: "multi
}
enum RadioModeEnum {SINGLE, MULTI};

const RowGutter: [Gutter, Gutter] = [0, 15];
/**
 * 搜索过滤
 * @constructor
 */
const SearchFilter = (props) => {

    const [moreOptionVisible, setMoreOptionVisible] = useState(false);

    const [searchType, setSearchType] = useState();
    // 控制展开动画结束以后才移出弹出的找房方式
    const [showSearchType, setShowSearchType] = useState();

    const {searchParams, onChange} = props;

    // 区域
    const [region, setRegion] = useState({
        total: 0,
        list: []
    });

    const [subway, setSubway] = useState({
        total: 0,
        list: []
    });

    const [subwayStation ,setSubwayStation] = useState({
        total: 0,
        list: []
    });
    const [subwayStationLoading, setSubwayStationLoading] = useState(false);

    const [searchTypeLoading, setSearchTypeLoading] = useState(false);

    const city = useSelector(state => state.common.city);

    const getRegionByCity = () => {
        handleRequestByCity((cityEnName) => handleResponse(AddressApi.getSupportRegions(cityEnName), setRegion, "获取区域失败", setSearchTypeLoading));
    };

    const getSubWayByCity = () => {
        handleRequestByCity((cityEnName) => handleResponse(AddressApi.getSupportSubways(cityEnName), setSubway, "获取区域失败", setSearchTypeLoading));
    };

    const handleRequestByCity = (request) => {
        if(city){
            request(city?.enName);
        }else {
            message.warn("请先选择城市")
        }
    };

    const handleSearchTypeChange = (value) => {
        setSearchType(value);
        if(value){
            setShowSearchType(value);
        }
        switch (value) {
            case 1: getRegionByCity(); break;
            case 2: getSubWayByCity(); break;
        }
    };

    // 处理地铁线路改变
    const handleSubwayChange = (subwayLineId) => {
        onChange({regionEnName: null, subwayLineId: subwayLineId, subwayStationIdList: null});
        if(subwayLineId){
            getSubwayStationBySubway(subwayLineId);
        }
    };
    // 通过地铁线路获取地铁站
    const getSubwayStationBySubway = (subwayLineId) => {
        handleResponse(AddressApi.getSupportSubwayStations(subwayLineId), setSubwayStation, "获取地铁站失败", setSubwayStationLoading);
    }

    return (
        <Container>
            <Row gutter={RowGutter} style={{lineHeight: "32px"}}>
                <Col span={2} className="title">
                    找房方式
                </Col>
                <Col span={22} className="option" style={{borderBottom: "none"}}>
                    <OptionSpanRadioGroup value={searchType} onChange={handleSearchTypeChange}>
                        <OptionSpanRadio  value={1}>区域{searchType === 1 ? <UpOutlined style={ArrowIconStyle}/> : <DownOutlined style={ArrowIconStyle}/>}</OptionSpanRadio>
                        <OptionSpanRadio  value={2}>地铁{searchType === 2 ? <UpOutlined style={ArrowIconStyle}/> : <DownOutlined style={ArrowIconStyle}/>}</OptionSpanRadio>
                        <OptionSpanRadio  value={3}>距离{searchType === 3 ? <UpOutlined style={ArrowIconStyle}/> : <DownOutlined style={ArrowIconStyle}/>}</OptionSpanRadio>
                    </OptionSpanRadioGroup>
                </Col>
                <CSSTransition  in={!!searchType} classNames={"type-search-dropdown"}  timeout={300}
                    onExited={() => setShowSearchType(null)}
                >
                    <Col span={24} style={{padding: 0}} className="type-search">
                      {
                          showSearchType &&
                            <SwitchTransition mode="out-in" >
                                <CSSTransition
                                    key={showSearchType}
                                    addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                                    classNames="fade"
                                >
                                    <Row gutter={RowGutter} >
                                        {
                                            showSearchType === 1 &&
                                            <>
                                                <Col span={2}>区域</Col>
                                                <Col span={22} className="option">
                                                    <Skeleton active={true} loading={searchTypeLoading} paragraph={{rows: 1}} title={false}>
                                                        <OptionSpanRadioGroup value={searchParams.regionEnName} onChange={(value) => onChange({regionEnName: value, subwayLineId: null, subwayStationIdList: null})}>
                                                            {
                                                                region.list.map((item:any) => <OptionSpanRadio key={item.id} value={item.enName}>{item.cnName}</OptionSpanRadio>)
                                                            }
                                                        </OptionSpanRadioGroup>
                                                     </Skeleton>
                                                </Col>
                                            </>
                                        }
                                        {
                                            showSearchType === 2 &&
                                            <>
                                                <Col span={2}>地铁</Col>
                                                <Col span={22} className="option-subway">
                                                    <Skeleton active={true} loading={searchTypeLoading} paragraph={{rows: 1}} title={false}>
                                                        <OptionSpanRadioGroup value={searchParams.subwayLineId} onChange={handleSubwayChange}>
                                                            {
                                                                subway.list.map((item:any) => <OptionSpanRadio key={item.id} value={item.id}>{item.name}</OptionSpanRadio>)
                                                            }
                                                        </OptionSpanRadioGroup>
                                                    </Skeleton>
                                                    {
                                                        searchParams.subwayLineId &&
                                                        <div>
                                                            <Skeleton active={true} loading={subwayStationLoading} title={false}>
                                                                <Checkbox.Group
                                                                    onChange={(checkedValue) => onChange({regionEnName: null, subwayLineId: searchParams.subwayLineId, subwayStationIdList: checkedValue})}
                                                                    options={subwayStation.list.map((item:any) => ({value: item.id, label: item.name}))}
                                                                />
                                                            </Skeleton>
                                                        </div>
                                                    }
                                                </Col>
                                            </>
                                        }
                                        {
                                            showSearchType === 3 &&
                                            <>
                                                <Col span={2}>公司地址</Col>
                                                <Col span={22} className="option" style={{border: "none"}}>
                                                    <i className="iconfont">&#xe620;</i>
                                                    <AutoComplete
                                                        style={{ width: 250, border: "none"}}
                                                        placeholder={"请输入公司地址..."}
                                                    />
                                                </Col>
                                                <Col span={2}>距离</Col>
                                                <Col span={22} className="option">
                                                    <OptionSpanRadioGroup>
                                                        <OptionSpanRadio value="西湖">1千米</OptionSpanRadio>
                                                        <OptionSpanRadio value="下城">2千米</OptionSpanRadio>
                                                        <OptionSpanRadio value="江干">3千米</OptionSpanRadio>
                                                        <OptionSpanRadio value="拱墅">4千米</OptionSpanRadio>
                                                        <OptionSpanRadio value="拱墅">5千米</OptionSpanRadio>
                                                    </OptionSpanRadioGroup>
                                                    <OptionSpan>
                                                        <NumericInput  style={{width: 55, height: 22, borderRadius: 0}}/>
                                                    </OptionSpan>
                                                    <OptionSpan checked={true}>确定</OptionSpan>
                                                </Col>
                                            </>
                                        }
                                    </Row>
                                </CSSTransition>
                            </SwitchTransition>
                        }
                    </Col>
                </CSSTransition>
                <Col span={2} className="title">
                    类型
                </Col>
                <Col span={22} className="option">
                    <OptionSpanRadioGroup>
                        <OptionSpanRadio value="不限">不限</OptionSpanRadio>
                        <OptionSpanRadio value="合租">合租</OptionSpanRadio>
                        <OptionSpanRadio value="整租">整租</OptionSpanRadio>
                    </OptionSpanRadioGroup>
                </Col>
                <Col span={2} className="title">
                    租金
                </Col>
                <Col span={22} className="option">
                    <OptionSpanRadioGroup>
                        <OptionSpanRadio value="0-1000">1000元以下</OptionSpanRadio>
                        <OptionSpanRadio value="1000-2000">1000-2000元</OptionSpanRadio>
                        <OptionSpanRadio value="2000-3000">2000-3000元</OptionSpanRadio>
                        <OptionSpanRadio value="3000-4000">3000-4000元</OptionSpanRadio>
                        <OptionSpanRadio value="4000-5000">4000-5000元</OptionSpanRadio>
                        <OptionSpanRadio value="5000-6000">5000-6000元</OptionSpanRadio>
                    </OptionSpanRadioGroup>
                    <OptionSpan>
                        <NumericInput style={{width: 55, height: 22, borderRadius: 0}}/>
                        <span style={{margin: "0 5px"}}>-</span>
                        <NumericInput style={{width: 55, height: 22, borderRadius: 0}}/>
                    </OptionSpan>
                    <OptionSpan checked={true}>确定</OptionSpan>
                </Col>
                <Col span={2} className="title">
                    房源特色
                </Col>
                <Col span={22} className="option">
                    <OptionSpanRadioGroup mode={RadioModeEnum.MULTI}>
                        {
                            houseTagsArray.map((tag, index) => <OptionSpanRadio key={index} value={tag}
                            >{tag}</OptionSpanRadio>)
                        }
                    </OptionSpanRadioGroup>
                </Col>
                {/* 更多选项*/}
                <Col span={24}  style={{padding: 0}}>
                    {
                        <CSSTransition in={moreOptionVisible} classNames="dropdown"  timeout={300} >
                            <Row  gutter={RowGutter} className="more-option">
                                <Col span={2} className="title">
                                    租房活动
                                </Col>
                                <Col span={22} className="option">
                                    <OptionSpanRadioGroup>
                                        <OptionSpanRadio value="0-1000">限时特惠</OptionSpanRadio>
                                    </OptionSpanRadioGroup>
                                </Col>
                                <Col span={2} className="title">
                                    朝向
                                </Col>
                                <Col span={22} className="option">
                                    <OptionSpanRadioGroup>
                                        <OptionSpanRadio value="0-1000">南</OptionSpanRadio>
                                        <OptionSpanRadio value="1000-2000">北</OptionSpanRadio>
                                        <OptionSpanRadio value="2000-3000">东</OptionSpanRadio>
                                        <OptionSpanRadio value="3000-4000">西</OptionSpanRadio>
                                        <OptionSpanRadio value="4000-5000">南北</OptionSpanRadio>
                                    </OptionSpanRadioGroup>
                                </Col>
                                <Col span={2} className="title">
                                    供暖方式
                                </Col>
                                <Col span={22} className="option">
                                    <OptionSpanRadioGroup>
                                        <OptionSpanRadio value="0-1000">集体供暖</OptionSpanRadio>
                                        <OptionSpanRadio value="1000-2000">独立供暖</OptionSpanRadio>
                                        <OptionSpanRadio value="2000-3000">中央供暖</OptionSpanRadio>
                                    </OptionSpanRadioGroup>
                                </Col>
                                <Col span={2} className="title">
                                    签约时长
                                </Col>
                                <Col span={22} className="option">
                                    <OptionSpanRadioGroup>
                                        <OptionSpanRadio value="0-1000">不限</OptionSpanRadio>
                                        <OptionSpanRadio value="1000-2000">年租</OptionSpanRadio>
                                        <OptionSpanRadio value="2000-3000">可短租</OptionSpanRadio>
                                    </OptionSpanRadioGroup>
                                </Col>
                                <Col span={2} className="title">
                                    房源状态
                                </Col>
                                <Col span={22} className="option">
                                    <OptionSpanRadioGroup>
                                        <OptionSpanRadio value="0-1000">不限</OptionSpanRadio>
                                        <OptionSpanRadio value="1000-2000">可立即入住</OptionSpanRadio>
                                        <OptionSpanRadio value="2000-3000">可预签</OptionSpanRadio>
                                        <OptionSpanRadio value="3000-4000">自如可转租</OptionSpanRadio>
                                        <OptionSpanRadio value="4000-5000">可预定</OptionSpanRadio>
                                    </OptionSpanRadioGroup>
                                </Col>
                            </Row>
                        </CSSTransition>
                    }
                </Col>
                <Col span={24} style={{textAlign: "center", marginTop: 15}}>
                    <span style={{cursor: "pointer"}} onClick={() => setMoreOptionVisible(!moreOptionVisible)}>
                        {
                            moreOptionVisible ?
                                <>收起选项<UpOutlined style={{marginLeft: "2px"}}/></>
                                :
                                <>展开选项<DownOutlined style={{marginLeft: "2px"}}/></>
                        }
                    </span>
                </Col>
            </Row>
        </Container>
    )
};
// 箭头图标样式
const ArrowIconStyle = {
    marginLeft: "2px"
}

const Container = styled.div`
    margin-top: 30px;
    .title{
        font-size: 15px;
        color: #000;
        color: rgba(0,0,0,.85);
        font-weight: bold ;
    }
    .option {
        display: flex;
        color: rgba(0,0,0,.6);
        font-size: 15px;
        border-bottom: 1px solid rgba(224,224,224, .6);
        flex-wrap: wrap;
        align-items: center;
        .ant-checkbox-inner{
            border-radius: 0px;
        }
    }
    .option-subway{
        color: rgba(0,0,0,.6);
        font-size: 15px;
        border-bottom: 1px solid rgba(224,224,224, .6);
        align-items: center;
        .ant-checkbox-inner{
            border-radius: 0px;
        }
    }
    .more-option{
        overflow: hidden;
        height: 0;
    }
    // 找房方式fade动画
    .fade-enter {
      opacity: 0;
    }
    .fade-enter-active {
      opacity: 1;
      transition: opacity 0.3s;
    }
    .fade-exit{
      opacity: 1;
    }
    .fade-exit-active {
      opacity: 0;
      transition: opacity 0.3s;
    }
    // 找房方式下拉展开
    .type-search{
        padding: 0;
        max-height: 0;
        overflow: hidden;
    }
    // 区域和地铁展开动画
    .type-search-dropdown-enter{
        max-height: 0;
    }
    .type-search-dropdown-enter-active {
        max-height: 96px;
        transition: max-height 0.3s cubic-bezier(0,.86,.5,1.02);
    }
    .type-search-dropdown-enter-done{
        max-height: 96px;
    }
    .type-search-dropdown-exit{
        max-height: 96px;
    }
    .type-search-dropdown-exit-active{
        max-height: 0;
        transition: max-height 0.3s cubic-bezier(0,.86,.5,1.02);
    }
    .type-search-dropdown-exit-done{
        max-height: 0;
    }
    // 更多选项下拉动画
    .dropdown-enter{
        height: 0;
    }
    .dropdown-enter-active{
        height: 240px;
        transition: height 0.15s cubic-bezier(0,.86,.5,1.02);
    }
    .dropdown-enter-done{
        height: 240px;
    }
    .dropdown-exit{
        height: 240px;
    }
    .dropdown-exit-active{
        height: 0;
        transition: height  0.3s cubic-bezier(0,.86,.5,1.02);
    }
    .dropdown-exit-done{
        height: 0;
    }
    // 公司地址搜索输入框
     .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        position: relative;
        background-color: #fff;
        border: none;
        border-radius: 8px;
        -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
        height: 32px;
        padding: 0 11px;
        box-shadow: none !important;
    }
`;
const OptionSpan = styled.span`
    ${({checked = false}: {checked?: boolean}) => !checked ?
        `
             cursor: pointer;    
             margin-right: 20px; 
             padding: 0 5px; 
             user-select: none;
             transition: color 0.3s;
             &:hover{  color: #51C6CF; }`
        :
        `
            user-select: none;
            cursor: pointer;
            margin-right: 20px;
            padding: 0 5px;
            border-radius: 5px;
            color: #FFFFFF;
            background: #51C6CF;
            transition: background 0.3s;
            &:hover{  background: #6FCFCF; }
        `
    }
`;

const OptionSpanRadioGroup = ({children, value, onChange, mode = RadioModeEnum.SINGLE, defaultValue}: OptionSpanRadioGroupProp) => {

    const [radioValue, setRadioValue] = useState<any |Array<any>>(defaultValue);

    const handleChange = (selectVal) => {
        let tmp;
        if(mode ===  RadioModeEnum.SINGLE){
            tmp = radioValue === selectVal ? null : selectVal;
        }
        else if(mode === RadioModeEnum.MULTI){
            const oldValue = [...(radioValue || [])];
            tmp = oldValue.indexOf(selectVal) === -1 ? [...oldValue, selectVal] : oldValue.filter(item => item !== selectVal);
        }
        setRadioValue(tmp);
        triggerChange(tmp);
    };

    const triggerChange = (changedValue) => {
        onChange && onChange(changedValue);
    };
    return (
        <>
            {
                React.Children.map(children, (child, index) => {
                    let checked = false;
                    if(mode === RadioModeEnum.SINGLE){
                        checked = (value || radioValue) === child.props.value;
                    }else{
                        let arr: Array<any> = [];
                        arr =  (value || radioValue) || [];
                        checked = arr.indexOf(child.props.value) !== -1;
                    }
                    return React.cloneElement(child, {
                        index: index,
                        key: index,
                        checked: checked,
                        onClick: () => handleChange(child.props.value)
                    });
                })
            }
        </>
    )
};

const OptionSpanRadio = (props: OptionSpanRadio) => {

    return (
        <OptionSpan onClick={props.onClick} checked={props.checked}>
            {props.children}
        </OptionSpan>
    )
};
export default SearchFilter;
