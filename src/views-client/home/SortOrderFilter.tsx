import React from "react";
import styled from "styled-components";
import HouseSortComponent from "@components/HouseSortComponent";

/**
 * Created by Administrator on 2020/7/8
 */
const SortOrderFilter = (props) => {
    return (
        <Container>
            <HouseSortComponent {...props}/>
        </Container>
    )
};
const Container = styled.div`
     display: flex;
     border-bottom: 1px solid rgba(0,0,0,.06);
     justify-content: flex-end;
`;

export default SortOrderFilter;
