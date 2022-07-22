import React from "react"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import Skeleton from "react-loading-skeleton"

import { selectShowSkeleton } from "@/lib/redux/ui/selectors"
import { useAppSelector } from "@/lib/redux/hooks"
import { useSliderConfig } from "@/lib/hooks"

import Slider from "@/components/common/slider"
import Element from "./element"
import { Container, MoreLink, Row, SliderContainer } from "./styles"

import type { PostData } from "@/lib/backend/main/types"

type NewsProps = {
  news: PostData[]
}

const News: React.FC<NewsProps> = ({ news }) => {
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

export default News
