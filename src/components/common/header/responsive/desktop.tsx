import React from "react"
import styled, { css } from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setOrdersActive } from "@/lib/redux/ui"

import Container from "./container"
import Configure from "../configure"
import TextLogo from "@/components/common/text-logo"

import { commerce } from "@/lib/routes"
import { mobile } from "@/lib/data/constants"
import { logout, getEcommercePrefix } from "@/lib/utils/helpers"
import { env } from "@/lib/env/client.mjs"

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

const Desktop: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isTransferer = useAppSelector((state) => state.ui.isTransferer)
  const { t } = useTranslation("header")

  const isMainPage = router.pathname == "/"
  const isCommercePage =
    router.pathname.startsWith("/profile") &&
    router.pathname != "/profile/login"
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
              {commerce(isTransferer).map((route) => (
                <Link href={route.href} key={route.href} passHref>
                  <NavLink>{t(route.key)}</NavLink>
                </Link>
              ))}
              <NavLink
                as="button"
                onClick={() => {
                  logout()
                  router.push(`${getEcommercePrefix()}/login`)
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
          {!isCommercePage &&
            !isCommerceLogin &&
            (env.isStage ? (
              <Link href="/profile" passHref>
                <NavLink>{t("commerce")}</NavLink>
              </Link>
            ) : (
              <NavLink href={`${getEcommercePrefix()}/profile`}>
                {t("commerce")}
              </NavLink>
            ))}
        </NavContainer>
        <Configure />
      </RightContainer>
    </DesktopContainer>
  )
}

export default Desktop
