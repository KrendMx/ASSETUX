import React from "react"
import styled from "styled-components"
import Wrapper from "@/shared/Headers/Wrapper"
import LanguageChange from "@/shared/Headers/LanguageChange"
import Image from "next/image"
import Link from "next/link"
import BurgerButton from "@/components/Burger/Button"

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--paddings);
`

const ImageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const LogoLink = styled.a`
  display: block;
  position: relative;
  width: 38px;
  height: 38px;
`

function MobileHeader() {
  return (
    <Wrapper>
      <Container>
        <LanguageChange />
        <ImageContainer>
          <Link href="/" passHref>
            <LogoLink>
              <Image
                src="/icons/icon_black.png"
                layout="fill"
                alt="Logo"
                quality={100}
              />
            </LogoLink>
          </Link>
        </ImageContainer>
        <BurgerButton />
      </Container>
    </Wrapper>
  )
}

export default MobileHeader
