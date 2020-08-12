import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {GlobalStyle, InitStyle} from './assets/scss/initStyle';
import {Provider} from 'react-redux';
import store from './store/index';
import './App.css';
import PageIndex from "@views-client";




function App () {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <InitStyle/>
        <GlobalStyle/>
        <PageIndex/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;


