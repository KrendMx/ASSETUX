import React from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import ColoredSpan from "./ColoredSpan"
import Image from "next/image"
import { useAppSelector } from "@/src/redux/hooks"
import Skeleton from "react-loading-skeleton"
import { mobile, mobileLaoyutForTablet } from "@/src/constants"

const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  margin-top: 110px;

  & > *:not(:last-child) {
    margin-bottom: 90px;
  }

  @media only screen and (max-width: 1340px) {
    & > *:not(:last-child) {
      margin-bottom: 50px;
    }
  }

  @media only screen and (max-width: ${mobileLaoyutForTablet}px) {
    width: 405px;
    margin-top: 0;

    & > *:not(:last-child) {
      margin-bottom: 30px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    width: 100%;

    & > *:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`

const TextColumn = styled.div`
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;

  & > h1 {
    margin-bottom: 25px;
  }

  & > h2 {
    font-size: 1.1em;
    color: var(--gray);
    font-weight: 400;
  }

  @media only screen and (max-width: ${mobileLaoyutForTablet}px) {
    & > h1 {
      margin-bottom: 15px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    & > h1 {
      margin-bottom: 25px;
    }
  }
`

const Sponsors = styled.div`
  width: 75%;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 15px;
  }

  @media only screen and (max-width: 1130px) {
    width: 70%;
  }

  @media only screen and (max-width: ${mobileLaoyutForTablet}px) {
    width: 100%;
  }
`

const SponsorContainer = styled.div`
  flex: 1 1 auto;
`

const SkeletonHeader = styled.h1`
  width: 75%;

  @media only screen and (max-width: ${mobileLaoyutForTablet}px) {
    width: 100%;
  }
`

function Info() {
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)
  const { t } = useTranslation("home")

  return (
    <Container>
      <TextColumn>
        {appLoaded && (
          <h1>
            {t("titleBeforeBuy")}{" "}
            <ColoredSpan colorIn="green">{t("buy")}</ColoredSpan>
            <br />
            {t("titleAfterBuy")}{" "}
            <ColoredSpan colorIn="red">{t("sell")}</ColoredSpan>{" "}
            {t("titleAfterSell")}
          </h1>
        )}
        {!appLoaded && (
          <SkeletonHeader>
            <Skeleton count={2} />
          </SkeletonHeader>
        )}
        {appLoaded && <h2>{t("info")}</h2>}
        {!appLoaded && (
          <SkeletonHeader as="h2">
            <Skeleton count={1} />
          </SkeletonHeader>
        )}
      </TextColumn>
      <Sponsors>
        <SponsorContainer>
          <Image
            src="/sponsors/binance.png"
            width={383}
            height={79}
            alt="BINANCE CHAIN"
          />
        </SponsorContainer>
        <SponsorContainer>
          <Image
            src="/sponsors/avalanche.png"
            width={349}
            height={64}
            alt="AVALANCHE"
          />
        </SponsorContainer>
        <SponsorContainer>
          <Image
            src="/sponsors/fantom.png"
            width={210}
            height={56}
            alt="fantom"
          />
        </SponsorContainer>
      </Sponsors>
    </Container>
  )
}

export default Info
