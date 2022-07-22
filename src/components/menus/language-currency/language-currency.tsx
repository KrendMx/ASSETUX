import React from "react"
import { useTranslation } from "next-i18next"
import Container from "../container"
import Group from "./group"
import Social from "../social"
import Languages from "./languages"
import Currencies from "./currencies"

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
