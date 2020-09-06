import React, { lazy, Suspense } from "react";
import ClientRoutes from "./ClientRoutes";
import UserRoutes from "./UserRoutes";

const Login = lazy(() => import("../views-client/login"));
const ErrorPage = lazy(() => import("../views-client/error/ErrorPage"));
const ForgetPassword = lazy(() => import("@/views-client/forget-password"));

// 公用页面，不需要权限验证的
let constantRoutes = [
  {
    path: "/",
    exact: true,
    redirect: "/client/home"
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/404",
    component: ErrorPage
  },
  {
    path: "/500",
    component: ErrorPage,
    props: {
      code: 500
    }
  },
  {
    path: "/forget-password",
    component: ForgetPassword
  },
  {
    path: "*",
    redirect: "/404"
  },
];

constantRoutes = constantRoutes.map((item) => ({ ...item, requiresAuth: false }));
export default [
  ...ClientRoutes,
    ...UserRoutes,
  ...constantRoutes,
]
