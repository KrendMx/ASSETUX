import React from "react"
import { NextSeo } from "next-seo"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BlogComponent from "@/src/components/Blog"

import { BackendClient } from "@/src/BackendClients"
import {
  postCategories,
  isPostCategoryDeclared
} from "@/src/BackendClients/main/types"
import { getDefaultMetaTags } from "@/src/utils/seo"

import type { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from "next"
import type { ParsedUrlQuery } from "querystring"
import type { PostCategory } from "@/src/BackendClients/main/types"
import type { BlogProps } from "@/src/components/Blog"

function Blog(props: BlogProps) {
  const { t } = useTranslation("news")

  return (
    <>
      <NextSeo
        {...getDefaultMetaTags({
          title: t("title"),
          description: t("description"),
          pathname:
            props.category == "all" ? "/blog" : `/blog/${props.category}`
        })}
      />
      <BlogComponent {...props} />
    </>
  )
}

type GetStaticPropsParams = ParsedUrlQuery & {
  category?: string[]
}

export const getStaticProps: GetStaticProps<
  Partial<BlogProps>,
  GetStaticPropsParams
> = async ({ locale, params }) => {
  const errorProps = {
    props: {},
    notFound: true
  }

  const { category } = params!
  let checkedCategory: PostCategory = "all"

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
    page: 1
  })

  if (response.state != "success") {
    return errorProps
  }

  return {
    props: {
      pinnedPost: response.data.pin,
      posts: response.data.news,
      totalPages: response.data.total_pages,
      category: checkedCategory,
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "news",
        "routes",
        "controlRow"
      ]))
    },
    revalidate: 3600
  }
}

export const getStaticPaths: GetStaticPaths = ({ locales }) => {
  const paths: GetStaticPathsResult["paths"] = []

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
    fallback: "blocking"
  }
}

export default Blog
