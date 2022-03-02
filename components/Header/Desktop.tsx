import React from "react"
import styled, { css } from "styled-components"
import Link from "next/link"
import { useTranslation } from "next-i18next"

import { useAppDispatch } from "@/src/redux/hooks"
import { setOrdersActive } from "@/src/redux/uiSlice"

import Container from "./Container"
import LanguageCurrencyChange from "./LanguageCurrencyChange"
import TextLogo from "@/shared/TextLogo"

import { mobile } from "@/src/constants"

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

type NavLinkProps = {
  as?: string
}

const NavLink = styled.a<NavLinkProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 40px;
  font-size: 0.95em;
  font-weight: 500;
  text-decoration: none;
  color: var(--black);

  ${(props) =>
    props.as == "button" &&
    css`
      background: transparent;
      cursor: pointer;
      border: none;
      outline: none;
    `}

  @media only screen and (max-width: 800px) {
    padding: 0 15px;
  }

  @media only screen and (max-width: 600px) {
    padding: 0 12px;
  }
`

function Desktop() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation("header")

  return (
    <DesktopContainer>
      <TextLogo link />
      <RightContainer>
        <NavContainer>
          {/* <Link href="/404" passHref>
            <NavLink>{t("swap")}</NavLink>
          </Link>
          <Link href="/404" passHref>
            <NavLink>{t("farms")}</NavLink>
          </Link>
          <Link href="/404" passHref>
            <NavLink>{t("blog")}</NavLink>
          </Link> */}
          <NavLink as="button" onClick={() => dispatch(setOrdersActive(true))}>
            My Operations
          </NavLink>
        </NavContainer>
        <LanguageCurrencyChange />
      </RightContainer>
    </DesktopContainer>
  )
}

export default Desktop
