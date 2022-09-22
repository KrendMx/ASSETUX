import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Configure from '../configure'
import BurgerButton from './burger-button'
import Logo from '@/components/common/logo'

import { mobile } from '@/lib/data/constants'
import { useAppSelector } from '@/lib/redux/hooks'
import { env } from '@/lib/env/client.mjs'
import { Container } from './style'

const MobileContainer = styled(Container)`
  display: none;

  @media only screen and (max-width: ${mobile}px) {
    display: flex;
  }
`

const ImageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const LogoLink = styled.a`
  display: flex;
`

const Mobile = () => {
  const router = useRouter()
  const hideBurgerButton = useAppSelector((state) => state.ui.hideBurgerButton)
  const isCommercePage = router.pathname.startsWith('/profile')

  return (
    <MobileContainer>
      <Configure />
      <ImageContainer>
        {!env.isStage && isCommercePage ? (
          <LogoLink href="https://assetux.com">
            <Logo width={38} height={38} />
          </LogoLink>
        ) : env.isStage && isCommercePage ? (
          <LogoLink href="https://dev.assetux.com">
            <Logo width={38} height={38} />
          </LogoLink>
        ) : (
          <Link href="/" passHref>
            <LogoLink>
              <Logo width={38} height={38} />
            </LogoLink>
          </Link>
        )}
      </ImageContainer>
      {!hideBurgerButton && <BurgerButton />}
    </MobileContainer>
  )
}

export default Mobile
