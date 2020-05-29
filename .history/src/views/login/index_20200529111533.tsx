
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import style from '@assets/global-style';
import { getLimits } from '@/store/redux/common.redux'
import LoginBlock from './login'
import Register from './register'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function Login () {
  const [block, setBlock] = useState('login')
  const dispatch = useDispatch()
  const limits = useSelector(state => state.common.limits)
  const changeBlock = (value) => {
    setBlock(value)
  }
  useEffect(() => {
    dispatch(getLimits())
  }, [dispatch])
  return (
    <Layout>
      <section className="login-box">
        <div className="threeD-txt threeD-txt--index-about"></div>
        <div className="root-wrap">
          {
            block === 'login' ? <LoginBlock goToRegister={changeBlock} limits={limits} /> : <Register goToLogin={changeBlock} limits={limits} />
          }
        </div>
      </section>

    </Layout>
  );
}

const Layout = styled.div`
  background: #f4f7ed;
  height: calc(100vh);
  display: flex;
  justify-content: center;
  position: relative;
  .register-form-button {
    margin-left: 10px;
  }
  .login-form-button {
    
  }
  .footer-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    width: 100%;
  }
  .threeD-txt:before {
    content: 'login in';
    text-shadow: 0 0 15px #658e8c;
    color: #8ddae0;
    position: absolute;
    z-index: -1;
    margin: -.1em 0 0;
    animation: skew 2s ease-in-out alternate infinite;
    transform-origin: bottom;
    box-sizing: border-box;
    transform-origin: left top;
    transition: all ease-out 0.3s;
  }
  .threeD-txt {
    font-family: Montserrat;
    font-weight: 700;
    position: absolute;
    text-align: center;
    font-size: 12em;
    color: rgba(249, 249, 249, .7);
    animation: rotate 2s ease-in-out alternate infinite;
    z-index: 0;
    transform: translateZ(-888px) !important;
    text-shadow: rgb(208, 230, 231) -1px 1px, rgb(208, 230, 231) -2px 2px, rgb(208, 230, 231) -3px 3px, rgb(208, 230, 231) -4px 4px, rgb(208, 230, 231) -5px 5px, rgb(208, 230, 231) -6px 6px, rgb(208, 230, 231) -7px 7px, rgb(208, 230, 231) -8px 8px, rgb(208, 230, 231) -9px 9px, rgb(189, 214, 218) -10px 10px 40px;
  }
  .threeD-txt--index-about {
    color: rgba(255, 255, 255, .8);
    animation: rotate-white 2s ease-in-out alternate infinite;
  }
  .threeD-txt--index-about {
    animation: rotate-white 1.5s ease-in-out alternate infinite;
    top: 70px;
    color: rgba(255, 255, 255, .8);
    position: absolute;
    text-transform: uppercase;
    left:50px;
    font-size: 8em;
  }
  @keyframes rotate-white {
    0% {
      transform: rotate3d(0, 1, .1, -10deg);
      text-shadow: 1px -1px #eeeef0, 2px -1px #eeeef0, 3px -2px #eeeef0, 4px -2px #eeeef0, 5px -3px #eeeef0, 6px -3px #eeeef0, 7px -4px #eeeef0, 8px -4px #eeeef0, 9px -5px #eeeef0, 10px -5px 40px rgba(204, 204, 204, .7);
    }
    100% {
      transform: rotate3d(0, 1, .1, 10deg);
      text-shadow: -1px -1px #eeeef0, -2px -1px #eeeef0, -3px -2px #eeeef0, -4px -2px #eeeef0, -5px -3px #eeeef0, -6px -3px #eeeef0, -7px -4px #eeeef0, -8px -4px #eeeef0, -9px -5px #eeeef0, -10px -5px 40px rgba(204, 204, 214, .7);
    }
  }
  .login-box {
    padding-top: 20px;
   .title {
     padding-top: 35px;
     text-align: center;
     font-size: 20px;
     margin-bottom: 24px;
     color: ${style["theme-color"]};
   }
   .register-btn {
     border: 1px solid red;
   }
  }
  .root-wrap {
    border-radius: 8px;
    width: 420px;
    padding-bottom: 48px;
    margin-top: 200px;
    /* background: ${style["theme-aniyu"]}; */
    background: #fff;
    box-shadow: 0 10px 30px 0 rgba(0,0,0,.05);
    &:hover {
  
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .login-block {
    text-align: center;
    display: flex;
    height: 100%;
    min-height: 150px;
    align-items: center;
    justify-content: center;
  }
  .submit-btn {
    border-radius: 8px;
    background: ${style["theme-apricot"]};
  }
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }`


export default React.memo(Login);
