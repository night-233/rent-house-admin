import React from "react";
import Header from "@views/user-home/Header";
import SearchBox from "@views/user-home/SearchBox";
import SearchFilter from "@views/user-home/SearchFilter";
import styled from "styled-components";


/**
 * 客户端首页
 */
const UserHome = () => {

    return(
        <Container>
            <Header/>
            <ContentContainer>
                <SearchBox/>
                <SearchFilter/>
            </ContentContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    position: absolute;
    background: #FFFFFF;
    color: rgba(0,0,0,.6);
    font-size: 14px;
    min-height: 100%;
`;

const ContentContainer = styled.div`
    min-height: 200px;
    width: 1152px;
    margin: 110px auto 0;
`;



export default UserHome;
