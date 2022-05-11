import React from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BlogComponent from "@/components/Blog"

import BackendClient from "@/src/BackendClient"
import {
  postCategories,
  isPostCategoryDeclared
} from "@/src/BackendClient/types"

import type { GetStaticProps, GetStaticPaths } from "next"
import type { ParsedUrlQuery } from "querystring"
import type { PostCategory } from "@/src/BackendClient/types"
import type { BlogProps } from "@/components/Blog"

function Blog(props: BlogProps) {
  return <BlogComponent {...props} />
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

  if (response.data == null) {
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
        "routes"
      ]))
    }
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: postCategories.map((category) => ({
      // catch all since optional (not catch all) are not supported
      params: { category: [category] }
    })),
    fallback: "blocking"
  }
}

export default Blog
