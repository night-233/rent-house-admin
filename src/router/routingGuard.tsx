import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import cookie from '@utils/cookie'

const renderRoutes = (routes, authed = false, authPath = '/login', extraProps = {}, switchProps = {}) => routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {
          const token = cookie.getCookie('Authorization') || false
          if (!route.requiresAuth || token || route.path === authPath) {
            return <route.component {...props} {...extraProps} route={route} />
          }
          return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
        }}
      />
    ))}
  </Switch>
) : null

export default renderRoutes