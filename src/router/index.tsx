import { Redirect } from "react-router-dom";

import React, { lazy, Suspense } from "react";

import Login from '../views/login/index';

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const Layout = lazy(() => import("../views/layout"));
const Test1 = lazy(() => import("../views/test1"));
const Test2 = lazy(() => import("../views/test2"));
const Home = lazy(() => import("../views/home"));

// 公用页面，不需要权限验证的
let constantRoutes = [
  {
    path: "/login",
    requiresAuth: false,
    component: Login,
  },
  {
    path: "/test1",
    requiresAuth: false,
    component: Test1
  },
  {
    path: "/test2",
    requiresAuth: false,
    component: Test2
  }
]

// 需要权限的路由
let authRoutes = [
  {
    path: "/",
    component: SuspenseComponent(Layout),
    requiresAuth: true,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/home"} />
      },
      {
        path: "/home",
        component: SuspenseComponent(Home),
      },
      {
        path: "/test1",
        component: SuspenseComponent(Test1)
      },
    ]
  }
]
constantRoutes = constantRoutes.map((item) => ({ ...item, requiresAuth: false }))
authRoutes = authRoutes.map((item) => ({ ...item, requiresAuth: true }))
export default [
  ...constantRoutes,
  ...authRoutes
]
