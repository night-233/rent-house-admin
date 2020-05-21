
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './style';
import renderRoutes from './router/routingGuard'
import routes from './router/index';
import { Provider } from 'react-redux';
import store from './store/index';
import '@assets/icon/iconfont/font/iconfont.css'
import './App.css';

const authPath = '/login'

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle></GlobalStyle>
        {renderRoutes(routes, authPath)}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
