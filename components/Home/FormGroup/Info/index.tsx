import React from "react"
import styled from "styled-components"
import Image from "next/image"
import { useTranslation } from "next-i18next"
import ColoredSpan from "./ColoredSpan"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 90px;

  @media only screen and (max-width: 960px) {
    gap: 30px;
  }
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

const Companies = styled.div`
  position: relative;
`

const ImageContainer = styled.div`
  position: relative;
  flex: 0 0 116px;
  height: 30px;
`

const AbsoluteContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
`

function Info() {
  const { t } = useTranslation("home")

  return (
    <Container>
      <TextColumn>
        <h1>
          {t("titleBeforeBuy")}{" "}
          <ColoredSpan color="green">{t("buy")}</ColoredSpan>{" "}
          {t("titleAfterBuy")}{" "}
          <ColoredSpan color="red">{t("sell")}</ColoredSpan>{" "}
          {t("titleAfterSell")}
        </h1>
        <span>{t("info")}</span>
      </TextColumn>
      {/* <Companies>
        <AbsoluteContainer>
          <ImageContainer>
            <Image
              src="/binance.png"
              layout="fill"
              alt="BINANCE CHAIN"
            />
          </ImageContainer>
          <ImageContainer>
            <Image
              src="/avalanche.png"
              layout="fill"
              alt="AVALANCHE"
            />
          </ImageContainer>
          <ImageContainer>
            <Image
              src="/fantom.png"
              layout="fill"
              alt="fantom"
            />
          </ImageContainer>
        </AbsoluteContainer>
      </Companies> */}
    </Container>
  )
}

export default Info
