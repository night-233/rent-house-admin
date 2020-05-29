

import React, { useEffect } from 'react';
import Bottom from './bottom';
import { renderRoutes } from 'react-router-config'
import Header from './header'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '@/store/redux/user.redux'
import styled from 'styled-components'


const Layout = function Layout (props) {
  const { route } = props
  const dispatch = useDispatch()
  const location = useLocation()
  const currentTitle = route.routes.filter((item) => item.path === location.pathname)
  useEffect(() => {
    dispatch(getUserInfo())
  })
  return (
    <LayoutStyle>
      <Header></Header>
      <section className="main-content-box">
        <section className="nav-tip">{currentTitle?.length && currentTitle[0]?.meta?.title}</section>
        <section className="main-content">
          {renderRoutes(route.routes)}
        </section>
      </section>
      <Bottom></Bottom>
    </LayoutStyle>
  )
}

const LayoutStyle = styled.div`
  background: #f4f7ed;
.main-content-box {
  width: 80%;
  margin: auto;
  padding: 24px 0px;
  .nav-tip {
    color: #777;
    background-color: #f6f6f6;
    border-radius: 4px;
    box-shadow: 0 8px 12px 0 rgba(0,0,0,.12);
    width: 96%;
    min-height: 46px;
    display: block;
    padding: 0 30px;
    font-size: 16px;
    line-height: 46px;
    font-size: 18px;
    color: #888;
    margin: auto;
    background: #f9f9f9;
  }
  .main-content {
    padding: 30px;
    margin-top: -5px;
    width: 100%;
    background: #fff;
    min-height: calc(100vh - 150px);
    border-radius: 4px;
    border-color: #e3e3e3;
    text-align: center;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,.12);
  }
}
`
export default React.memo(Layout)