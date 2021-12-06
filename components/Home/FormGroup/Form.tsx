import React from "react"
import styled from "styled-components"
import { mobile } from "@/src/constats"

const Container = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  max-width: 469px;
  width: 100%;
  height: 579px;
  background-color: var(--bgColor);
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  align-self: center;

  @media only screen and (max-width: ${mobile}px) {
    max-width: 100%;
  }
`

function Form() {
  return <Container></Container>
}

export default Form
