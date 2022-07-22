import React, { useState } from "react"
import { useTranslation } from "next-i18next"

import Container from "../common/container"
import Social from "../common/social"
import NavButton from "../common/nav-button"
import Languages from "./items/languages"
import Currencies from "./items/currencies"

type NavGroupProps = {
  title: string
  children: JSX.Element
}

const Group: React.FC<NavGroupProps> = ({ title, children }) => {
  const [active, setActive] = useState(true)

  return (
    <>
      <NavButton
        active={active}
        title={title}
        onClick={() => setActive(!active)}
      />
      {active && children}
    </>
  )
}

const Configure: React.FC = () => {
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

export default Configure
