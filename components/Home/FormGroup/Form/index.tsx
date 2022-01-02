import React from "react"
import styled from "styled-components"
import { mobile } from "@/src/constants"
import Buttons from "./Buttons"
import FormController from "./FormController"
import AdaptiveFont from "@/shared/AdaptiveFont"

const Container = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  max-width: 469px;
  width: 100%;
  align-self: center;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  overflow: hidden;
  font-size: 1rem;

  @media only screen and (max-width: ${mobile}px) {
    max-width: 100%;
  }
`

const FormContainer = styled(AdaptiveFont).attrs({
  mobileFactor: 1,
  tabletFactor: 1
})`
  padding: 34px 25px;
  width: 100%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: var(--bgColor);

  @media only screen and (max-width: ${mobile}px) {
    padding: 21px 17px;
  }
`

function Form() {
  return (
    <Container>
      <Buttons />
      <FormContainer>
        <FormController />
      </FormContainer>
    </Container>
  )
}

export default Form
