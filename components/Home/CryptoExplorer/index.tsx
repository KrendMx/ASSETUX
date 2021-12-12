import React from "react"
import styled from "styled-components"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Table from "./Table"
import { useAppSelector } from "@/src/redux/hooks"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
`

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

const AllLink = styled(AdaptiveFont).attrs({
  mobileFactor: 1.5,
  tabletFactor: 1.2
})`
  color: var(--blue);
  font-weight: 500;
  text-decoration: none;
`

const ControlRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 39px 0;
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;

  & > * + * {
    margin-left: 10px;
  }
`

const ControlButton = styled.button`
  background-color: var(--lightgray);
  font-size: 16px;
  padding: 14px 20px;
  font-weight: 500;
  color: var(--gray);
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 10px;
`

const Search = styled.div`
  border: 1px solid #d2d2d7;
  border-radius: 10px;
  width: 243px;
  font-weight: 500;
  font-size: 16px;
  padding: 14px 20px;
  color: var(--gray);
`

function CryptoExplorer() {
  const isMobile = useAppSelector((state) => state.ui.isMobile)

  return (
    <Container>
      <TitleRow>
        <h3>Crypto Explorer</h3>
        <AllLink as="a" href="#">
          {isMobile ? "View all" : "View all supported currencies"}
        </AllLink>
      </TitleRow>
      {/* <ControlRow>
        <ButtonRow>
          <ControlButton>All</ControlButton>
          <ControlButton>Binance SC</ControlButton>
          <ControlButton>Matic (Polygon)</ControlButton>
          <ControlButton>Fantom</ControlButton>
          <ControlButton>Balancer</ControlButton>
        </ButtonRow>
        <Search>Search</Search>
      </ControlRow>
      <Table /> */}
    </Container>
  )
}

export default CryptoExplorer
