import React from "react"
import styled from "styled-components"
import Info from "./Info"
import Form from "./Form"

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 50px;

  @media only screen and (max-width: 960px) {
    flex-direction: column;
    gap: 75px;
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
