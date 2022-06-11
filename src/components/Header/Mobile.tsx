import React from "react"
import styled from "styled-components"
import Link from "next/link"

import Container from "./Container"
import LanguageCurrencyChange from "./LanguageCurrencyChange"
import BurgerButton from "../BurgerButton"
import Logo from "@/shared/Logo"

import { mobile } from "@/utils/constants"
import { useAppSelector } from "@/redux/hooks"
import config from "@/utils/config"

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
  const hideBurgerButton = useAppSelector((state) => state.ui.hideBurgerButton)

  return (
    <MobileContainer>
      <LanguageCurrencyChange />
      <ImageContainer>
        {config.isStage ? (
          <Link href="/" passHref>
            <LogoLink>
              <Logo width={38} height={38} />
            </LogoLink>
          </Link>
        ) : (
          <LogoLink href="https://assetux.com">
            <Logo width={38} height={38} />
          </LogoLink>
        )}
      </ImageContainer>
      {!hideBurgerButton && <BurgerButton />}
    </MobileContainer>
  )
}

export default Mobile
