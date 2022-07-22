import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"

import Logo from "./logo"
import config from "@/lib/config"

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

const Content: React.FC = () => (
  <>
    <Logo width={45} height={45} />
    <LogoText>
      <span>ASSET</span>
      <ColoredLogoText>UX</ColoredLogoText>
    </LogoText>
  </>
)

const TextLogo: React.FC = () => {
  const router = useRouter()
  const isCommercePage = router.pathname.startsWith("/profile")

  return !config.isStage && isCommercePage ? (
    <LogoLink href="https://assetux.com">
      <Content />
    </LogoLink>
  ) : (
    <Link href="/" passHref>
      <LogoLink>
        <Content />
      </LogoLink>
    </Link>
  )
}

export default TextLogo
