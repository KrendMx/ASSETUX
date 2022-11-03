import React from 'react'

import Element from '@/components/common/news/element'
import { Container } from './styles'

import type { PostData } from '@/lib/backend/main/types.backend.main'

type MainBlockProps = {
  pinnedPost: PostData | null
  posts: PostData[]
}

const MainBlock = ({ pinnedPost, posts }: MainBlockProps) => {
  return (
    <Container hasPinned={pinnedPost != null}>
      {pinnedPost != null && (
        <Element
          title={pinnedPost.title}
          img={pinnedPost.img}
          created={pinnedPost.created}
          shortDescription={pinnedPost.short_description}
          withSkeletons={false}
          slug={pinnedPost.slug}
          pinned
        />
      )}
      {posts.map(({ id, title, img, created, short_description, slug }) => (
        <Element
          key={id}
          title={title}
          img={img}
          created={created}
          shortDescription={short_description}
          slug={slug}
          withSkeletons={false}
        />
      ))}
    </Container>
  )
}

export default MainBlock
