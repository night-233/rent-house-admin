
import React from 'react';
import Tools from '@utils/tools'
import styled from 'styled-components'
export default ({ name }) => {

  const config = Tools.calcUserIcon(name)
  console.log(config.name)
  return (
    <Avatar color={config.color}>
      {config.name}

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
  background: ${props => props.color};
`
