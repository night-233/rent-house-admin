import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";
ReactDOM.render(
  // <React.StrictMode>
  <Suspense fallback={<div>Loading... </div>}>
      <ConfigProvider locale={zhCN}>
          <App />
      </ConfigProvider>
  </Suspense>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
