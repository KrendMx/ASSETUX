import React from 'react'
import styled from 'styled-components'
import { mobile } from '@/lib/data/constants'
import Buttons from './buttons'
import FormController from './form-controller'
import AdaptiveFont from '@/components/common/adaptive-font'

const Container = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  align-self: center;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  overflow: hidden;
  isolation: isolate; // fix borders in maintenance
  font-size: 1rem;

  @media only screen and (max-width: ${mobile}px) {
    max-width: 100%;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
    border-radius: 0.675em;
  }
`

const FormContainer = styled(AdaptiveFont).attrs({
  mobileFactor: 1,
  tabletFactor: 1
})`
  width: 100%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: var(--bgColor);
`

const Form = () => {
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
