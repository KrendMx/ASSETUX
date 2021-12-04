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

  & > *:not(:last-child) {
    margin-right: 50px;
  }

  @media only screen and (max-width: 985px) {
    flex-direction: column;
    align-items: flex-start;

    & > *:not(:last-child) {
      margin-right: 0;
      margin-bottom: 75px;
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
