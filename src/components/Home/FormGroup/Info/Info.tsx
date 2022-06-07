import React from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"

import { selectShowSkeleton } from "@/redux/ui/selectors"
import { useAppSelector } from "@/redux/hooks"

import AbsoluteSkeletonContainer from "@/shared/AbsoluteSkeletonContainer"
import {
  Container,
  TextColumn,
  ColoredSpan,
  SponsorsContainer,
  SkeletonContainer,
  SponsorContainer,
  Sponsors
} from "./styles"

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
            <Skeleton count={3} />
          </SkeletonContainer>
        )}
        {!showSkeleton && <h2>{t("info")}</h2>}
        {showSkeleton && (
          <SkeletonContainer as="h2">
            <Skeleton count={2} />
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
