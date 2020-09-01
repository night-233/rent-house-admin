import React from "react";
import {Spin} from "antd";
import styled from "styled-components";
import Loading from "@components/Loading";

/**
 * 全屏loading
 */
const FullScreenLoading = (props) => {

    const {loading = true, children} = props;

    return (
        <>
            {
                loading &&
                    <Container>
                        <Loading/>
                    </Container>
            }
            {
                <div style={{display: loading ? "hidden" : "block"}}>{children}</div>
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
