import axios from 'axios'
import {dealAxiosRequestConfig, dealResError, dealResStatus} from './dealMethod'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

axios.defaults.withCredentials = false;
axios.defaults.timeout = 5000;
axios.defaults.baseURL = "/api";

interface Response {
  code: number,
  data?: any,
  message: string | null,
}
// 响应拦截
axios.interceptors.response.use(
  (response: any) => {
    NProgress.done();
    const dataAxios = response.data;
    if(response?.config?.delStatus){
        const dealData = dealResStatus(dataAxios);
        if (dealData) return dealData;
    }
    return dataAxios
  },
  error => {
      NProgress.done();
      if(error?.config?.delStatus){
          dealResError(error)
      }
    return Promise.reject(error)
  });

// 请求拦截
axios.interceptors.request.use(
  (config: any) => {
      if(config.progress !== false){
          NProgress.start()
      }
      return dealAxiosRequestConfig(config);
  },
  error => Promise.reject(error)
);


const request = (config: any) => {
  const customConfig = Object.assign({delStatus: true, ...config});
  return axios(customConfig)
    .then((response) => {
        if(customConfig.delStatus){
            return response.data || response || true;
        }
        return response;
    }, (err) => {
      console.error(err, err.response);
      return false;
    });
};
// 不处理响应状态请求
export const requestWithoutDealStatus = (config: any) => {
    const customConfig = Object.assign({...config, delStatus: false});
    return axios(customConfig)
        .then((response) => {
            return response;
        }, (err) => {
            console.error(err, err.response);
            return false;
    });
};

export default request
