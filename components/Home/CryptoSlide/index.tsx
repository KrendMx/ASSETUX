import React from "react"
import styled from "styled-components"

const Container = styled.section`
  display: flex;
  flex-direction: row;
`

const Element = styled.div`
  flex: 1 1 auto;
  height: 177px;
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  background-color: var(--bgColor);

  &:not(:last-child) {
    margin-right: 21px;
  }
`

function CryptoSlide() {
  return (
    <Container>
      <Element />
      <Element />
      <Element />
    </Container>
  )
}

export default CryptoSlide
