import React, { useState } from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"

import BaseContainer from "@/shared/BaseContainer"
import ControlRow from "@/shared/ControlRow"
import MainBlock from "./MainBlock"
import Pages from "@/shared/Pages"

import { postCategories } from "@/src/BackendClient/types"
import { mobile, mobileLayoutForTablet } from "@/src/constants"

import type { PostData, PostCategory } from "@/src/BackendClient/types"

const Container = styled(BaseContainer)`
  font-size: 1rem;
  padding: 5.57em var(--paddings) 13.47em;
  margin: 0 auto;
  max-width: var(--max-width);
  width: 100%;
  min-height: calc(100vh - var(--header-height));

  & > *:first-child {
    margin-bottom: 0.55em;
  }

  & > *:nth-child(2) {
    margin-bottom: 3.947em;
  }

  & > *:nth-child(3) {
    margin-bottom: 2.632em;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    font-size: 0.7rem;
    padding: 2.666em var(--paddings) 9em;

    & > *:nth-child(2) {
      margin-bottom: 1.36em;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1rem;

    & > *:first-child {
      margin-bottom: 0.385em;
    }

    & > *:nth-child(2) {
      margin-bottom: 2.735em;
    }
  }
`

export type BlogProps = {
  pinnedPost: PostData | null
  posts: PostData[] | null
  totalPages: number
  category: PostCategory
}

function Blog({ pinnedPost, posts, totalPages, category }: BlogProps) {
  const { t } = useTranslation("news")

  return (
    <Container>
      <h1>{t("title")}</h1>
      <ControlRow
        searchPlaceholder={t("search")}
        buttons={postCategories.map((postCategory) => ({
          name: t(postCategory),
          active: postCategory == category,
          link: `/blog${postCategory == "all" ? "" : "/" + postCategory}`
        }))}
      />
      <>
        {posts != null ? (
          <>
            <MainBlock pinnedPost={pinnedPost} posts={posts} />
            <Pages pages={totalPages} />
          </>
        ) : (
          <p>No posts yet</p>
        )}
      </>
    </Container>
  )
}

export default Blog
