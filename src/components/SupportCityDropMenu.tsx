import React, {useEffect, useState} from "react";
import {changeCity} from "@store/redux/common.redux";
import BaiduApi from "@apis/baidu";
import AddressApi from "@apis/address";
import {useDispatch, useSelector} from 'react-redux'
import HouseDropdown from "@components/HouseDropdown";
import StorageUtil from "@utils/storage";

export const USER_CITY_KEY = "USER_CITY";
/**
 * Created by Administrator on 2020/7/9
 * 支持城市下拉列表
 */
const SupportCityDropMenu = (props) => {

    const [supportCitiesList, setSupportCitiesList] = useState<any>([]);

    const dispatch = useDispatch();

    const city = useSelector(state => state.common.city);

    const {children, color = "rgba(0,0,0,.65)", fontSize = "14px"} = props;

    // 处理城市选择
    const handleCityClick = ({item, key}) => {
        if(city.enName !== key){
            const matchCity = supportCitiesList.find(city => city.cnName === item.props.title);
            StorageUtil.set(USER_CITY_KEY, matchCity.enName);
            dispatch(changeCity({...matchCity}));
        }
    };

    useEffect(() => {
        getSupportCities().then(res => {
            if(res){
                const cityList = res.list;
                setSupportCitiesList(cityList);
                const storageCity = StorageUtil.get(USER_CITY_KEY);
                const city = cityList.find(item => item.enName === storageCity);
                if(city){
                    dispatch(changeCity({ ...city}));
                    return;
                }
                getCurrentCity().then( (result:any) => {
                    const city = result?.content?.address_detail?.city?.replace("市", "");
                    const matchCity = cityList.find(item => item.cnName === city);
                    if(matchCity){
                        StorageUtil.set(USER_CITY_KEY, matchCity.enName);
                        dispatch(changeCity({ ...matchCity}));
                    }else if(cityList.length > 0){
                        StorageUtil.set(USER_CITY_KEY, cityList[0].enName);
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
    const items = supportCitiesList.map((item:any) => ({value: item.enName, title: item.cnName}));

    return (
        <HouseDropdown items={items} value={city.enName} onSelect={handleCityClick} color={color} menuItemStyle={{fontSize: fontSize, color: color}}>
            {children}
        </HouseDropdown>
    )
};


export default SupportCityDropMenu;
