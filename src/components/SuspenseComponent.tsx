import React, {Suspense} from "react";
import styled from "styled-components";
import Loading from "@components/Loading";

/**
 * Created by Harry on 2020/7/28
 */
const SuspenseComponent =  Component => props => {

    return (
        <Suspense fallback={<div style={{position: "absolute", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Loading/>
        </div>}>
         <Component {...props}/>
        </Suspense>
    )
};


export default SuspenseComponent;
