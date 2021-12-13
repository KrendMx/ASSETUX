import React from "react"
import NavGroup from "./NavGroup"
import { useTranslation } from "next-i18next"
import { company, partners, legal, popular } from "@/src/routes"
import Container from "../Container"
import Social from "../Social"

function Menu() {
  const { t } = useTranslation("header")

  return (
    <Container>
      <ul>
        <li>
          <NavGroup title={t("company")} routes={company} />
        </li>
        <li>
          <NavGroup title={t("forPartners")} routes={partners} />
        </li>
        <li>
          <NavGroup title={t("popular")} routes={popular} />
        </li>
        <li>
          <NavGroup title={t("legal")} routes={legal} />
        </li>
      </ul>
      <Social />
    </Container>
  )
}

export default Menu
