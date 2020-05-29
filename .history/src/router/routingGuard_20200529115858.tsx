import React from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import cookie from '@utils/cookie'
import routes from '@/router/index';
// (
// <TransitionGroup className={'router-wrapper'}>
//   <CSSTransition
//     timeout={5000}
//     classNames={'fade'}
//     key={location.pathname}
//   >
//       <Switch location={location}>
//         <Route exact path={'/'} component={HomePage} />
//         <Route exact path={'/about'} component={AboutPage} />
//         <Route exact path={'/list'} component={ListPage} />
//         <Route exact path={'/detail'} component={DetailPage} />
//       </Switch>
//     </CSSTransition>
//   </TransitionGroup>
// )
// const renderRoutes = withRouter(({ location }) => {
//   const authPath = '/login'
//   return (
// <TransitionGroup className={'router-wrapper'}>
//   <CSSTransition
//     timeout={5000}
//     classNames={'fade'}
//     key={location.pathname}
//   >

//     <Switch location={location}>
//       {routes.map((route, i) => (
//         <Route
//           key={route.key || i}
//           path={route.path}
//           exact={route.exact}
//           strict={route.strict}
//           render={(props) => {
//             const token = cookie.getCookie('Authorization') || false
//             if (!route.requiresAuth || token || route.path === authPath) {
//               return <route.component {...props} route={route} />
//             }
//             return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
//           }}
//         />
//       ))}
//     </Switch>
//     //   </CSSTransition>
//     // </TransitionGroup>
//   )
// });
const renderRoutes = (routes, authPath = '/login', switchProps = {}, extraProps = {}, ) => routes ? (
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