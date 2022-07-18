import React from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { setCurrentCurrency } from "@/lib/redux/ui"
import { setSelectedToken, swapAction } from "@/lib/redux/crypto"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { useImmediateMobile } from "@/lib/hooks"

import {
  company,
  popular,
  legal,
  Route,
  companyAbsolute,
  popularAbsolute
} from "@/lib/routes"
import { isCurrencyDeclared } from "@/lib/data/currencies"
import config from "@/lib/config"

import List from "./List"
import {
  Wrapper,
  Container,
  Group,
  IconElement,
  Bolder,
  StyledList
} from "./styles"

function PopularList() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )

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

    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth"
    })
  }

  return <List routes={popular} onClick={popularAction} />
}

type FooterProps = {
  hide: boolean
}

function Footer({ hide }: FooterProps) {
  const isMobile = useImmediateMobile()
  const router = useRouter()
  const { t } = useTranslation("footer")

  const isCommercePage = router.pathname.startsWith("/profile")

  return (
    <Wrapper hide={hide}>
      <Container>
        <Group>
          <h3>{t("company")}</h3>
          <List
            routes={
              isCommercePage && !config.isStage ? companyAbsolute : company
            }
          />
        </Group>
        <Group>
          <h3>{t("popular")}</h3>
          {isCommercePage && !config.isStage ? (
            <List routes={popularAbsolute} />
          ) : (
            <PopularList />
          )}
        </Group>
        <Group>
          <h3>{t("legal")}</h3>
          <List routes={legal} />
        </Group>
        <Group>
          <h3>{t("social")}</h3>
          <StyledList>
            <IconElement iconPath="/social/telegram_white.svg">
              <a href="https://t.me/assetux">
                <Bolder>{t("footer:telegramChannel")}</Bolder>
                <br />
                @assetux
              </a>
            </IconElement>
            <IconElement iconPath="/social/telegram_white.svg">
              <a href="https://t.me/assetux_chat">
                <Bolder>{t("footer:telegramGroup")}</Bolder>
                <br />
                @assetux_chat
              </a>
            </IconElement>
          </StyledList>
        </Group>
        <Group>
          <h3>{t("support")}</h3>
          <StyledList>
            <IconElement
              iconPath={!isMobile ? "/social/telegram_white.svg" : null}
            >
              <a href="https://t.me/assetux_support">
                <Bolder>{t("footer:telegramChat")}</Bolder>
                <br />
                @assetux_support
              </a>
            </IconElement>
            <IconElement
              iconPath={!isMobile ? "/social/instagram_white.svg" : null}
            >
              <a href="mailto:support@assetux.com">
                <Bolder>E-mail</Bolder>
                <br />
                support@assetux.com
              </a>
            </IconElement>
          </StyledList>
        </Group>
      </Container>
    </Wrapper>
  )
}

export default Footer
