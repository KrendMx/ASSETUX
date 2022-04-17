import React from "react"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import Skeleton from "react-loading-skeleton"

import { selectShowSkeleton } from "@/src/redux/uiSlice/selectors"
import { useAppSelector } from "@/src/redux/hooks"
import useSliderConfig from "../sliderConfig"

import Slider from "@/shared/Slider"
import Element from "./Element"
import { Container, MoreLink, Row, SliderContainer } from "./styles"

import type { NewsData } from "@/src/BackendClient/types"

type NewsRoomProps = {
  news: NewsData[]
}

function NewsRoom({ news }: NewsRoomProps) {
  const { t } = useTranslation("news")

  const showSkeleton = useAppSelector(selectShowSkeleton)
  const sliderConfig = useSliderConfig()

  return (
    <Container>
      <Row>
        <h3>{!showSkeleton ? t("title") : <Skeleton />}</h3>
        {!showSkeleton && (
          <Link href="/news" passHref>
            <MoreLink as="a">{t("showMore")}</MoreLink>
          </Link>
        )}
      </Row>
      <SliderContainer>
        <Slider {...sliderConfig}>
          {news.map(({ id, ...data }) => (
            <Element key={id} {...data} />
          ))}
        </Slider>
      </SliderContainer>
    </Container>
  )
}

export default NewsRoom
