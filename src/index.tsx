import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from "antd";
import moment from 'moment';
import 'moment/locale/zh-cn';
import Loading from "@components/Loading";
import {Simulate} from "react-dom/test-utils";


moment.locale('zh-cn');

const loading = document.getElementById("init-loading");
loading?.remove();

ReactDOM.render(
  // <React.StrictMode>
  <Suspense fallback={<Loading/>}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Suspense>,
  // </React.StrictMode>,
  document.getElementById('root')
);

window.addEventListener('error', function (e) {
  let target: any = e.target,
    tagName = target?.tagName,
    times = Number(target?.dataset?.times) || 0, // 以失败的次数，默认为0
    allTimes = 3; // 总失败次数，此时设定为3
  if (tagName.toUpperCase() === 'IMG') {
    if (times >= allTimes) {
      target.src = 'data:image/jpeg;base64,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';
    } else {
      target.dataset.times = times + 1;
      target.src = '/src/assets/img/avatar5.jpeg';
    }
  }
}, true)


serviceWorker.unregister();
