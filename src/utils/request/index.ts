import axios from 'axios'
import { dealResError, dealResStatus, dealAxiosRequestConfig } from './dealMethod'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

axios.create({
  baseURL: "",
  timeout: 5000
})

interface Response {
  code: number,
  data?: any,
  message: string | null,
}
// 响应拦截
axios.interceptors.response.use(
  response => {
    NProgress.done()
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
    NProgress.start()
    const preConfig = dealAxiosRequestConfig(config);
    return preConfig;
  },
  error => Promise.reject(error)
);


const request = (config: any) => {

  const customConfig = Object.assign(config);
  return axios(customConfig)
    .then((response) => {
      return response.data || response || true;
    }, (err) => {
      console.log(err, err.response);
      return false;
    });
};

export default request
