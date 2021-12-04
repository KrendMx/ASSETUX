import React from "react"
import styled from "styled-components"
import { company, partners, popular, legal } from "@/src/routes"
import { useTranslation } from "next-i18next"
import List from "./List"
import StyledList from "./StyledList"
import IconElement from "./IconElement"
import { useAppSelector } from "@/src/redux/hooks"

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

  @media only screen and (max-width: 750px) {
    grid-template-columns: repeat(3, auto);
    justify-content: space-between;
    padding: 26px var(--paddings);
    row-gap: 25px;
  }

  @media only screen and (max-width: 550px) {
    padding-bottom: 45px;
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

  @media only screen and (max-width: 750px) {
    & > h3 {
      margin-bottom: 5px;
    }
  }

  @media only screen and (max-width: 550px) {
    & > h3 {
      font-size: 1.1em;
    }
  }

  @media only screen and (max-width: 380px) {
    font-size: 0.8rem;
  }
`

const Bolder = styled.span`
  font-weight: 700;
`

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
          <h3>{t("forPartners")}</h3>
          <List routes={partners} />
        </Group>
        <Group>
          <h3>{t("popular")}</h3>
          <List routes={popular} />
        </Group>
        <Group>
          <h3>{t("legal")}</h3>
          <List routes={legal} mobileSmall />
        </Group>
        <Group>
          <h3>{t("social")}</h3>
          <StyledList>
            <IconElement iconPath="/telegram_white.svg">
              <span>
                <Bolder>Telegram channel</Bolder>
                <br />
                @assetux
              </span>
            </IconElement>
            <IconElement iconPath="/instagram_white.svg">
              <span>
                <Bolder>Instagram page</Bolder>
                <br />
                @assetux
              </span>
            </IconElement>
            <IconElement iconPath="/facebook_white.svg">
              <span>
                <Bolder>Facebook page</Bolder>
                <br />
                @assetux
              </span>
            </IconElement>
          </StyledList>
        </Group>
        <Group>
          <h3>{t("support")}</h3>
          <StyledList>
            <IconElement iconPath={!isMobile ? "/telegram_white.svg" : null}>
              <span>
                <Bolder>Telegram chat</Bolder>
                <br />
                @assetux_support
              </span>
            </IconElement>
            <IconElement iconPath={!isMobile ? "/instagram_white.svg" : null}>
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
