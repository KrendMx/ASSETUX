import React from "react"
import styled from "styled-components"
import Container from "./Container"
import LanguageCurrencyChange from "./LanguageCurrencyChange"
import Image from "next/image"
import BurgerButton from "../BurgerButton"
import Link from "next/link"
import { mobile } from "@/src/constants"

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
  display: block;
  width: 38px;
  height: 38px;

  & img:-moz-loading {
    visibility: hidden;
  }
`

function Mobile() {
  return (
    <MobileContainer>
      <LanguageCurrencyChange />
      <ImageContainer>
        <Link href="/" passHref>
          <LogoLink>
            <Image
              src="/icons/icon_black.png"
              layout="responsive"
              width={38}
              height={38}
              alt="Logo"
              quality={100}
              priority
            />
          </LogoLink>
        </Link>
      </ImageContainer>
      <BurgerButton />
    </MobileContainer>
  )
}

export default Mobile
