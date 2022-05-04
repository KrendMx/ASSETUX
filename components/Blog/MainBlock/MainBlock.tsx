import React from "react"

import Element from "@/shared/NewsRoom/Element"
import { Container } from "./styles"

import type { PostData } from "@/src/BackendClient/types"

type MainBlockProps = {
  posts: PostData[]
}

function MainBlock({ posts }: MainBlockProps) {
  return (
    <Container>
      {posts.map(({ id, title, img, created, short_description }) => (
        <Element
          key={id}
          title={title}
          img={img}
          created={created}
          shortDescription={short_description}
        />
      ))}
    </Container>
  )
}

export default MainBlock
