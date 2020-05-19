import styled from 'styled-components';
import style from '@assets/global-style'

export const Top = styled.div`
  padding: 5px 10px;
  text-align: center;
  background: ${style["theme-color"]};
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`
