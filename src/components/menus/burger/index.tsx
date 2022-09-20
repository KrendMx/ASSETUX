import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  setOrdersActive,
  setBurgerActive,
  setCurrentCurrency
} from "@/lib/redux/ui"
import { setSelectedToken, swapAction } from "@/lib/redux/crypto"
import {
  company,
  legal,
  popular,
  commerce,
  companyAbsolute,
  popularAbsolute
} from "@/lib/routes"
import { isCurrencyDeclared } from "@/lib/data/currencies"
import { logout, getEcommercePrefix } from "@/lib/utils/helpers"
import { env } from "@/lib/env/client.mjs"

import NavGroup from "./group"
import NavLink from "../common/nav-link"
import Container from "../common/container"
import Social from "../common/social"

import type { Route } from "@/lib/routes"

const MobileButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: flex-star5t;
  align-items: center;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px 0;
  color: var(--black);
  font-weight: 700;
  font-size: 1.7em;
`

const BurgerMenu: React.FC = () => {
  const { t } = useTranslation("header")
  const dispatch = useAppDispatch()
  const router = useRouter()
  const merchantMode = useAppSelector((state) => state.ui.merchantMode)
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const isMainPage = router.pathname == "/"
  const isCommercePage =
    router.pathname.startsWith("/profile") &&
    router.pathname != "/profile/login"
  const isCommerceLogin = router.pathname == "/profile/login"

  const popularAction = (route: Route) => {
    if (router.pathname != "/") {
      router.push("/", undefined, {
        shallow: false,
        scroll: false
      })
    }

    const splitted = route.key.split(" to ")

    if (splitted.length != 2) {
      return
    }

    const currency = splitted[0]
    const tokenSymbol = splitted[1].toLowerCase()

    if (isCurrencyDeclared(currency)) {
      dispatch(setCurrentCurrency(currency))
    }

    const foundToken = availableTokens?.find(
      (token) => token.symbol.toLowerCase() == tokenSymbol
    )

    if (foundToken) {
      dispatch(setSelectedToken(foundToken))
    }

    dispatch(swapAction("BUY"))

    dispatch(setBurgerActive(false))

    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <Container>
      <ul>
        {!isCommercePage && (
          <>
            <li>
              <NavGroup
                title={t("company")}
                routes={
                  !env.isStage && (isCommercePage || isCommerceLogin)
                    ? companyAbsolute
                    : company
                }
              />
            </li>
            <li>
              {!env.isStage && (isCommercePage || isCommerceLogin) ? (
                <NavGroup
                  title={t("popular")}
                  routes={popularAbsolute(currentCurrency)}
                />
              ) : (
                <NavGroup
                  title={t("popular")}
                  routes={popular(currentCurrency)}
                  onClick={popularAction}
                />
              )}
            </li>
            <li>
              <NavGroup title={t("legal")} routes={legal} />
            </li>
            {!isCommerceLogin && (
              <li>
                {env.isStage ? (
                  <Link
                    href={
                      process.env.NODE_ENV == "development"
                        ? "/profile"
                        : "https://commerce.dev.assetux.com/profile"
                    }
                    passHref
                  >
                    <NavLink bold>{t("commerce")}</NavLink>
                  </Link>
                ) : (
                  <NavLink
                    href={
                      process.env.NODE_ENV == "development"
                        ? "/profile"
                        : "https://commerce.assetux.com/profile"
                    }
                    bold
                  >
                    {t("commerce")}
                  </NavLink>
                )}
              </li>
            )}
          </>
        )}
        {isCommercePage && merchantMode && (
          <>
            {commerce(merchantMode).map((route) => (
              <li key={route.key}>
                <Link href={route.href} passHref>
                  <NavLink bold>{t(route.key)}</NavLink>
                </Link>
              </li>
            ))}
            <li>
              <NavLink
                as="button"
                bold
                onClick={() => {
                  logout()
                  router.push(`${getEcommercePrefix()}/login`)
                }}
              >
                {t("exit")}
              </NavLink>
            </li>
          </>
        )}
        {isMainPage && (
          <li>
            <MobileButton
              onClick={() => {
                dispatch(setOrdersActive(true))
                dispatch(setBurgerActive(false))
              }}
            >
              {t("header:operations")}
            </MobileButton>
          </li>
        )}
      </ul>
      <Social />
    </Container>
  )
}

export default BurgerMenu
