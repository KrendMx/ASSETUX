import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import styled from "styled-components"

import BaseContainer from "@/shared/BaseContainer"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Post from "@/shared/NewsRoom/Element"

import { getFormattedDate } from "@/src/date"
import { mobile } from "@/src/constants"
import config from "@/src/config"

import type { PostData } from "@/src/BackendClient/types"

const Container = styled(BaseContainer)`
  font-size: 1rem;
  padding: 8.78em var(--paddings);
  margin: 0 auto;
  max-width: var(--max-width);
  width: 100%;
  min-height: calc(100vh - var(--header-height));

  display: grid;
  column-gap: 85px;
  grid-template-columns: repeat(3, 1fr);

  @media only screen and (max-width: ${mobile}px) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    row-gap: 3.25em;
    padding: 4.5em var(--paddings);
  }
`

const Content = styled.article`
  grid-column: 1 / span 2;

  @media only screen and (max-width: ${mobile}px) {
    grid-column: 1 / -1;
  }
`

type TitleProps = {
  secondary?: boolean
}

const Title = styled.h1<TitleProps>`
  margin-bottom: 0.71em;
  font-weight: 700;
  color: ${(props) => (props.secondary ? "var(--blue)" : "var(--dark-gray)")};

  && {
    font-size: 1.578em;
  }

  @media only screen and (max-width: ${mobile}px) {
    && {
      font-size: 2em;
    }
  }
`

const PreviewImage = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
`

const PostTime = styled.time`
  font-size: 1em;
  color: var(--gray);
  margin: 1.579em 0;
  width: 100%;
  text-align: right;
  display: block;
`

const Text = styled.div`
  font-size: 1em;
  font-weight: 400;
  color: #616161;
`

const RecentPosts = styled.div``

const Column = styled(AdaptiveFont).attrs({
  mobileFactor: 0.75,
  tabletFactor: 1
})`
  & > * + * {
    margin-top: 1.944em;
  }

  @media only screen and (max-width: ${mobile}px) {
    & > * + * {
      margin-top: 0.87em;
    }
  }
`

export type ArticleProps = {
  data: PostData
  recentPosts: PostData[] | null
}

function Article({ data, recentPosts }: ArticleProps) {
  const router = useRouter()

  const host = config.isStage ? config.host : `bsc.${config.host}`

  return (
    <Container>
      <Content>
        <Title>{data.title}</Title>
        <PreviewImage>
          <Image
            src={config.hostProtocol + "://" + host + data.img}
            width={560}
            height={416}
            layout="responsive"
            alt="Post preview image"
          />
        </PreviewImage>
        <PostTime dateTime={data.created}>
          {getFormattedDate(data.created, router.locale!)}
        </PostTime>
        <Text>{data.short_description}</Text>
      </Content>
      <RecentPosts>
        <Title as="h2" secondary>
          Последние новости
        </Title>
        {recentPosts != null && (
          <Column>
            {recentPosts.map(
              ({ id, short_description, created, title, img, slug }) => (
                <Post
                  key={id}
                  shortDescription={short_description}
                  created={created}
                  title={title}
                  img={img}
                  slug={slug}
                  pinned={false}
                />
              )
            )}
          </Column>
        )}
      </RecentPosts>
    </Container>
  )
}

export default Article
