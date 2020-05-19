import React from 'react';
import { renderRoutes } from "react-router-config";
import { Top } from './style';

function Home (props) {
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="title">欢迎来到租房管理系统 ：）</span>
      </Top>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default React.memo(Home);