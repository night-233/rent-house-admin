import React, { lazy, Suspense } from "react";
import homeRoutes from './homeRoutes'
import Login from '../views/login/index';
import clientRoute from "./ClientRoutes";
import SuspenseComponent from "@components/SuspenseComponent";

const Layout = lazy(() => import("../views/layout"));
const Test1 = lazy(() => import("../views/test1"));
const Test2 = lazy(() => import("../views/test2"));

// 公用页面，不需要权限验证的
let constantRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/test1",
    component: Test1
  },
  {
    path: "/test2",
    component: Test2
  }
];

// 需要权限的路由
let authRoutes = [
  {
    path: "/",
    component: SuspenseComponent(Layout),
    requiresAuth: true,
    routes: [
      ...homeRoutes
    ]
  }
];
constantRoutes = constantRoutes.map((item) => ({ ...item, requiresAuth: false }))
authRoutes = authRoutes.map((item) => ({ ...item, requiresAuth: true }))
export default [
  ...constantRoutes,
  ...clientRoute,
  ...authRoutes,
]
