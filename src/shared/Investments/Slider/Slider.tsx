import React from "react"
import Slider from "react-slick"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"

import verticalSliderProps from "@/utils/vertical-slider-props"
import { useAppSelector } from "@/redux/hooks"
import { selectShowSkeleton } from "@/redux/ui/selectors"

import {
  FlexWrapper,
  Container,
  ImagePositioner,
  ImageContainer,
  SliderContainer
} from "./styles"
import AbsoluteSkeletonContainer from "@/shared/AbsoluteSkeletonContainer"
import VerticalSliderStyles from "@/styles/VerticalSliderStyles"

function InvestmentsSlider() {
  const showSkeleton = useAppSelector(selectShowSkeleton)

  return (
    <>
      <VerticalSliderStyles />
      <FlexWrapper>
        <Container>
          {showSkeleton && (
            <AbsoluteSkeletonContainer>
              <Skeleton height="100%" />
            </AbsoluteSkeletonContainer>
          )}
          <SliderContainer visible={!showSkeleton}>
            <Slider {...verticalSliderProps}>
              <ImagePositioner>
                <ImageContainer>
                  <Image
                    src="/assets/investments/gamefi.png"
                    layout="responsive"
                    width={477}
                    height={307}
                    alt="gamefi"
                    loading="eager"
                  />
                </ImageContainer>
              </ImagePositioner>
              <ImagePositioner>
                <ImageContainer>
                  <Image
                    src="/assets/investments/defi.png"
                    layout="responsive"
                    width={477}
                    height={307}
                    alt="DeFi"
                    loading="eager"
                  />
                </ImageContainer>
              </ImagePositioner>
              <ImagePositioner>
                <ImageContainer>
                  <Image
                    src="/assets/investments/metaverse.png"
                    layout="responsive"
                    width={477}
                    height={307}
                    alt="Metaverse"
                    loading="eager"
                  />
                </ImageContainer>
              </ImagePositioner>
              <ImagePositioner>
                <ImageContainer>
                  <Image
                    src="/assets/investments/top-coins.png"
                    layout="responsive"
                    width={477}
                    height={307}
                    alt="TopCoins"
                    loading="eager"
                  />
                </ImageContainer>
              </ImagePositioner>
            </Slider>
          </SliderContainer>
        </Container>
      </FlexWrapper>
    </>
  )
}

export default InvestmentsSlider