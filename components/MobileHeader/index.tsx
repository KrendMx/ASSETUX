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

const LogoLink = styled.a`
  display: block;
  position: relative;
  width: var(--header-height);
  height: var(--header-height);
`

function MobileHeader() {
  return (
    <Wrapper>
      <Container>
        <LanguageChange>EN</LanguageChange>
        <Link href="/" passHref>
          <LogoLink>
            <Image
              src="/icon_white.png"
              layout="fill"
              alt="Logo"
              quality={100}
            />
          </LogoLink>
        </Link>
        <BurgerButton />
      </Container>
    </Wrapper>
  )
}

export default MobileHeader
