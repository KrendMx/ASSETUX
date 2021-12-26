import React from "react"
import styled from "styled-components"
import Info from "./Info"
import Form from "./Form"
import { mobile, mobileLayoutForTablet } from "@/src/constants"

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1em;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    flex-direction: column;
    align-items: center;

    & > *:not(:last-child) {
      margin-bottom: 40px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    flex-direction: column-reverse;
    align-items: flex-start;

    & > *:not(:last-child) {
      margin-bottom: 0;
      margin-top: 51px;
    }
  }
`

function FormGroup() {
  return (
    <Container>
      <Info />
      <Form />
    </Container>
  )
}

export default FormGroup
