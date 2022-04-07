import React from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"

import { selectShowSkeleton } from "@/src/redux/uiSlice"
import { useAppSelector } from "@/src/redux/hooks"
import { mobile, mobileLayoutForTablet } from "@/src/constants"

import ColoredSpan from "./ColoredSpan"

const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  margin-top: 110px;
  width: 100%;

  & > *:not(:last-child) {
    margin-bottom: 90px;
  }

  @media only screen and (max-width: 1340px) {
    & > *:not(:last-child) {
      margin-bottom: 50px;
    }
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
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

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
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

const SponsorsContainer = styled.div`
  width: 75%;
  position: relative;

  @media only screen and (max-width: 1130px) {
    width: 70%;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 100%;
  }
`

type SponsorsProps = {
  isLoading: boolean
}

const Sponsors = styled.div<SponsorsProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  visibility: ${(props) => (props.isLoading ? "hidden" : "visible")};

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`

const SponsorContainer = styled.div`
  flex: 1 1 auto;
`

const SkeletonContainer = styled.h1`
  width: 75%;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 100%;
  }
`

const AbsoluteSkeletonContainer = styled(SkeletonContainer).attrs({
  as: "div"
})`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

function Info() {
  const router = useRouter()
  const showSkeleton = useAppSelector(selectShowSkeleton)
  const { t } = useTranslation("home")

  return (
    <Container>
      <TextColumn>
        {!showSkeleton && (
          <h1>
            {t("titleBeforeBuy")}{" "}
            <ColoredSpan colorIn="green">{t("buy")}</ColoredSpan>
            {router.locale != "ru" ? <br /> : " "}
            {t("titleAfterBuy")}{" "}
            <ColoredSpan colorIn="red">{t("sell")}</ColoredSpan>{" "}
            {t("titleAfterSell")}
          </h1>
        )}
        {showSkeleton && (
          <SkeletonContainer>
            <Skeleton count={2} />
          </SkeletonContainer>
        )}
        {!showSkeleton && <h2>{t("info")}</h2>}
        {showSkeleton && (
          <SkeletonContainer as="h2">
            <Skeleton count={1} />
          </SkeletonContainer>
        )}
      </TextColumn>
      <SponsorsContainer>
        <Sponsors isLoading={showSkeleton}>
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
        {showSkeleton && (
          <AbsoluteSkeletonContainer>
            <Skeleton height={20} />
          </AbsoluteSkeletonContainer>
        )}
      </SponsorsContainer>
    </Container>
  )
}

export default Info
