import React from "react"
import { useTranslation } from "next-i18next"
import Container from "../Container"
import Group from "./Group"
import Social from "../Social"
import Languages from "./Languages"
import Currencies from "./Currencies"

function LanguageCurrencyMenu() {
  const { t } = useTranslation("header")

  return (
    <Container>
      <ul>
        <li>
          <Group title={t("language")}>
            <Languages />
          </Group>
        </li>
        {/* <li>
          <Group title={t("currency")}>
            <Currencies />
          </Group>
        </li> */}
      </ul>
      <Social />
    </Container>
  )
}

export default LanguageCurrencyMenu
