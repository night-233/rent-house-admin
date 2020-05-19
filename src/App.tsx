
import React, { useEffect } from 'react';
// import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './style';
import renderRoutes from './router/routingGuard'
import routes from './router/index';
import { Provider } from 'react-redux';
import store from './store/index';
import './App.css';

const authPath = '/login'
function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle></GlobalStyle>
        {renderRoutes(routes, false, authPath)}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
