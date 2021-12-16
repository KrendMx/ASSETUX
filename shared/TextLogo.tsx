import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { useAppSelector } from "@/src/redux/hooks"
import Skeleton from "react-loading-skeleton"

const LogoContainer = styled.div`
  display: block;
  width: 45px;
  height: 45px;
`

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

type TextLogoProps = {
  link: boolean
}

// TODO: доделать

function TextLogo({ link }: TextLogoProps) {
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)

  return (
    <Link href="/" passHref>
      <LogoLink>
        <LogoContainer>
          <Image
            src="/icons/icon_black.png"
            width={45}
            height={45}
            layout="responsive"
            alt="Logo"
            quality={100}
            priority
          />
        </LogoContainer>
        <LogoText>
          {appLoaded ? (
            <>
              <span>ASSET</span>
              <ColoredLogoText>UX</ColoredLogoText>
            </>
          ) : (
            <Skeleton width={90}/>
          )}
        </LogoText>
      </LogoLink>
    </Link>
  )
}

export default TextLogo
