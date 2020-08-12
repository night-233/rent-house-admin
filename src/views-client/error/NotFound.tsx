import React from "react";
import styled from "styled-components";
import NotFoundPng from "@assets/img/404.jpg";
import {Button, Result} from "antd";
import {useHistory} from "react-router";

/**
 * 404 页面
 */
const NotFound = () => {

    const history = useHistory();

    return (
        <Container>
            <Result
                status="404"
                title="404"
                style={{marginTop: "5%"}}
                subTitle="很抱歉您访问的页面不存在或已被删除"
                extra={
                    <div>
                        <Button type="primary" style={{...buttonStyle, marginRight: 20}} onClick={() => history.go(-1)}>返回上一页</Button>
                        <Button type="primary" style={buttonStyle} onClick={() => history.push("/client/home")}>去网站首页</Button>
                    </div>
                    }/>
        </Container>
    )
};
const buttonStyle = {
    height: 45,
    width: 185,
    borderRadius: 5
};
const Container = styled.div`
    text-align: center;
    font-size: 16px;
    .img{
        width: 486px;
        height: 237px;
        margin: 5% auto;
    }
`;

export default NotFound;
