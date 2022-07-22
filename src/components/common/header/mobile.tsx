import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"

import Container from "./container"
import LanguageCurrencyChange from "./language-currency-change"
import BurgerButton from "./burger-button"
import Logo from "@/shared/Logo"

import { mobile } from "@/lib/data/constants"
import { useAppSelector } from "@/lib/redux/hooks"
import config from "@/lib/config"

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

function Mobile() {
  const router = useRouter()
  const hideBurgerButton = useAppSelector((state) => state.ui.hideBurgerButton)
  const isCommercePage = router.pathname.startsWith("/profile")

  return (
    <MobileContainer>
      <LanguageCurrencyChange />
      <ImageContainer>
        {!config.isStage && isCommercePage ? (
          <LogoLink href="https://assetux.com">
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
