// import { Redirect } from "react-router-dom";
import Home from '../views/home';
import Test1 from '../views/test1';
import Test2 from '../views/test2';
import Login from '../views/login/index';
import * as React from 'react';

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
    component: Home,
    exact: true,
    requiresAuth: true
  }
]
constantRoutes = constantRoutes.map((item) => ({ ...item, requiresAuth: false }))
authRoutes = authRoutes.map((item) => ({ ...item, requiresAuth: true }))

export default [
  ...constantRoutes,
  ...authRoutes
]