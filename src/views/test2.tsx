import React from 'react';
import { renderRoutes } from "react-router-config";
import Loading from "@components/Loading";

function Test2 (props) {
  const { route } = props;

  return (
    <div style={{position: "absolute", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
    {/*  <span className="iconfont menu">&#xe65c;</span>
      <span className="title">WebApp1</span>
      <span className="iconfont search">&#xe62b;</span>
      {renderRoutes(route.routes)}*/}
      <Loading/>
    </div>
  )
}

export default React.memo(Test2);
