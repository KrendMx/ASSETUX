import React from "react"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import Skeleton from "react-loading-skeleton"

import { selectShowSkeleton } from "@/redux/ui/selectors"
import { useAppSelector } from "@/redux/hooks"
import { useSliderConfig } from "@/utils/hooks"

import Slider from "@/shared/Slider"
import Element from "./Element"
import { Container, MoreLink, Row, SliderContainer } from "./styles"

import type { PostData } from "@/backend/main/types"

type NewsRoomProps = {
  news: PostData[]
}

function NewsRoom({ news }: NewsRoomProps) {
  const { t } = useTranslation("news")

  const showSkeleton = useAppSelector(selectShowSkeleton)
  const sliderConfig = useSliderConfig()

  return (
    <Container>
      <Row>
        <h3>{!showSkeleton ? t("rowTitle") : <Skeleton />}</h3>
        {!showSkeleton && (
          <Link href="/blog" passHref>
            <MoreLink as="a">{t("showMore")}</MoreLink>
          </Link>
        )}
      </Row>
      <SliderContainer>
        <Slider {...sliderConfig}>
          {news.map(({ id, title, short_description, img, created, slug }) => (
            <Element
              key={id}
              title={title}
              shortDescription={short_description}
              img={img}
              created={created}
              slug={slug}
            />
          ))}
        </Slider>
      </SliderContainer>
    </Container>
  )
}

export default NewsRoom