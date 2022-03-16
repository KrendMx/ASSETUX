import React from "react"
import { useTranslation } from "next-i18next"
import styled from "styled-components"
import Element from "./Element"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Slider from "@/shared/Slider"
import Skeleton from "react-loading-skeleton"
import { selectShowSkeleton } from "@/src/redux/uiSlice"
import { useAppSelector } from "@/src/redux/hooks"
import useSliderConfig from "../sliderConfig"

const Container = styled.section`
  display: flex;
  flex-direction: column;

  // override page padding
  padding: 0 !important;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
  padding: 0 var(--paddings);

  & > h3 {
    flex-grow: 1;
  }
`

const MoreLink = styled(AdaptiveFont).attrs({
  mobileFactor: 1.5,
  tabletFactor: 1.2
})`
  color: var(--blue);
  font-weight: 500;
  text-decoration: none;
`

const SliderContainer = styled.div`
  display: block;
  width: 100%;
`

function NewsRoom() {
  const { t } = useTranslation("home")

  const showSkeleton = useAppSelector(selectShowSkeleton)
  const sliderConfig = useSliderConfig()

  return (
    <Container>
      <Row>
        <h3>{!showSkeleton ? t("home:news_title") : <Skeleton />}</h3>
        {!showSkeleton && (
          <MoreLink as="a" href="#">
            {t("home:news_showMore")}
          </MoreLink>
        )}
      </Row>
      <SliderContainer>
        <Slider {...sliderConfig}>
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
        </Slider>
      </SliderContainer>
    </Container>
  )
}

export default NewsRoom
