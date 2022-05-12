import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import Post from "@/shared/NewsRoom/Element"
import {
  Container,
  Content,
  Title,
  PreviewImage,
  PostTime,
  Text,
  RecentPosts,
  Column
} from "./styles"

import { getFormattedDate } from "@/src/date"
import config from "@/src/config"

import type { PostData } from "@/src/BackendClient/types"

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
