
import React from 'react';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { GlobalStyle } from './style';
import renderRoutes from './router/routingGuard'
import routes from './router/index';
import { Provider } from 'react-redux';
import store from './store/index';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './App.css';

const authPath = '/login'

const RoutesWrap = withRouter(({ location }) => {
  const switchProps = { location: location }
  return (
    <TransitionGroup className={'router-wrapper'}>
      <CSSTransition
        timeout={5000}
        classNames={'fade'}
        key={location.pathname}
      >
        {renderRoutes(routes, authPath, switchProps)}
      </CSSTransition>
    </TransitionGroup>
  )
});

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle></GlobalStyle>
        <RoutesWrap></RoutesWrap>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
