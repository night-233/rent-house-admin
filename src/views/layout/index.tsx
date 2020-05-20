

import React, { useState, Children } from 'react';
import Bottom from './bottom';
import { renderRoutes } from "react-router-config";
import Header from './header'

export default function Layout (props) {
  const { route } = props
  console.log(route)
  return (
    <>
      <Header></Header>
      {renderRoutes(route.routes)}
      <Bottom></Bottom>
    </>
  )
}