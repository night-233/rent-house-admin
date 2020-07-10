import request from '@/utils/request';
import axios from 'axios'

const base = '/baiduApi';

const ACCESS_KEY = "kKVY2bXNVtE3hqDKatj6r3Ao3ihKKWsL";

const BaiduApi = {

    // 获取当前城市信息
    getCurrentCity(){
        return request({
            url:  `${base}/location/ip?ak=${ACCESS_KEY}`,
            method: 'get',
            noJweToken: true
        });
    },
    // 获取地址提示
    getAddressHint(keyword: string, city: string, page_num = 0, page_size = 10){
        return request({
            url:  `${base}/place/v2/suggestion?ak=${ACCESS_KEY}&output=json&city_limit=true&region=${city}&query=${keyword}&page_num=${page_num}&page_size=${page_size}`,
            method: 'get',
            noJweToken: true,
            progress: false
        })
    }
};

export default BaiduApi;
