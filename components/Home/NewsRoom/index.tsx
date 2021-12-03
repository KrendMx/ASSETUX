import React from "react"
import styled from "styled-components"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 47px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

const MoreLink = styled.a`
  font-size: 1em;
  color: var(--blue);
  font-weight: 500;
  text-decoration: none;
`

const NewsLetter = styled.div`
  display: flex;
  flex-direction: row;
  gap: 21px;
`

const Element = styled.div`
  flex: 1 1 auto;
  height: 418px;
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  background-color: var(--bgColor);
  font-size: 1em;
`

function NewsRoom() {
  return (
    <Container>
      <Row>
        <h2>News Room</h2>
        <MoreLink href="#">Show more</MoreLink>
      </Row>
      <NewsLetter>
        <Element />
        <Element />
        <Element />
      </NewsLetter>
    </Container>
  )
}

export default NewsRoom
