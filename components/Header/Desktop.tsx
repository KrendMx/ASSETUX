import React from "react"
import styled from "styled-components"
import Container from "./Container"
import LanguageCurrencyChange from "./LanguageCurrencyChange"
import Link from "next/link"
import TextLogo from "@/shared/TextLogo"
import { mobile } from "@/src/constants"
import { useTranslation } from "next-i18next"

const DesktopContainer = styled(Container)`
  @media only screen and (max-width: ${mobile}px) {
    display: none;
  }
`

const RightContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
`

const NavContainer = styled.nav`
  display: flex;
  height: 100%;
  flex-direction: row;
  margin-right: 32px;

  @media only screen and (max-width: 800px) {
    margin-right: 10px;
  }
`

const NavLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 40px;
  font-size: 0.95em;
  font-weight: 500;
  text-decoration: none;
  color: var(--black);

  @media only screen and (max-width: 800px) {
    padding: 0 15px;
  }

  @media only screen and (max-width: 600px) {
    padding: 0 12px;
  }
`

function Desktop() {
  const { t } = useTranslation("header")

  return (
    <DesktopContainer>
      <TextLogo link />
      <RightContainer>
        <NavContainer>
          <Link href="/404" passHref>
            <NavLink>{t("swap")}</NavLink>
          </Link>
          <Link href="/404" passHref>
            <NavLink>{t("farms")}</NavLink>
          </Link>
          <Link href="/404" passHref>
            <NavLink>{t("blog")}</NavLink>
          </Link>
        </NavContainer>
        <LanguageCurrencyChange />
      </RightContainer>
    </DesktopContainer>
  )
}

export default Desktop
