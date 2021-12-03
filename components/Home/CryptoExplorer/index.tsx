import React from "react"
import styled from "styled-components"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 115px;
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
