import React from "react";
import styled, {createGlobalStyle} from "styled-components";
import {Dropdown, Menu} from "antd";


interface HouseDropdownMenuItemProp{
    value: string | number | any,
    title: any
}

export interface HouseDropdownProps {
    items: Array<HouseDropdownMenuItemProp>,
    color?: string,
    fontSize?: string,
    children: any,
    onSelect?: any
    value?: string | number | any,
    trigger?: ('click' | 'hover' | 'contextMenu')[],
    overlayStyle?: React.CSSProperties,
    menuItemStyle?: React.CSSProperties,
    menuTitleStyle?: React.CSSProperties,
    onVisibleChange?: (visible: boolean) => void;
}

/**
 * Created by Administrator on 2020/7/9
 */
const HouseDropdown = (props: HouseDropdownProps) => {

    const {children, onSelect, items, value, trigger, overlayStyle, menuItemStyle = {color: "rgba(0,0,0,.65)", fontSize: "14px"}} = props;

    return (
        <Container>
            <GlobalHouseDropdown/>
            <Dropdown overlayClassName="house-dropdown" onVisibleChange={props.onVisibleChange}  trigger={trigger} overlayStyle={overlayStyle} overlay={<Menu onClick={onSelect} >
                {
                    items.map((item: any) => <Menu.Item key={item.value} title={item.title} style={menuItemStyle}>
                        <span className={`city-item-content ${value === item.value && "active"}`} style={props.menuTitleStyle}>
                            {item.title}
                            <span className="city-item-bottom-line"/>
                        </span>
                    </Menu.Item>)
                }
            </Menu>}>
                {children}
            </Dropdown>
        </Container>
    )
};
interface DropDownStyle {
    fontSize: string,
    color: string
}
const GlobalHouseDropdown =  createGlobalStyle `
    .house-dropdown{
        .ant-dropdown-menu-item{
            clear: both;
            margin: 0;
            padding: 5px 12px;
            font-weight: normal;
            line-height: 22px;
            white-space: nowrap;
            cursor: pointer;
            text-align: center;
            -webkit-transition: all 0.3s;
            transition: all 0.3s;
            .city-item-content{
                display: inline-block;
                position: relative;
                .city-item-bottom-line{
                    display: block;
                    margin: 0 auto;
                    width: 0%;
                    height: 3px;
                    background: #51c6cf;
                    transition: all 0.3s;
                }
            }
            .active{
                color: #51c6cf;
                .city-item-bottom-line{
                    width: 100%;
                }
            }
            &:hover{
                color: #51c6cf;
            }
             &:hover .city-item-content .city-item-bottom-line{
                width: 100%;
            }
        }
    }
`;
const Container = styled.div`

`;

export default HouseDropdown;
