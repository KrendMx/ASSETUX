import React from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import ArticleComponent from "@/components/Blog/Article"

import { BackendClient } from "@/src/BackendClients"

import type { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from "next"
import type { ParsedUrlQuery } from "querystring"
import type { ArticleProps } from "@/components/Blog/Article"
import type { PostData } from "@/src/BackendClients/main/types"

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

  if (postResponse.state != "success") {
    return errorProps
  }

  if (postResponse.data.news == null) {
    return errorProps
  }

  let recentPosts: PostData[] | null = null
  if (
    recentPostsResponse.state == "success" &&
    recentPostsResponse.data.news != null
  ) {
    recentPosts = recentPostsResponse.data.news.slice(0, 3)
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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const errorProps = {
    paths: [],
    fallback: "blocking" as const
  }

  const response = await BackendClient.getNews({ category: "all", page: 1 })

  if (response.state != "success") {
    return errorProps
  }

  if (response.data.news == null) {
    return errorProps
  }

  const paths: GetStaticPathsResult["paths"] = []

  response.data.news.forEach((post) => {
    locales!.forEach((locale) => {
      paths.push({
        params: { slug: post.slug },
        locale
      })
    })
  })

  return {
    paths,
    fallback: "blocking"
  }
}

export default Article
