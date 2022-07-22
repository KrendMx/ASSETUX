import React, { useMemo } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import parse from "html-react-parser"

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

import { getFormattedDate } from "@/lib/utils/date"
import { BackendClient } from "@/lib/backend/clients"
import { sanitize } from "@/lib/utils/helpers"

import type { PostData } from "@/lib/backend/main/types"

export type ArticleProps = {
  data: PostData
  recentPosts: PostData[] | null
}

function Article({ data, recentPosts }: ArticleProps) {
  const router = useRouter()

  const sanitized = useMemo(() => sanitize(data.text), [data.text])

  return (
    <Container>
      <Content>
        <Title>{data.title}</Title>
        <PreviewImage>
          <Image
            src={BackendClient.genericURL + data.img}
            width={383}
            height={216}
            layout="responsive"
            alt="Post preview image"
          />
        </PreviewImage>
        <PostTime dateTime={data.created}>
          {getFormattedDate(data.created, router.locale!)}
        </PostTime>
        <Text>{parse(sanitized)}</Text>
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
