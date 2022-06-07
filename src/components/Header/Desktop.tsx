import React from "react"
import styled, { css } from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { useAppDispatch } from "@/redux/hooks"
import { setOrdersActive } from "@/redux/ui"

import Container from "./Container"
import LanguageCurrencyChange from "./LanguageCurrencyChange"
import TextLogo from "@/shared/TextLogo"

import { commerce } from "@/utils/routes"
import { mobile } from "@/utils/constants"
import { logout } from "@/utils/helpers"

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
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { t } = useTranslation("header")

  const isMainPage = router.pathname == "/"
  const isCommercePage =
    router.pathname.startsWith("/profile") && !router.pathname.includes("login")
  const isCommerceLogin = router.pathname == "/profile/login"

  return (
    <DesktopContainer>
      <TextLogo />
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
          {isCommercePage && (
            <>
              {commerce.map((route) => (
                <Link href={route.href} key={route.href} passHref>
                  <NavLink>{t(route.key)}</NavLink>
                </Link>
              ))}
              <NavLink
                as="button"
                onClick={() => {
                  logout()
                  router.push("/profile/login")
                }}
              >
                {t("exit")}
              </NavLink>
            </>
          )}
          {isMainPage && (
            <NavLink
              as="button"
              onClick={() => dispatch(setOrdersActive(true))}
            >
              {t("header:operations")}
            </NavLink>
          )}
          {!isCommercePage && !isCommerceLogin && (
            <Link href="/profile" passHref>
              <NavLink>{t("commerce")}</NavLink>
            </Link>
          )}
        </NavContainer>
        <LanguageCurrencyChange />
      </RightContainer>
    </DesktopContainer>
  )
}

export default Desktop
