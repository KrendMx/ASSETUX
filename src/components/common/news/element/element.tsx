import React from "react"
import Image from "next/image"
import Link from "next/link"
import Skeleton from "react-loading-skeleton"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { selectShowSkeleton } from "@/lib/redux/ui/selectors"
import { useAppSelector } from "@/lib/redux/hooks"
import { getFormattedDate } from "@/lib/utils/date"

import { env } from "@/lib/env/client.mjs"
import { BackendClient } from "@/lib/backend/clients"

import AbsoluteSkeletonContainer from "@/components/common/absolute-skeleton-container"
import {
  Container,
  ImgContainer,
  InfoContainer,
  Title,
  Description,
  Info,
  ReadMore,
  PostDate,
  TextWrapper
} from "./styles"

type ElementProps = {
  title: string
  shortDescription: string
  img: string
  created: string
  pinned?: boolean
  slug: string
  withSkeletons?: boolean
}

const Element: React.FC<ElementProps> = ({
  title,
  shortDescription,
  img,
  created,
  pinned,
  slug,
  withSkeletons = true
}) => {
  const router = useRouter()
  const { t } = useTranslation("news")
  const selectedShowSkeleton = useAppSelector(selectShowSkeleton)
  const showSkeleton = withSkeletons && selectedShowSkeleton

  const displayedDate = getFormattedDate(created, router.locale!)

  return (
    <Container as="article" pinned={pinned}>
      <ImgContainer>
        <Image
          src={BackendClient.genericURL + img}
          layout="responsive"
          width={383}
          height={216}
          alt={`${title} image`}
        />
        {showSkeleton && (
          <AbsoluteSkeletonContainer>
            <Skeleton height="100%" />
          </AbsoluteSkeletonContainer>
        )}
      </ImgContainer>
      <InfoContainer>
        <TextWrapper>
          <Title>{!showSkeleton ? title : <Skeleton />}</Title>
          <Description>
            {!showSkeleton ? shortDescription : <Skeleton count={2} />}
          </Description>
        </TextWrapper>
        <Info>
          {!showSkeleton ? (
            <>
              <Link href={`/blog/article/${slug}`} passHref>
                <ReadMore>{t("readMore")} &#10230;</ReadMore>
              </Link>

              <PostDate dateTime={created}>{displayedDate}</PostDate>
            </>
          ) : (
            <Skeleton containerClassName="skeletonFlexContainer" />
          )}
        </Info>
      </InfoContainer>
    </Container>
  )
}

export default Element