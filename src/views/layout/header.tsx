import React, { useEffect } from 'react';
import styled from 'styled-components';
import style from '@assets/global-style';
import Avatar from '@/components/avatar'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Dropdown } from 'antd';
import cookie from '@utils/cookie';
import { useHistory } from 'react-router-dom'
import { loginOut } from '@/store/redux/user.redux';
import { NavLink } from 'react-router-dom'

function Header (props) {
  const user = useSelector(state => state.get('user'))
  const dispatch = useDispatch()
  const history = useHistory()
  console.log('user', user)
  const handleLoginOut = () => {
    cookie.removeCookie()
    dispatch(loginOut).then(() => {
      history.push('/login')
    })
  }
  const linkToUserInfo = () => history.push('/UserSetting')
  const menu = () => {
    return (
      <Menu>
        <Menu.Item className="menu-item" key="">
          <NavLink to="/UserSetting" >个人信息</NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item">
          <div onClick={handleLoginOut}>退出登录</div>
        </Menu.Item>
      </Menu>
    )
  };

  return (
    <Top>
      <div className="content-box">
        <section className="nav-List">
          <NavLink to="/home" className="nav-item add-new">房源<i className="iconfont iconadd"></i></NavLink>
          <NavLink to="/addHouse" className="nav-item add-new">新增<i className="iconfont iconadd"></i></NavLink>
        </section>
        <section className='user-block'>
          <Dropdown overlay={menu}>
            <div>
              <Avatar name={user.name || 'admin'}></Avatar>
            </div>
          </Dropdown>
        </section>
      </div>
    </Top>
  )
}


const Top = styled.div`
  padding: 5px 10px;
  text-align: center;
  background: #41989e;
  height: 56px;
  display: flex;
  color: #fff;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 6px 6px 0 rgba(0,0,0,.12);
  .nav-item {
    margin-right: 10px;
    position: relative;
    &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: #fff;
    border-radius: 1px;
    -webkit-transition: width .3s;
    transition: width .3s;
    will-change: width;
    }
    &:hover::after {
      width: 100%;
    }
  }
  .add-new {
    cursor: pointer;
  }
  .menu-item {
    &:hover {
      color: ${style["theme-color"]} !important;
    }
  }
  .content-box {
    display:flex;
    width: 80%;
    position: relative;
    margin: auto;
    align-items: center;
    justify-content: space-between;
    .user-block {
     
    }
  }
  
  `



export default React.memo(Header);