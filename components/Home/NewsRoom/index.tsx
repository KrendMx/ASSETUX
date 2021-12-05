import React from "react"
import styled from "styled-components"
import Element from "./Element"
import AdaptiveFont from "@/shared/AdaptiveFont"

const Container = styled.section`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 47px;
`

const MoreLink = styled(AdaptiveFont).attrs({
  mobileFactor: 1.5,
  tabletFactor: 1.2
})`
  color: var(--blue);
  font-weight: 500;
  text-decoration: none;
`

const NewsLetter = styled.div`
  display: flex;
  flex-direction: row;
`

function NewsRoom() {
  return (
    <Container>
      <Row>
        <h2>News Room</h2>
        <MoreLink as="a" href="#">Show more</MoreLink>
      </Row>
      <NewsLetter>
        <Element />
      </NewsLetter>
    </Container>
  )
}

export default NewsRoom
