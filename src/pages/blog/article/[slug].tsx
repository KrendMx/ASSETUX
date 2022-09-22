import React from 'react'
import { NextSeo } from 'next-seo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ArticleComponent from '@/components/blog/article'

import { BackendClient } from '@/lib/backend/clients'
import { getDefaultMetaTags } from '@/lib/utils/seo'

import type { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import type { ArticleProps } from '@/components/blog/article'
import type { PostData } from '@/lib/backend/main/types.backend.main'

const Article = (props: ArticleProps) => {
  return (
    <>
      <NextSeo
        {...getDefaultMetaTags({
          title: props.data.title,
          description: props.data.short_description,
          pathname: `/blog/article/${props.data.slug}`,
          seoImage: {
            url: BackendClient.genericURL + props.data.img,
            width: 1600,
            height: 900,
            alt: 'Article Preview',
            type: 'image/png'
          }
        })}
      />
      <ArticleComponent {...props} />
    </>
  )
}

type GetStaticPropsParams = ParsedUrlQuery & {
  slug: string
}

export const getStaticProps: GetStaticProps<
  ArticleProps,
  GetStaticPropsParams
> = async ({ locale, params }) => {
  const errorProps = {
    notFound: true,
    revalidate: 3600
  } as const

  const { slug } = params!

  const responses = await Promise.all([
    BackendClient.findPost({
      query: slug,
      category: 'all',
      strict: true,
      lang: locale!
    }),
    BackendClient.getNews({ category: 'all', page: 1, lang: locale! })
  ])

  const postResponse = responses[0]
  const recentPostsResponse = responses[1]

  if (postResponse.state != 'success') {
    return errorProps
  }

  if (postResponse.data.news == null) {
    return errorProps
  }

  let recentPosts: PostData[] | null = null
  if (
    recentPostsResponse.state == 'success' &&
    recentPostsResponse.data.news != null
  ) {
    recentPosts = recentPostsResponse.data.news.slice(0, 3)
  }

  return {
    props: {
      data: postResponse.data.news,
      recentPosts,
      ...(await serverSideTranslations(locale!, [
        'header',
        'footer',
        'news',
        'routes'
      ]))
    },
    revalidate: 3600
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: GetStaticPathsResult['paths'] = []
  // need refactor
  for (const locale of locales!) {
    const response = await BackendClient.getNews({
      category: 'all',
      page: 1,
      lang: locale
    })

    if (response.state != 'success' || response.data.news == null) {
      continue
    }

    response.data.news.forEach((post) => {
      paths.push({
        params: { slug: post.slug },
        locale
      })
    })
  }

  return {
    paths,
    fallback: 'blocking'
  }
}

export default Article
