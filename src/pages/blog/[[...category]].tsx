import React from 'react'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BlogComponent from '@/components/blog'

import { BackendClient } from '@/lib/backend/clients'
import {
  postCategories,
  isPostCategoryDeclared
} from '@/lib/backend/main/types.backend.main'
import { getDefaultMetaTags } from '@/lib/utils/seo'

import type { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import type { PostCategory } from '@/lib/backend/main/types.backend.main'
import type { BlogProps } from '@/components/blog'
import Orders from '@/components/home/orders'
import CryptoManager from '@/components/common/crypto-manager'

const Blog = (props: BlogProps) => {
  const { t } = useTranslation('news')

  return (
    <>
      <NextSeo
        {...getDefaultMetaTags({
          title: t('title'),
          description: t('description'),
          pathname:
            props.category == 'all' ? '/blog' : `/blog/${props.category}`
        })}
      />
      <BlogComponent {...props} />
      <Orders />
      <CryptoManager />
    </>
  )
}

type GetStaticPropsParams = ParsedUrlQuery & {
  category?: string[]
}

export const getStaticProps: GetStaticProps<
  BlogProps,
  GetStaticPropsParams
> = async ({ locale, params }) => {
  const errorProps = {
    notFound: true,
    revalidate: 3600
  } as const

  const { category } = params!
  let checkedCategory: PostCategory = 'all'

  if (Array.isArray(category)) {
    const categoryToCheck = category.at(0)

    if (!categoryToCheck || category.length > 1) {
      return errorProps
    }

    if (!isPostCategoryDeclared(categoryToCheck)) {
      return errorProps
    }

    checkedCategory = categoryToCheck
  }

  const response = await BackendClient.getNews({
    category: checkedCategory,
    page: 1,
    lang: locale!
  })

  if (response.state != 'success') {
    return errorProps
  }

  return {
    props: {
      pinnedPost: response.data.pin,
      posts: response.data.news,
      totalPages: response.data.total_pages,
      category: checkedCategory,
      ...(await serverSideTranslations(locale!, [
        'header',
        'footer',
        'news',
        'routes',
        'controlRow',
        'home'
      ]))
    },
    revalidate: 3600
  }
}

export const getStaticPaths: GetStaticPaths = ({ locales }) => {
  const paths: GetStaticPathsResult['paths'] = []

  postCategories.forEach((category) => {
    locales!.forEach((locale) => {
      paths.push({
        // catch all since optional (not catch all) is not supported
        params: { category: [category] },
        locale
      })
    })
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export default Blog
