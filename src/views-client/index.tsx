import React, {useEffect} from "react";
import styled from "styled-components";
import {getLimits} from "@store/redux/common.redux";
import routes from "@router";
import renderRoutes from "@/router/routingGuard";
import {useDispatch} from 'react-redux'

const authPath = '/login';
/**
 * Created by Administrator on 2020/8/9
 */
const PageIndex = () => {

    // 获取限制条件
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLimits());
    }, []);

    return (
        <Container>
            {renderRoutes(routes, authPath)}
        </Container>
    )
};
const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
`;

export default PageIndex;
