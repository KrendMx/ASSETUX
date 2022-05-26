import React from "react"
import styled from "styled-components"
import Link from "next/link"

import Logo from "./Logo"

const LogoLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
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

function TextLogo() {
  return (
    <Link href="/" passHref>
      <LogoLink>
        <Logo width={45} height={45} />
        <LogoText>
          <span>ASSET</span>
          <ColoredLogoText>UX</ColoredLogoText>
        </LogoText>
      </LogoLink>
    </Link>
  )
}

export default TextLogo
