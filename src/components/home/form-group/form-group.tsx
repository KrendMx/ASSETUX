import React from "react"
import styled from "styled-components"

import Info from "./info"
import Form from "./form"

import { mobile, mobileLayoutForTablet } from "@/lib/data/constants"

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1em;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;

  & > * + * {
    margin-left: 40px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    flex-direction: column-reverse;
    align-items: center;

    & > *:last-child {
      margin-bottom: 40px;
    }

    & > * + * {
      margin-left: 0;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    flex-direction: column-reverse;
    align-items: flex-start;

    & > *:last-child {
      margin-bottom: 51px;
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
