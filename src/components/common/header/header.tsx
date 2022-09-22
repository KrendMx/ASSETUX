import React from 'react'

import Desktop from './responsive/desktop'
import Mobile from './responsive/mobile'
import { Wrapper, OuterContainer } from './styles'

const Header = () => {
  return (
    <Wrapper>
      <OuterContainer>
        <Desktop />
        <Mobile />
      </OuterContainer>
    </Wrapper>
  )
}

export default Header
