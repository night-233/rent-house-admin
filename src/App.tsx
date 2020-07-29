import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {GlobalStyle, InitStyle} from './assets/scss/initStyle';
import routes from './router/index';
import {Provider} from 'react-redux';
import store from './store/index';
import './App.css';
import renderRoutes from "@/router/routingGuard";

const authPath = '/login';

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <InitStyle/>
        <GlobalStyle/>
        {renderRoutes(routes, authPath)}
      </BrowserRouter>
    </Provider>
  );
}

export default App;


