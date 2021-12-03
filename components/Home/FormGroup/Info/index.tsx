import React from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import ColoredSpan from "./ColoredSpan"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const TextColumn = styled.div`
  & > h1 {
    margin: 25px 0;
  }

  & > span {
    font-size: 1.1em;
    color: var(--gray);
  }

  @media only screen and (max-width: 960px) {
    & > h1 {
      margin: 15px 0;
    }
  }
`

function Info() {
  const { t } = useTranslation("home")

  return (
    <Container>
      <TextColumn>
        <h1>
          {t("titleBeforeBuy")}{" "}
          <ColoredSpan color="green">{t("buy")}</ColoredSpan><br />
          {t("titleAfterBuy")}{" "}
          <ColoredSpan color="red">{t("sell")}</ColoredSpan>{" "}
          {t("titleAfterSell")}
        </h1>
        <span>{t("info")}</span>
      </TextColumn>
    </Container>
  )
}

export default Info
