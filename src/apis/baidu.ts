import request from '@/utils/request';
import axios from 'axios'

const base = '/baiduApi';
const BaiduApi = {

    // 获取当前城市信息
    getCurrentCity(){
        return axios({
            url:  `${base}/location/ip?ak=kKVY2bXNVtE3hqDKatj6r3Ao3ihKKWsL`,
            method: 'get',
        });
    }
};

export default BaiduApi;
