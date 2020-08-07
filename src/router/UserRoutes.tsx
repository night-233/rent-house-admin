import React, {lazy} from "react";
import SuspenseComponent from "@components/SuspenseComponent";

const UserLayout= lazy(() => import("@views-client/layout/UserLayout"));
const UserCenterLayout= lazy(() => import("@views-client/layout/UserCenterLayout"));
const UserStar= lazy(() => import("@views-client/user/user-center/star"));
const UserReserve= lazy(() => import("@views-client/user/user-center/reserve"));
const UserCenter= lazy(() => import("@views-client/user/user-center/center"));
const HousePublish = lazy(() => import("@views-client/user/public-manage/house-publish"));
const PublishManageLayout = lazy(() => import("@views-client/layout/PublishManageLayout"));
const ReserveManage = lazy(() => import("@views-client/user/public-manage/reserve-manage"));
const HouseManage = lazy(() => import("@views-client/user/public-manage/house-manage"));
const HouseEdit = lazy(() => import("@views-client/user/public-manage/houses-edit"));


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
            ]
        },
        {
            path: "/user/publish",
            component: SuspenseComponent(PublishManageLayout),
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
        }
    ]
}];
export default UserRoute;
