// 设置房屋信息
import HouseApi from "@apis/house";

const SET_HOUSE_DATA = 'SET_HOUSE_DATA';
// 设置房屋loading状态
const SET_HOUSE_LOADING = 'SET_HOUSE_LOADING';

const initState = {
    house: {
        tags: [],
        housePictureList: [],
        houseDetail: {}
    },
    city: {},
    region: {},
    subway: {},
    subwayStation: {},
    agent: {},
    houseCountInDistrict: null,
    location: {},
    loading: true,
};

export const house = (state = initState, action) =>{
    switch (action.type) {
        case SET_HOUSE_DATA: return {...state, ...action.data};
        case SET_HOUSE_LOADING: return {...state, loading: action.loading};
        default: return state;
    }
};

export const getHouseById = (houseId: number) => {
    return (dispatch, getState) => {
        dispatch(setHouseLoading(true));
        return  HouseApi.getHouseById(houseId).then(res => {
            if(res){
                dispatch(setHouseData(res));
                dispatch(setHouseLoading(false));
            }
        })
    }
};

const setHouseLoading = (loading: boolean) => {
    return {
        type: SET_HOUSE_LOADING,
        loading: loading
    }
};
const setHouseData = (data) => {
    return {
        type: SET_HOUSE_DATA,
        data: data
    }
};
