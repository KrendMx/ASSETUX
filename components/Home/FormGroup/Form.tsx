import React from "react"
import styled from "styled-components"

const Container = styled.div`
  max-width: 469px;
  width: 100%;
  height: 579px;
  background-color: var(--bgColor);
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  align-self: center;

  @media only screen and (max-width: 550px) {
    max-width: 100%;
  }
`

function Form() {
  return <Container></Container>
}

export default Form
