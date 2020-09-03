import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import cookie from '@utils/cookie'
import Login from "@views-client/login";

const renderRoutes = (routes, authPath = '/login', switchProps = {}, extraProps = {}, ) => routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {
          if(route.redirect){
            return <Redirect to={{ pathname: route.redirect, state: { from: props.location } }} />
          }
          const token = cookie.getCookie('Authorization') || false;
          if (!route.requiresAuth || token || route.path === authPath) {
            return <route.component {...props} {...extraProps} route={route} {...route.props} />
          }
          return <Login/>
        }}
      />
    ))}
  </Switch>
) : null;

export default renderRoutes
