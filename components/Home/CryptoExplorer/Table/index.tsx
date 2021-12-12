import React from "react"
import styled from "styled-components"

const Container = styled.table`
  width: 100%;
  background-color: var(--bgColor);
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 43px 31px;
`

const Head = styled.thead``

const HeadElement = styled.th`
  font-size: 15px;
  color: var(--gray);
  text-align: center;
  font-weight: 500;
`

const Row = styled.tr``

const Body = styled.tbody``

const Element = styled.td`
  font-size: 15px;
  color: var(--black);
  text-align: center;
  padding: 33px 0;
  font-weight: 500;
`

function Table() {
  return (
    <Container>
      <Head>
        <Row>
          <HeadElement>№</HeadElement>
          <HeadElement>Ticker</HeadElement>
          <HeadElement>Last Price</HeadElement>
          <HeadElement>Assetux Price</HeadElement>
          <HeadElement>Change 24h</HeadElement>
          <HeadElement>Volume 24h</HeadElement>
          <HeadElement>Trade</HeadElement>
          <HeadElement>Pool</HeadElement>
        </Row>
      </Head>
      <Body>
        <Row>
          <Element>1</Element>
          <Element>LTE/RUB</Element>
          <Element>0.0000001</Element>
          <Element>0.0000001</Element>
          <Element>$13.432</Element>
          <Element>$13.432</Element>
          <Element>Buy</Element>
          <Element>Sell</Element>
        </Row>
      </Body>
    </Container>
  )
}

export default Table
