import React, {useEffect, useState} from "react";
import styled from "styled-components";
import HouseDropdown from "@components/HouseDropdown";
import { CSSTransition} from 'react-transition-group'
import {Menu, Dropdown, Button, Badge} from 'antd';
import { Checkbox } from 'antd';
import {HouseTagList} from "@base/HouseBaseEntity";
import {CloseSquareFilled, CloseSquareOutlined} from "@ant-design/icons/lib";
/**
 * 搜索过滤
 */
const MapSearchFilter = ({searchParams, onChange, onClearAll}) => {



    return (
        <Container>
            <FilterItemComponent value={searchParams.rentWay} name={rentWayItems.find(item => item.value === searchParams.rentWay)?.title || "合租整租"}
                                 items={rentWayItems} onSelect={(params) =>onChange({rentWay: params.key}) }
            />
            <FilterItemComponent value={searchParams.priceRange} name={priceItems.find(item => item.value === searchParams.priceRange)?.title || "价格"} items={priceItems} onSelect={(params) => {
                const priceArr = params.key.split("-");
                const priceMin = priceArr.length > 0 ? priceArr[0] : undefined;
                const priceMax = priceArr.length > 1 ? priceArr[1] : undefined;
                onChange({priceMin: priceMin, priceMax: priceMax, priceRange: params.key});
            }}/>
            <FilterItemComponent value={searchParams.direction} name={directionItems.find(item => item.value === searchParams.direction)?.title || "朝向"}
                                 items={directionItems} onSelect={(params) => onChange({direction: params.key})}/>
            <MoreOptionComponent  moreOptions={{
                tags: searchParams.tags,
            }} onMoreOptionChange={(params) => onChange({tags: params.tags})}/>
            {
                (searchParams.rentWay !== null || searchParams.priceRange != null || searchParams.direction  !== null || searchParams.tags.length > 0 ) &&
                <div className="clear-all" onClick={onClearAll}><CloseSquareOutlined style={{marginRight: 5}}/>清除所有选项</div>
            }
        </Container>
    )
};
// 合租方式下拉项
const rentWayItems = [{value: "null", title: "不限"}, {value: "0", title: "合租"}, {value: "1", title: "整租"}];
const priceItems  = [{value: "null", title: "不限"},
    {value: "0-1500", title: "1500元以下"},
    {value: "1500-2500", title: "1500-2500元"},
    {value: "2500-4000", title: "2500-4000元"},
    {value: "4000-6000", title: "4000-6000元"},
    {value: "6000-8000", title: "6000-8000元"},
    {value: "8000-10000", title: "8000-10000元"},
    {value: "10000-", title: "10000元以上"},
];
const  directionItems = [{value: "null", title: "不限"}, {value: "2", title: "南"},  {value: "4", title: "北"}, {value: "1", title: "东"},  {value: "3", title: "西"},];
const houseTagsOption = HouseTagList.map((item: any) => ({label: item, value: item}));
const rentTypeOptions = [{label: "年租", value: 1}, {label: "可短租", value: 2}];
const houseStatusOptions = [{label: "可立即入住", value: 1}, {label: "可预定", value: 2}];

// 过滤项
const FilterItemComponent = (props) => {

    const {value, name, items, onSelect} = props;

    const [menuVisible, setMenuVisible] = useState(false);


    return (
        <HouseDropdown items={items} value={value} trigger={["click"]} menuItemStyle={{
            fontSize:"16px",
            color:"#444444",
            padding: "5px 32px"
        }} menuTitleStyle={{minWidth: 60}} onVisibleChange={setMenuVisible} onSelect={(params) => {
            setMenuVisible(false);
            onSelect(params);
        }}>
            <div className="select-item">
                <span className="select-block">{name}
                    <CSSTransition in={menuVisible} classNames="rotate-triangle"  timeout={300} >
                        <b className="arrow"/>
                    </CSSTransition>
                </span>
            </div>
        </HouseDropdown>
    )
};

const MoreOptionComponent = ({moreOptions, onMoreOptionChange}) => {

    const [menuVisible, setMenuVisible] = useState(false);

    const [option, setOption] = useState<any>({
        tags: [],
        /*rentType: null,
        rentStatus: null*/
    });

  //  const count = option.tags.length + (option.rentType !== null ? 1 : 0) + (option.rentStatus !== null ? 1 : 0);

    const count = option.tags.length;

    useEffect(() => {
        setOption(moreOptions);
    }, [moreOptions]);

   return  (
       <Dropdown overlay={<MoreOptionOverLay
           moreOption={option}
           setMoreOptions={setOption}
           onOk={() => {
               setMenuVisible(false);
               onMoreOptionChange(option);
           }}
           onCancel={() => {
               setMenuVisible(false);
               setOption(moreOptions);
           }}
       />} trigger={["click"]} onVisibleChange={(visible) => {
           setMenuVisible(visible);
           if(!visible){
               setOption(moreOptions);
           }
       }} visible={menuVisible}>
           <div className="select-item">
                <span className="select-block" style={{paddingRight: count > 0 ? 40: 20}}>
                     <Badge count={count} offset={[15, 8]} style={{backgroundColor: "#51c6cf"}}>
                         <span style={{fontSize: "16px", color: "#444444"}}>
                             更多
                         </span>
                     </Badge>
                   <CSSTransition in={menuVisible} classNames="rotate-triangle"  timeout={300} >
                        <b className="arrow"/>
                   </CSSTransition>
                </span>
           </div>
       </Dropdown>
   )
};

// 更多选项下拉列表
const MoreOptionOverLay = ({moreOption, setMoreOptions, onOk, onCancel}) => {

    return (
        <MoreOptionOverLayContainer>
            <div className="more-list">
                <div className="title">房屋特色</div>
                <div className="checkbox-container">
                    <Checkbox.Group options={houseTagsOption} value={moreOption.tags} onChange={(checkedValue) => setMoreOptions({...moreOption, tags: checkedValue})}/>
                </div>
           {/*     <div className="title">租约类型</div>
                <div className="checkbox-container">
                    <Checkbox.Group options={rentTypeOptions} value={moreOption.rentType} onChange={(checkedValue) => setMoreOptions({...moreOption, rentType: checkedValue})}/>
                    {
                        rentTypeOptions.map(item => <Checkbox key={item.value} checked={moreOption.rentType === item.value} onChange={e => {
                            if(e.target.checked){
                                setMoreOptions({...moreOption, rentType: item.value})
                            }else{
                                setMoreOptions({...moreOption, rentType: null})
                            }
                        }}>{item.label}</Checkbox>)
                    }
                </div>
                <div className="title">房屋状态</div>
                <div className="checkbox-container">
                    {
                        houseStatusOptions.map(item => <Checkbox key={item.value} checked={moreOption.rentStatus === item.value} onChange={e => {
                            if(e.target.checked){
                                setMoreOptions({...moreOption, rentStatus: item.value})
                            }else{
                                setMoreOptions({...moreOption, rentStatus: null})
                            }
                        }}>{item.label}</Checkbox>)
                    }
                </div>*/}
            </div>
            <div className="buttons">
                <Button onClick={onCancel}>取消</Button>
                <Button type="primary" onClick={onOk}>确认</Button>
            </div>
        </MoreOptionOverLayContainer>
    )
};
const MoreOptionOverLayContainer = styled.div`
    background: #fff;
    padding: 10px 30px;
    border-radius: 0 4px 4px 4px;
    font-size: 16px;
    color: #444444;
    z-index: 1;
    .more-list{
        width: 420px;
        .title{
            font-size: 18px;
            line-height: 40px;
            font-weight: bold;
        }
        .checkbox-container{
          .ant-checkbox-inner{
            border-radius: 0px;
          }
          .ant-checkbox-group-item {
            display: inline-block;
            margin-right: 0;
            min-width: 125px;
            height: 40px;
            font-size: 16px;
            color: #444444;
            transition: color 0.3s;
            &:hover{
              color: #51c6cf;
            }
          }
          
           .ant-checkbox-wrapper {
             -webkit-box-sizing: border-box;
             box-sizing: border-box;
             margin: 0;
             padding: 0;
             font-size: 16px;
             color: #444444;
             font-variant: tabular-nums;
             line-height: 1.5715;
             list-style: none;
             -webkit-font-feature-settings: 'tnum', "tnum";
             font-feature-settings: 'tnum', "tnum";
             display: inline-block;
             height: 40px;
             min-width: 125px;
             cursor: pointer;
             transition: color 0.3s;
              &:hover{
                  color: #51c6cf;
               }
           }
        }
    }
     .buttons{
            display: flex;
            justify-content: space-between;
            padding: 0 30px;
    }
`;
const Container = styled.div`
   height: 40px;
    position: relative;
    z-index: 8;
    background: #fff;
    border-bottom: solid 1px #ddd;
    display: flex;
    .select-item{
        height: 40px;
        position: relative;
        z-index: 1;
        line-height: 40px;
        background: #fff;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        padding: 0 30px;
        cursor: pointer;
        .select-block{
            position: relative;
            padding-right: 20px;
            .arrow{
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -3px;
                width: 0;
                height: 0;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-top: 6px solid #666;
            } 
            .rotate-triangle-enter, .rotate-triangle-exit-done{
                transform: rotate(0deg);
                border-top: 6px solid #666;
            }
             .rotate-triangle-enter-active{
                transform: rotate(180deg);
                border-top: 6px solid #51c6cf;
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
            .rotate-triangle-enter-done , .rotate-triangle-exit{
                transform: rotate(180deg);
                border-top: 6px solid #51c6cf;
            }
            .rotate-triangle-exit-active{
                transform: rotate(0deg);
                border-top: 6px solid #666;
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
        }
    }
    .clear-all{
        cursor: pointer;
        border-right: none;
        z-index: 3;
        height: 40px;
        line-height: 40px;
        background: #fff;
        border-bottom: solid 1px #ddd;
        margin-left: 30px;
        color: #666;
        &:hover{
            color: #51c6cf;
        }
    }
`;

export default MapSearchFilter;
