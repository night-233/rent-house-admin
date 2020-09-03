import React from "react";
import styled from "styled-components";
import NotFoundPng from "@assets/img/404.jpg";
import {Button, Result} from "antd";
import {useHistory} from "react-router";

/**
 * 404 页面
 */
const ErrorPage = ({code = 404}: {code: (403 |404 | 500)}) => {

    const history = useHistory();

    return (
        <Container>
            <Result
                status={code}
                title={code}
                style={{marginTop: "5%"}}
                subTitle={errorCodeMap[code]}
                extra={
                    <div>
                        <Button type="primary" style={{...buttonStyle, marginRight: 20}} onClick={() => history.go(-1)}>返回上一页</Button>
                        <Button type="primary" style={buttonStyle} onClick={() => history.push("/client/home")}>去网站首页</Button>
                    </div>
                    }/>
        </Container>
    )
};
const errorCodeMap = {
    404: "很抱歉您访问的页面不存在或已被删除",
    403: "很抱歉， 您无权访问该页面",
    500: "很抱歉， 服务器发生了一些小故障",
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

export default ErrorPage;
