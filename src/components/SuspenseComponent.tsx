import React, {Suspense} from "react";
import styled from "styled-components";
import Loading from "@components/Loading";

/**
 * Created by Harry on 2020/7/28
 */
const SuspenseComponent =  Component => props => {

    return (
        <Suspense fallback={<Loading/>}>
         <Component {...props}/>
        </Suspense>
    )
};


export default SuspenseComponent;
