import React from "react"
import styled from "styled-components"

const Wrapper = styled.footer`
  background-color: var(--black);
`

const Container = styled.div`
  display: flex;
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 97px var(--paddings);
  color: var(--white);
`

function Footer() {
  return (
    <Wrapper>
      <Container>
        Footer
      </Container>
    </Wrapper>
  )
}

export default Footer
