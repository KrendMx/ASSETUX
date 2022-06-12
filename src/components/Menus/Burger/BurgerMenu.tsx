import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

import {
  setOrdersActive,
  setBurgerActive,
  setCurrentCurrency
} from "@/redux/ui"
import { setSelectedToken, swapAction } from "@/redux/crypto"
import {
  company,
  legal,
  popular,
  commerce,
  companyAbsolute,
  popularAbsolute
} from "@/utils/routes"
import { isCurrencyDeclared } from "@/utils/currencies"
import { logout, getEcommercePrefix } from "@/utils/helpers"
import config from "@/utils/config"

import NavGroup from "./NavGroup"
import NavLink from "../NavLink"
import MobileButton from "./MobileButton"
import Container from "../Container"
import Social from "../Social"

import type { Route } from "@/utils/routes"

function BurgerMenu() {
  const { t } = useTranslation("header")
  const dispatch = useAppDispatch()
  const router = useRouter()

  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )

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

    const splitted = route.key.split("to")

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
                  !config.isStage && (isCommercePage || isCommerceLogin)
                    ? companyAbsolute
                    : company
                }
              />
            </li>
            <li>
              {!config.isStage && (isCommercePage || isCommerceLogin) ? (
                <NavGroup title={t("popular")} routes={popularAbsolute} />
              ) : (
                <NavGroup
                  title={t("popular")}
                  routes={popular}
                  onClick={popularAction}
                />
              )}
            </li>
            <li>
              <NavGroup title={t("legal")} routes={legal} />
            </li>
            {!isCommerceLogin && (
              <li>
                {config.isStage ? (
                  <Link href="/profile" passHref>
                    <NavLink bold>{t("commerce")}</NavLink>
                  </Link>
                ) : (
                  <NavLink href="https://commerce.assetux.com" bold>
                    {t("commerce")}
                  </NavLink>
                )}
              </li>
            )}
          </>
        )}
        {isCommercePage && (
          <>
            {commerce.map((route) => (
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
