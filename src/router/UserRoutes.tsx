import React, {lazy} from "react";
import SuspenseComponent from "@components/SuspenseComponent";
import {Redirect} from "react-router";

const UserLayout= lazy(() => import("@views-client/layout/UserLayout"));
const UserCenterLayout= lazy(() => import("@views-client/layout/UserCenterLayout"));
const UserStar= lazy(() => import("@views-client/user/user-center/star"));
const UserReserve= lazy(() => import("@views-client/user/user-center/reserve"));
const UserCenter= lazy(() => import("@views-client/user/user-center/center"));

const UserRoute =   [{
    path: "/user",
    component: SuspenseComponent(UserLayout),
    routes: [
        {
            path: "/user",
            exact: true,
            redirect: "/user/center",
        },
        {
            path: "/user/center",
            component: SuspenseComponent(UserCenterLayout),
            routes: [
                {
                    path: "/user/center",
                    exact: true,
                    redirect: "/user/center/center",
                },
                {
                    path: "/user/center/center",
                    exact: true,
                    component: SuspenseComponent(UserCenter),
                },
                {
                    path: "/user/center/star",
                    exact: true,
                    component: SuspenseComponent(UserStar),
                },
                {
                    path: "/user/center/reserve",
                    exact: true,
                    component: SuspenseComponent(UserReserve),
                },
                {
                    path: "/user/center/contract",
                    exact: true,
                    component: SuspenseComponent(UserReserve),
                },
            ]
        },
    ]
}];
export default UserRoute;
