import React, {lazy} from "react";
import SuspenseComponent from "@components/SuspenseComponent";

const UserLayout= lazy(() => import("@views-client/layout/UserLayout"));
const UserStar= lazy(() => import("@views-client/user/user-center/star"));
const UserCenterEntry = lazy(() => import("@views-client/user/user-center"));
const UserReserve= lazy(() => import("@views-client/user/user-center/reserve"));
const UserCenter= lazy(() => import("@views-client/user/user-center/center"));
const HousePublish = lazy(() => import("@views-client/user/public-manage/house-publish"));
const PublishManageEntry = lazy(() => import("@views-client/user/public-manage"));
const ReserveManage = lazy(() => import("@views-client/user/public-manage/reserve-manage"));
const HouseManage = lazy(() => import("@views-client/user/public-manage/house-manage"));
const HouseEdit = lazy(() => import("@views-client/user/public-manage/houses-edit"));
const AccountCenterEntry = lazy(() => import("@views-client/user/account-center"));
const PersonInfo = lazy(() => import("@views-client/user/account-center/person-info"));
const UserResetPassword = lazy(() => import("@views-client/user/account-center/reset-password"));


const UserRoute =   [{
    path: "/user",
    component: SuspenseComponent(UserLayout),
    requiresAuth: true,
    routes: [
        {
            path: "/user",
            exact: true,
            redirect: "/user/center",
        },
        {
            path: "/user/center",
            component: SuspenseComponent(UserCenterEntry),
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
                    path: "*",
                    redirect: "/404"
                },
            ]
        },
        {
            path: "/user/publish",
            component: SuspenseComponent(PublishManageEntry),
            routes: [
                {
                    path: "/user/publish",
                    exact: true,
                    redirect: "/user/publish/manage",
                },
                {
                    path: "/user/publish/manage",
                    exact: true,
                    component: SuspenseComponent(HouseManage),
                },
                {
                    path: "/user/publish/reserve",
                    exact: true,
                    component: SuspenseComponent(ReserveManage),
                },
                {
                    path: "*",
                    redirect: "/404"
                },
            ]
        },
        {
            path: "/user/account",
            component: SuspenseComponent(AccountCenterEntry),
            routes: [
                {
                    path: "/user/account",
                    exact: true,
                    redirect: "/user/account/person",
                },
                {
                    path: "/user/account/person",
                    exact: true,
                    component: SuspenseComponent(PersonInfo)
                },
                {
                    path: "/user/account/reset-password",
                    exact: true,
                    component: SuspenseComponent(UserResetPassword)
                },
                {
                    path: "*",
                    redirect: "/404"
                },
            ]
        },
        {
            path: "/user/house-publish",
            exact: true,
            component: SuspenseComponent(HousePublish),
        },
        {
            path: "/user/house-edit/:houseId",
            exact: true,
            component: SuspenseComponent(HouseEdit),
        },
        {
            path: "*",
            redirect: "/404"
        },
    ]
}];
export default UserRoute;
