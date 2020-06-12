import { Redirect } from "react-router-dom";

import React, { lazy, Suspense } from "react";

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={<div></div>}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const UserSetting = lazy(() => import("../views/homePages/userSetting"));
const AddHouse = lazy(() => import("../views//homePages/addHouse/index"));
const Home = lazy(() => import("../views/home"));
const HouseList = lazy(() => import("../views/homePages/houseList"));

export default [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to={"/home"} />
  },
  {
    path: "/UserSetting",
    meta: { title: '个人信息' },
    component: SuspenseComponent(UserSetting),
  },
  {
    path: "/home",
    meta: { title: '主页' },
    component: SuspenseComponent(Home),
  },
  {
    path: "/houseList",
    meta: { title: '房源列表' },
    component: SuspenseComponent(HouseList),
  },
  {
    path: "/addHouse",
    meta: { title: '添加房源' },
    component: SuspenseComponent(AddHouse)
  },
  {
    path: "/editHouse/:houseId",
    meta: { title: '编辑房源' },
    component: SuspenseComponent(AddHouse)
  },
]
