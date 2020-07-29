// 设置房屋信息
import HouseApi from "@apis/house";
import UserApi from "@apis/user";

const SET_HOUSE_DATA = 'SET_HOUSE_DATA';
// 设置房屋loading状态
const SET_HOUSE_LOADING = 'SET_HOUSE_LOADING';
// 添加房源被收藏次数
const INCREASE_HOUSE_STAR_NUMBER = "INCREASE_HOUSE_STAR_NUMBER";
// 减少房源被收藏次数
const DECREASE_HOUSE_STAR_NUMBER = "DECREASE_HOUSE_STAR_NUMBER";
// 设置房屋预约状态
const SET_HOUSE_STAR = "SET_HOUSE_STAR";
// 设置房屋收藏状态
const SET_HOUSE_RESERVE = "SET_HOUSE_RESERVE";

const initState = {
    house: {
        tags: [],
        housePictureList: [],
        houseDetail: {},
        starNumber: 0
    },
    city: {},
    region: {},
    subway: {},
    subwayStation: {},
    agent: {},
    houseCountInDistrict: null,
    location: {},
    loading: true,
    star: false,
    reserve: false
};

export const house = (state = initState, action) =>{
    switch (action.type) {
        case SET_HOUSE_DATA: return {...state, ...action.data};
        case SET_HOUSE_LOADING: return {...state, loading: action.loading};
        case INCREASE_HOUSE_STAR_NUMBER:
            return {...state, house: {
                ...state.house,
                    starNumber: state.house.starNumber + 1
            }};
        case DECREASE_HOUSE_STAR_NUMBER:
            return {...state, house: {
                    ...state.house,
                    starNumber: state.house.starNumber - 1
            }};
        case SET_HOUSE_STAR: return {...state, star: action.payload};
        case SET_HOUSE_RESERVE: return {...state, reserve: action.payload};
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

export const getHouseOperateById = (houseId: number) => {
    return (dispatch, getState) => {
        return  UserApi.getHouseOperate(houseId).then(res => {
            if(res){
               dispatch(setHouseStar(res.star));
               dispatch(setHouseReserve(res.reserve));
            }
        })
    }
};

// 房源收藏数 + 1
export const increaseHouseStarNumber = () => {
    return {type: INCREASE_HOUSE_STAR_NUMBER}
};
// 房源收藏数 - 1
export const decreaseHouseStarNumber = () => {
    return {type: DECREASE_HOUSE_STAR_NUMBER}
};
const setHouseLoading = (loading: boolean) => {
    return {
        type: SET_HOUSE_LOADING,
        loading: loading
    }
};
export const setHouseStar = (star) => {
    return {
        type: SET_HOUSE_STAR,
        payload: star
    }
};
export const setHouseReserve = (reserve) => {
    return {
        type: SET_HOUSE_RESERVE,
        payload: reserve
    }
};
const setHouseData = (data) => {
    return {
        type: SET_HOUSE_DATA,
        data: data
    }
};


