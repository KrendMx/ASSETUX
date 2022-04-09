import React from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"

import {
  setOrdersActive,
  setBurgerActive,
  setCurrentCurrency
} from "@/src/redux/uiSlice"
import { setSelectedToken, swapAction } from "@/src/redux/cryptoSlice"
import { company, legal, popular } from "@/src/routes"
import { isCurrencyDeclared } from "@/src/currencies"

import NavGroup from "./NavGroup"
import MobileButton from "./MobileButton"
import Container from "../Container"
import Social from "../Social"

import type { Route } from "@/src/routes"

function Menu() {
  const { t } = useTranslation("header")
  const dispatch = useAppDispatch()
  const router = useRouter()

  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )

  const isMainPage = router.pathname == "/"

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
        <li>
          <NavGroup title={t("company")} routes={company} />
        </li>
        <li>
          <NavGroup
            title={t("popular")}
            routes={popular}
            onClick={popularAction}
          />
        </li>
        <li>
          <NavGroup title={t("legal")} routes={legal} />
        </li>
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

export default Menu
