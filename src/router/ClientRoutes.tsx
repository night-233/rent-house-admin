import {Redirect} from "react-router";
import React, {lazy, Suspense} from "react";

const SuspenseComponent = Component => props => {
    return (
        <Suspense fallback={<div style={{
            height: 'calc(100vh-150px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}> loading...</div >}>
            <Component {...props}/>
        </Suspense >
    )
}
const ClientLayout = lazy(() => import("../views-client/layout/ClientLayout"));
const ClientHome = lazy(() => import("../views-client/home"));
const ClientHouseDetail = lazy(() => import("../views-client/house"));
const MapHouse = lazy(() => import("../views-client/map-house"));

const clientRoute =   [{
    path: "/client",
    component: SuspenseComponent(ClientLayout),
    routes: [
        {
            path: "/client",
            exact: true,
            render: () => <Redirect to={"/client/home"} />
        },
        {
            path: "/client/home",
            meta: { title: '租房首页'},
            component: SuspenseComponent(ClientHome)
        },
        {
            path: "/client/house/:houseId",
            meta: { title: '房屋详情'},
            component: SuspenseComponent(ClientHouseDetail)
        },
        {
            path: "/client/map/house",
            meta: {title: "地图找房"},
            component: SuspenseComponent(MapHouse)
        }
    ]
}];

export default clientRoute;
