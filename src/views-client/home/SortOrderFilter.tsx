import React from "react";
import styled from "styled-components";


export enum SortTypeEnum {DEFAULT = "lastUpdateTime", PRICE = "price", AREA = "area"};
export enum SortDirectionEnum {
    ASC = "ASC",
    DESC = "DESC"
}
/**
 * 排序过滤器
 */
const SortOrderFilter = (props) => {

    const {sortType =  SortTypeEnum.DEFAULT, sortDirection = SortDirectionEnum.DESC, onSortChange} = props;


    // 排序过滤点击
    const handleSortClick = (type) => {
        if(type === SortTypeEnum.DEFAULT){
            if(sortType !== type){
                onSortChange(SortTypeEnum.DEFAULT, SortDirectionEnum.DESC);
            }
            return;
        }
        if(type === SortTypeEnum.PRICE || type === SortTypeEnum.AREA){
            if(type !== sortType){
                onSortChange(type, SortDirectionEnum.ASC);
            }else{
                const direction = sortDirection === SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC;
                onSortChange(type, direction);
            }
        }
    };

    return (
        <FilterContainer>
            <FilterTypeComponent title="默认排序" checked={sortType === SortTypeEnum.DEFAULT} onClick={() => handleSortClick(SortTypeEnum.DEFAULT)}/>
            <FilterTypeComponent title="价格" checked={sortType === SortTypeEnum.PRICE} direction={sortDirection} showDirection={true} onClick={() => handleSortClick(SortTypeEnum.PRICE)}/>
            <FilterTypeComponent title="面积" checked={sortType === SortTypeEnum.AREA} direction={sortDirection}  showDirection={true} onClick={() => handleSortClick(SortTypeEnum.AREA)}/>
        </FilterContainer>
    )
};
const FilterContainer = styled.div`
    border-bottom: 1px solid rgba(0,0,0,.06);
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: flex-end;
    .icon{
        font-weight: bold;
        color: #E0E0E0;
    }
    .name{
        margin-right: 20px;
        cursor: pointer;
        position: relative;
        .underline{
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: #51c6cf;
            border-radius: 1px;
            -webkit-transition: width .3s;
            transition: width .3s;
            will-change: width;
        }
        &:hover .underline{
            width: 100%;
        }
    }
    .name-active .underline{
       width: 100%;
    }
    .name-active, .icon-active{
        color: #51c6cf;
    }
`;
const FilterTypeComponent = ({checked = false, title = "", showDirection = false, direction = SortDirectionEnum.DESC, onClick = () => {}}) => {

    return (
        <div className={"name " + (checked && "name-active")} onClick={onClick}>
            {title}
            {
                showDirection &&
                <>
                    <i className={"iconfont icon " + (checked && direction === SortDirectionEnum.DESC && "icon-active")} >&#xe679;</i>
                    <i className={"iconfont icon " + (checked && direction === SortDirectionEnum.ASC && "icon-active")} style={{marginLeft: -8}}>&#xe66a;</i>
                </>
            }
            <span className="underline"/>
        </div>
    )
};
export default SortOrderFilter;
