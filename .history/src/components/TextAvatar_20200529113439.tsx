
import React from 'react';
import Tools from '@utils/tools'
import styled from 'styled-components'
export default ({ name, avatar, width = "32" }) => {
  const config = Tools.calcUserIcon(name)
  const style = {
    width: `${width}px`,
    height: `${width}px`,
    lineHeight: `${width}px`
  }
  return (
    <Avatar color={config.color} style={style}>
      {avatar ? <img src={avatar} style={style} /> : config.name}
    </Avatar>
  )
}

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display:flex;
  align-items:center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
  margin-right: 15px;
  text-transform: capitalize;
  background: ${props => props.color};
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`
