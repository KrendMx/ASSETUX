import React from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--black);
`

const Heading = styled.h1`
  font-size: 2.6rem;
  font-weight: 600;
  color: var(--white);
  letter-spacing: 3px;
`

function Index() {
  return (
    <Container>
      <Heading>Soon...</Heading>
    </Container>
  )
}

export default Index
