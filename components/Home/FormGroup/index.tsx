import React from "react"
import styled from "styled-components"
import Info from "./Info"
import Form from "./Form"

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1em;

  @media only screen and (max-width: 985px) {
    flex-direction: column;
    align-items: center;

    & > *:not(:last-child) {
      margin-bottom: 40px;
    }
  }

  @media only screen and (max-width: 550px) {
    align-items: flex-start;
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
