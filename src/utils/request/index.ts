import axios from 'axios'
import { dealResError, dealResStatus, dealAxiosRequestConfig } from './dealMethod'

axios.create({
  baseURL: "",
  timeout: 5000
})

// 响应拦截
axios.interceptors.response.use(
  response => {
    const dataAxios = response.data
    const dealData = dealResStatus(dataAxios)
    if (dealData) return dealData
    return dataAxios
  },
  error => {
    dealResError(error)
    return Promise.reject(error)
  })

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    const preConfig = dealAxiosRequestConfig(config);
    return preConfig;
  },
  error => Promise.reject(error)
);




const request = (config: any, that: any = false) => {

  if (that && typeof that?.source === 'function') {
    that.source('终止请求');
  }
  const cancel = that ? {
    cancelToken: new axios.CancelToken((c) => {
      that.source = c;
    })
  } : {};
  const customConfig = Object.assign({ ...cancel }, config);
  if (customConfig.noJweToken) {
    customConfig.url += '#noJweToken#';
  }
  return axios(customConfig)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err, err.response);
      return false;
    });
};

export default request
