import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"

const LogoContainer = styled.div`
  display: block;
  position: relative;
  width: 73px;
  height: 73px;
`

const LogoLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
`

const LogoText = styled.span`
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 400;
  color: #444444;
`

const ColoredLogoText = styled.span`
  color: #191919;
`

type TextLogoProps = {
  link: boolean
}

function TextLogo({ link }: TextLogoProps) {
  return (
    <Link href="/" passHref>
      <LogoLink>
        <LogoContainer>
          <Image src="/icon_white.png" layout="fill" alt="Logo" quality={100} />
        </LogoContainer>
        <LogoText>
          ASSET<ColoredLogoText>UX</ColoredLogoText>
        </LogoText>
      </LogoLink>
    </Link>
  )
}

export default TextLogo
