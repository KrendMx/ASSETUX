import React from "react"
import styled from "styled-components"

type WrapperProps = {
  hide: boolean
}

const Wrapper = styled.footer<WrapperProps>`
  background-color: var(--black);
  display: ${(props) => (props.hide ? "none" : "block")};
`

const Container = styled.div`
  display: flex;
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 97px var(--paddings);
  color: var(--white);
`

type FooterProps = {
  hide: boolean
}

function Footer({ hide }: FooterProps) {
  return (
    <Wrapper hide={hide}>
      <Container>Footer</Container>
    </Wrapper>
  )
}

export default Footer
