import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"

import BaseContainer from "@/shared/BaseContainer"
import ControlRow from "@/shared/ControlRow"
import MainBlock from "./MainBlock"
import Pages from "@/shared/Pages"

import { postCategories } from "@/src/BackendClients/main/types"
import { mobile, mobileLayoutForTablet } from "@/src/constants"
import { BackendClient } from "@/src/BackendClients"
import { useDebounce, usePrevious } from "@/src/hooks"

import type { PostData, PostCategory } from "@/src/BackendClients/main/types"

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

let previousAbortController: AbortController | null = null

export type BlogProps = {
  pinnedPost: PostData | null
  posts: PostData[] | null
  totalPages: number
  category: PostCategory
}

function Blog({ pinnedPost, posts, totalPages, category }: BlogProps) {
  const { t } = useTranslation("news")
  const router = useRouter()

  const [searchContext, setSearchContext] = useState("")
  const debouncedSearchContext = useDebounce(searchContext)
  const [postsToDisplay, setPostsToDisplay] = useState(posts)

  const prevCategory = usePrevious(category)

  const skipPush = useRef(true)

  useEffect(() => {
    if (skipPush.current) {
      skipPush.current = false

      return
    }

    router.push({
      pathname: router.pathname,
      query:
        debouncedSearchContext == ""
          ? { category }
          : {
              query: debouncedSearchContext,
              category
            }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchContext])

  useEffect(() => {
    const fetchPosts = async (query: string) => {
      previousAbortController = new AbortController()

      const response = await BackendClient.findPost({
        category,
        query,
        signal: previousAbortController.signal
      })

      if (response.state == "error" || response.state == "cancelled") {
        return
      }

      if (response.state == "unavailable" || response.data.news == null) {
        setPostsToDisplay(null)

        return
      }

      setPostsToDisplay([response.data.news])
    }

    const query = router.query.query

    if (Array.isArray(query)) {
      return
    }

    if (previousAbortController) {
      previousAbortController.abort()
    }

    if (query == undefined) {
      setPostsToDisplay(posts)

      return
    }

    fetchPosts(query)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.query])

  useEffect(() => {
    if (category == prevCategory) {
      return
    }

    if (previousAbortController) {
      previousAbortController.abort()
    }

    if (searchContext != "") {
      skipPush.current = true
    }

    setPostsToDisplay(posts)
    setSearchContext("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts])

  return (
    <Container>
      <h1>{t("rowTitle")}</h1>
      <ControlRow
        context={searchContext}
        searchPlaceholder={t("search")}
        onContextChange={setSearchContext}
        buttons={postCategories.map((postCategory) => ({
          name: t(postCategory),
          active: postCategory == category,
          link: `/blog${postCategory == "all" ? "" : "/" + postCategory}`
        }))}
      />
      <>
        {postsToDisplay != null ? (
          <>
            <MainBlock pinnedPost={pinnedPost} posts={postsToDisplay} />
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
