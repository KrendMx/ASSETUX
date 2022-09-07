import React, { useMemo } from "react"
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
import { env } from "@/lib/env/client.mjs"

import List from "./list"
import {
  Wrapper,
  Container,
  Group,
  IconElement,
  Bolder,
  StyledList
} from "./styles"

const PopularList: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )

  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)

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

    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth"
    })
  }

  return <List routes={popular(currentCurrency)} onClick={popularAction} />
}

type FooterProps = {
  hide: boolean
}

const Footer: React.FC<FooterProps> = ({ hide }) => {
  const isMobile = useImmediateMobile()
  const router = useRouter()
  const { t, i18n } = useTranslation("footer")
  const isRu = useMemo(() => i18n.language === "ru", [i18n])
  const isCommercePage = router.pathname.startsWith("/profile")
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  return (
    <Wrapper hide={hide}>
      <Container>
        <Group>
          <h3>{t("company")}</h3>
          <List
            routes={isCommercePage && !env.isStage ? companyAbsolute : company}
          />
        </Group>
        <Group>
          <h3>{t("popular")}</h3>
          {isCommercePage && !env.isStage ? (
            <List routes={popularAbsolute(currentCurrency)} />
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
              <a
                href={isRu ? "https://t.me/assetux" : "https://t.me/assetux_en"}
                target="__blank"
              >
                <Bolder>{t("footer:telegramChannel")}</Bolder>
                <br />
                {isRu ? "@assetux" : "@assetux_en"}
              </a>
            </IconElement>
            <IconElement iconPath="/social/telegram_white.svg">
              <a
                href={
                  isRu
                    ? "https://t.me/assetux_chat_ru"
                    : "https://t.me/assetux_chat"
                }
                target="__blank"
              >
                <Bolder>{t("footer:telegramChat")}</Bolder>
                <br />
                {isRu ? "@assetux_chat_ru" : "@assetux_chat"}
              </a>
            </IconElement>
            <IconElement iconPath="/social/twitter_white.svg">
              <a href={"https://twitter.com/assetux"} target="__blank">
                <Bolder>Twitter</Bolder>
                <br />
                @assetux
              </a>
            </IconElement>
            <IconElement iconPath="/social/linkedin_white.svg">
              <a
                href={"https://www.linkedin.com/company/assetux"}
                target="__blank"
              >
                <Bolder>LinkedIn</Bolder>
                <br />
                @assetux
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
              <a href="https://t.me/assetux_support" target="__blank">
                <Bolder>{t("footer:telegramGroup")}</Bolder>
                <br />
                @assetux_support
              </a>
            </IconElement>
            <IconElement
              iconPath={!isMobile ? "/social/email_white.svg" : null}
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
