import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import { useRouter } from 'next/router'

import verticalSliderProps from '@/lib/data/vertical-slider-props'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectShowSkeleton } from '@/lib/redux/ui/selectors'

import {
  FlexWrapper,
  Container,
  ImagePositioner,
  ImageContainer,
  SliderContainer
} from './styles'
import AbsoluteSkeletonContainer from '@/components/common/absolute-skeleton-container'
import VerticalSliderStyles from '@/lib/styles/vertical-slider'
import { paths } from './mock'

const InvestmentsSlider = () => {
  const showSkeleton = useAppSelector(selectShowSkeleton)
  const router = useRouter()

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
              {paths(router.locale!).map((path) => (
                <ImagePositioner key={path}>
                  <ImageContainer>
                    <Image
                      src={path}
                      layout="responsive"
                      width={467}
                      height={301}
                      alt="gamefi"
                      loading="eager"
                    />
                  </ImageContainer>
                </ImagePositioner>
              ))}
            </Slider>
          </SliderContainer>
        </Container>
      </FlexWrapper>
    </>
  )
}

export default InvestmentsSlider
