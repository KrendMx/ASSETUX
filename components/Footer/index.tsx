import React from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { setCurrentCurrency } from "@/src/redux/uiSlice"
import { setSelectedToken, swapAction } from "@/src/redux/cryptoSlice"
import { company, popular, legal, Route } from "@/src/routes"
import { useTranslation } from "next-i18next"
import List from "./List"
import StyledList from "./StyledList"
import IconElement from "./IconElement"
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { mobile } from "@/src/constants"
import { isCurrencyDeclared } from "@/src/currencies"

type WrapperProps = {
  hide: boolean
}

const Wrapper = styled.footer<WrapperProps>`
  background-color: var(--black);
  display: ${(props) => (props.hide ? "none" : "block")};
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  justify-content: space-between;
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 97px var(--paddings);

  @media only screen and (max-width: 650px) {
    grid-template-columns: repeat(6, auto);
    justify-content: space-between;
    padding: 26px var(--paddings);
    row-gap: 25px;

    & > *:nth-child(-n + 3) {
      grid-column: span 2;
    }

    & > *:nth-last-child(2) {
      grid-row-start: 2;
      grid-column: 1 / 4;
    }

    & > *:nth-last-child(1) {
      grid-row-start: 2;
      grid-column: 5 / 6;
    }
  }

  @media only screen and (max-width: 650px) {
    padding-bottom: 90px;
  }
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--white);
  font-size: 1rem;

  & > h3 {
    color: #6e6e73;
    font-weight: 600;
    font-size: 1em;
    margin-bottom: 23px;
  }

  @media only screen and (max-width: 650px) {
    & > h3 {
      margin-bottom: 5px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    & > h3 {
      font-size: 1.1em;
    }
  }

  @media only screen and (max-width: 380px) {
    font-size: 0.8rem;
  }

  @media only screen and (max-width: 310px) {
    font-size: 0.7rem;
  }
`

const Bolder = styled.span`
  font-weight: 700;
`

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
  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const { t } = useTranslation("footer")

  return (
    <Wrapper hide={hide}>
      <Container>
        <Group>
          <h3>{t("company")}</h3>
          <List routes={company} />
        </Group>
        <Group>
          <h3>{t("popular")}</h3>
          <PopularList />
        </Group>
        <Group>
          <h3>{t("legal")}</h3>
          <List routes={legal} />
        </Group>
        <Group>
          <h3>{t("social")}</h3>
          <StyledList>
            <IconElement iconPath="/social/telegram_white.svg">
              <span>
                <Bolder>{t("footer:telegramChannel")}</Bolder>
                <br />
                @assetux
              </span>
            </IconElement>
            <IconElement iconPath="/social/telegram_white.svg">
              <span>
                <Bolder>{t("footer:telegramGroup")}</Bolder>
                <br />
                @assetuxchat
              </span>
            </IconElement>
          </StyledList>
        </Group>
        <Group>
          <h3>{t("support")}</h3>
          <StyledList>
            <IconElement
              iconPath={!isMobile ? "/social/telegram_white.svg" : null}
            >
              <span>
                <Bolder>{t("footer:telegramChat")}</Bolder>
                <br />
                @assetux_support
              </span>
            </IconElement>
            <IconElement
              iconPath={!isMobile ? "/social/instagram_white.svg" : null}
            >
              <span>
                <Bolder>E-mail</Bolder>
                <br />
                support@assetux.com
              </span>
            </IconElement>
          </StyledList>
        </Group>
      </Container>
    </Wrapper>
  )
}

export default Footer
