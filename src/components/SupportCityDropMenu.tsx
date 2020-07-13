import React, {useEffect, useState} from "react";
import {changeCity} from "@store/redux/common.redux";
import BaiduApi from "@apis/baidu";
import AddressApi from "@apis/address";
import {useDispatch, useSelector} from 'react-redux'
import HouseDropdown from "@components/HouseDropdown";

/**
 * Created by Administrator on 2020/7/9
 * 支持城市下拉列表
 */
const SupportCityDropMenu = (props) => {

    const [supportCitiesList, setSupportCitiesList] = useState([]);

    const dispatch = useDispatch();

    const city = useSelector(state => state.common.city);

    const {children, color = "rgba(0,0,0,.65)", fontSize = "14px"} = props;

    // 处理城市选择
    const handleCityClick = ({item, key}) => {
        if(city.enName !== key){
            dispatch(changeCity({cnName: item.props.title,  enName: key}));
        }
    };

    useEffect(() => {
        getSupportCities().then(res => {
            if(res){
                const cityList = res.list;
                setSupportCitiesList(cityList);
                getCurrentCity().then( (result:any) => {
                    const city = result?.content?.address_detail?.city?.replace("市", "");
                    const matchCity = cityList.find(item => item.cnName === city);
                    if(matchCity){
                        dispatch(changeCity({ ...matchCity}));
                    }else if(cityList.length > 0){
                        dispatch(changeCity({...cityList[0]}))
                    }
                })
            }
        })
    }, []);

    // 获取当前城市
    const getCurrentCity = () => {
        return BaiduApi.getCurrentCity();
    };

    // 获取支持城市列表
    const getSupportCities = async () => {
        return  AddressApi.getSupportCities();
    };
    const items = supportCitiesList.map((item:any) => ({value: item.enName, title: item.cnName}))

    return (
        <HouseDropdown items={items} value={city.enName} onSelect={handleCityClick} color={color} menuItemStyle={{fontSize: fontSize, color: color}}>
            {children}
        </HouseDropdown>
    )
};


export default SupportCityDropMenu;
