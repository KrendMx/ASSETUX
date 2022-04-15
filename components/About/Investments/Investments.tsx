import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import Skeleton from "react-loading-skeleton"
import Slider from "react-slick"

import { selectShowSkeleton } from "@/src/redux/uiSlice/selectors"
import { useAppSelector } from "@/src/redux/hooks"

import verticalSliderProps from "@/src/verticalSliderProps"

import {
  Container,
  InfoBlock,
  Paragraph,
  Media,
  Stores,
  Store,
  QRContainer,
  ImageBlock,
  InvestmentsContainer,
  InvesmentsImage,
  InvesmentsImageContainer
} from "./styles"

import AbsoluteSkeletonContainer from "@/shared/AbsoluteSkeletonContainer"
import VerticalSliderStyles from "@/styles/VerticalSliderStyles"

function Investments() {
  const { t } = useTranslation("about")

  const showSkeleton = useAppSelector(selectShowSkeleton)

  return (
    <>
      <VerticalSliderStyles />
      <Container>
        <InfoBlock>
          <h3>{showSkeleton ? <Skeleton /> : t("investments_title")}</h3>
          <Paragraph>
            {showSkeleton ? <Skeleton count={5} /> : t("investments_p1")}
          </Paragraph>
          <Paragraph>
            {showSkeleton ? <Skeleton /> : t("investments_p2")}
          </Paragraph>
          <Media>
            <Stores>
              <Link href="#" passHref>
                <Store>
                  <Image
                    src="/assets/investments/googleplay.png"
                    width={227}
                    height={68}
                    alt="appstore"
                  />
                  {showSkeleton && (
                    <AbsoluteSkeletonContainer>
                      <Skeleton height="100%" borderRadius={0} />
                    </AbsoluteSkeletonContainer>
                  )}
                </Store>
              </Link>
              <Link href="#" passHref>
                <Store>
                  <Image
                    src="/assets/investments/appstore.png"
                    width={223}
                    height={73}
                    alt="appstore"
                  />
                  {showSkeleton && (
                    <AbsoluteSkeletonContainer>
                      <Skeleton height="100%" borderRadius={0} />
                    </AbsoluteSkeletonContainer>
                  )}
                </Store>
              </Link>
            </Stores>
            <QRContainer>
              <Image
                src="/assets/investments/QR.png"
                width={177}
                height={170}
                alt="QRCODE"
              />
              {showSkeleton && (
                <AbsoluteSkeletonContainer>
                  <Skeleton height="100%" borderRadius={0} />
                </AbsoluteSkeletonContainer>
              )}
            </QRContainer>
          </Media>
        </InfoBlock>
        <ImageBlock>
          <InvestmentsContainer>
            <Slider {...verticalSliderProps}>
              <InvesmentsImageContainer>
                <InvesmentsImage>
                  <Image
                    src="/assets/investments/gamefi.png"
                    layout="responsive"
                    width={477}
                    height={307}
                    alt="gamefi"
                  />
                </InvesmentsImage>
              </InvesmentsImageContainer>
              <InvesmentsImageContainer>
                <InvesmentsImage>
                  <Image
                    src="/assets/investments/defi.png"
                    layout="responsive"
                    width={477}
                    height={307}
                    alt="DeFi"
                  />
                </InvesmentsImage>
              </InvesmentsImageContainer>
              <InvesmentsImageContainer>
                <InvesmentsImage>
                  <Image
                    src="/assets/investments/metaverse.png"
                    layout="responsive"
                    width={477}
                    height={307}
                    alt="Metaverse"
                  />
                </InvesmentsImage>
              </InvesmentsImageContainer>
              <InvesmentsImageContainer>
                <InvesmentsImage>
                  <Image
                    src="/assets/investments/top-coins.png"
                    layout="responsive"
                    width={477}
                    height={307}
                    alt="TopCoins"
                  />
                </InvesmentsImage>
              </InvesmentsImageContainer>
            </Slider>
            {/* 
          {showSkeleton && (
            <AbsoluteSkeletonContainer>
              <Skeleton height="100%" />
            </AbsoluteSkeletonContainer>
          )} */}
          </InvestmentsContainer>
        </ImageBlock>
      </Container>
    </>
  )
}

export default Investments
