import React from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BlogComponent from "@/components/Blog"

import BackendClient from "@/src/BackendClient"
import {
  postCategories,
  isPostCategoryDeclared
} from "@/src/BackendClient/types"

import type { GetStaticProps, GetStaticPaths } from "next"
import type { PostData, PostCategory } from "@/src/BackendClient/types"

type BlogProps = {
  posts: PostData[] | null
  totalPages: number
  category: PostCategory
}

function Blog({ posts, totalPages, category }: BlogProps) {
  return (
    <BlogComponent posts={posts} totalPages={totalPages} category={category} />
  )
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const errorProps = {
    props: {},
    notFound: true
  }

  let category = params!["category"]

  if (category == undefined) {
    category = "all"
  } else if (Array.isArray(category)) {
    const categoryToCheck = category.at(0)

    if (!categoryToCheck || category.length > 1) {
      return errorProps
    }

    category = categoryToCheck
  } else {
    return errorProps
  }

  if (!isPostCategoryDeclared(category)) {
    return errorProps
  }

  const response = await BackendClient.getNews({ category, page: 1 })

  if (response.data == null) {
    return errorProps
  }

  return {
    props: {
      posts: response.data.news,
      totalPages: response.data.total_pages,
      category,
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
