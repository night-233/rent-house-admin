import React from 'react';
import { renderRoutes } from "react-router-config";

function Test2 (props) {
  const { route } = props;

  return (
    <div>
      <span className="iconfont menu">&#xe65c;</span>
      <span className="title">WebApp1</span>
      <span className="iconfont search">&#xe62b;</span>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default React.memo(Test2);