import {Redirect} from "react-router";
import React, {lazy} from "react";
import SuspenseComponent from "@components/SuspenseComponent";


const ClientLayout = lazy(() => import("../views-client/layout/ClientLayout"));
const ClientHome = lazy(() => import("../views-client/home"));
const ClientHouseDetail = lazy(() => import("../views-client/house"));
const MapHouse = lazy(() => import("../views-client/map-house"));

const ClientRoutes =   [{
    path: "/client",
    component: SuspenseComponent(ClientLayout),
    routes: [
        {
            path: "/client",
            exact: true,
            redirect: "/client/home"
        },
        {
            path: "/client/home",
            meta: { title: '租房首页'},
            exact: true,
            component: SuspenseComponent(ClientHome)
        },
        {
            path: "/client/house/:houseId",
            meta: { title: '房屋详情'},
            exact: true,
            component: SuspenseComponent(ClientHouseDetail)
        },
        {
            path: "/client/map/house",
            meta: {title: "地图找房"},
            exact: true,
            component: SuspenseComponent(MapHouse)
        },
        {
            path: "*",
            redirect: "/404"
        },
    ]
}];

export default ClientRoutes;
