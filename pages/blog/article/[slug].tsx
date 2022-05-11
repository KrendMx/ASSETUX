import React from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import ArticleComponent from "@/components/Blog/Article"

import BackendClient from "@/src/BackendClient"

import type { GetStaticProps, GetStaticPaths } from "next"
import type { ParsedUrlQuery } from "querystring"
import type { ArticleProps } from "@/components/Blog/Article"
import type { PostData } from "@/src/BackendClient/types"

function Article(props: ArticleProps) {
  return <ArticleComponent {...props} />
}

type GetStaticPropsParams = ParsedUrlQuery & {
  slug: string
}

export const getStaticProps: GetStaticProps<
  Partial<ArticleProps>,
  GetStaticPropsParams
> = async ({ locale, params }) => {
  const errorProps = {
    props: {},
    notFound: true
  }

  const { slug } = params!

  const responses = await Promise.all([
    BackendClient.findPost({
      query: slug,
      category: "all"
    }),
    BackendClient.getNews({ category: "all", page: 1 })
  ])

  const postResponse = responses[0]
  const recentPostsResponse = responses[1]

  if (
    postResponse.data == null ||
    (postResponse.data != null && postResponse.data.news == null)
  ) {
    return errorProps
  }

  let recentPosts: PostData[] | null = null
  if (recentPostsResponse.data?.news) {
    recentPosts = recentPostsResponse.data.news.slice(0, 4)
  }

  return {
    props: {
      data: postResponse.data.news,
      recentPosts,
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "news",
        "routes"
      ]))
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await BackendClient.getNews({ category: "all", page: 1 })

  return {
    paths: [],
    fallback: "blocking"
  }
}

export default Article
