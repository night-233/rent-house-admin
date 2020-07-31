import React from "react";
import styled from "styled-components";
import renderRoutes from "@router/routingGuard";

/**
 * 客户端布局
 */
const ClientLayout = (props) => {

    const {route} = props;
    return (
        <Container>
            {renderRoutes(route.routes)}
        </Container>
    )
};
const Container = styled.div`
    width: 100%;
    position: absolute;
    background: #FFFFFF;
    color: rgba(0,0,0,.6);
    font-size: 14px;
    min-height: 100%;
    padding-left: calc(100vw - 100%);
`;

export default ClientLayout;
