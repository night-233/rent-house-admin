import React, { useEffect } from 'react';
import styled from 'styled-components';
import style from '@assets/global-style';
import { useSelector, useDispatch } from 'react-redux'
function Header (props) {
  const test = useSelector(state => state.get('user'))
  useEffect(() => {
    console.log('da', test)
  })
  return (
    <div>
      <Top>

      </Top>
    </div>
  )
}

const Top = styled.div`
  padding: 5px 10px;
  text-align: center;
  background: ${style["theme-color"]};
  min-height: 50px;
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }`



export default React.memo(Header);