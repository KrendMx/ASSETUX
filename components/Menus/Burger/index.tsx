import React from "react"
import { useTranslation } from "next-i18next"
import { useAppDispatch } from "@/src/redux/hooks"

import { setOrdersActive, setBurgerActive } from "@/src/redux/uiSlice"
import { company, legal, popular } from "@/src/routes"

import NavGroup from "./NavGroup"
import MobileButton from "./MobileButton"
import Container from "../Container"
import Social from "../Social"

function Menu() {
  const { t } = useTranslation("header")
  const dispatch = useAppDispatch()

  return (
    <Container>
      <ul>
        <li>
          <NavGroup title={t("company")} routes={company} />
        </li>
        <li>
          <NavGroup title={t("popular")} routes={popular} />
        </li>
        <li>
          <NavGroup title={t("legal")} routes={legal} />
        </li>
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
      </ul>
      <Social />
    </Container>
  )
}

export default Menu
