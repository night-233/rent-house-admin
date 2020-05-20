import React from 'react';
import { renderRoutes } from "react-router-config";

function Home (props) {
  return (
    <div>
      this is homePage
    </div>
  )
}

export default React.memo(Home);