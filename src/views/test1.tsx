import React from 'react';
import { renderRoutes } from "react-router-config";

function Test1 (props) {
  const { route } = props;

  return (
    <div>
      {/* <span className="iconfont menu">&#xe65c;</span> */}
      <span className="title">xxixiix</span>
      {/* <span className="iconfont search">&#xe62b;</span> */}
      {/* {renderRoutes(route.routes)} */}
    </div>
  )
}

export default React.memo(Test1);