import React, {CSSProperties, ReactNode, useEffect, useState} from "react";
import styled from "styled-components";
import {Button, Menu} from "antd";
import {Link, useHistory} from "react-router-dom";


interface MenuItemProps {
    key: string,
    to: string,
    name: string,
    icon: Element
}

interface MenuPathRenderProps {
    type?: ('default' | 'parent' | 'child');
    itemsMap: Object,
    itemKeyArray: Array<string>,
    mode?: ("horizontal" | "vertical"),
    className?: string
    style?: CSSProperties
}

/**
 * 菜单与url路径选中渲染
 * Created by Administrator on 2020/7/30
 */
const MenuPathRender = (menuPathRenderProps: MenuPathRenderProps) => {

    const [selectKey, setSelectKey] = useState();

    const itemsMap = menuPathRenderProps.itemsMap;
    const itemKeyArray = menuPathRenderProps.itemKeyArray;

    const history = useHistory();

    useEffect(() => {
        const pathname = history.location.pathname;
        const type = menuPathRenderProps.type || "child";
        if(type === "parent"){
            const item = itemKeyArray.find(item => pathname.startsWith(item));
            setSelectKey(item)
        }else{
            setSelectKey(history.location.pathname);
        }
    }, [history.location.pathname]);

    return (
        <Menu mode={menuPathRenderProps.mode || "vertical"} className={menuPathRenderProps.className}  style={menuPathRenderProps.style} selectedKeys={[selectKey]}>
            {
                itemKeyArray.map(item => (
                    <Menu.Item key={item} icon={itemsMap[item]?.icon} >
                        <Link to={itemsMap[item].to}>
                            {itemsMap[item].name}
                        </Link>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
};

export default MenuPathRender;
