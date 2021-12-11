import React from "react"
import styled from "styled-components"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;

  & > h2 {
    margin-bottom: 15px;
  }
`

const Table = styled.div`
  width: 100%;
  height: 485px;
  background-color: var(--bgColor);
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
`

function CryptoExplorer() {
  return (
    <Container>
      <h2>Crypto Explorer</h2>
      <Table />
    </Container>
  )
}

export default CryptoExplorer
