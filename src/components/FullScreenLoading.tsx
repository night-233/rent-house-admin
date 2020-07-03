import React from "react";
import {Spin} from "antd";
import styled from "styled-components";

/**
 * 全屏loading
 */
const FullScreenLoading = (props) => {

    const {loading = true, children} = props;

    return (
        <>
            {
                loading ?
                    <Container>
                        <Spin spinning={true} tip="努力加载中" />
                    </Container>
                    :
                    children
            }
        </>
    )
};

const Container = styled.div`
     height: 100%;
     width: 100%;
     position: absolute;
     display: flex;
     align-items: center;
     justify-content: center;
`;

export default FullScreenLoading;
