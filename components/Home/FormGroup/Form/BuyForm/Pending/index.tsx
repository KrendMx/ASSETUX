import React from "react"
import styled from "styled-components"
import InputSelect from "@/shared/InputSelect"
import { mobile } from "@/src/constants"

const Container = styled.div`
  width: 100%;
  height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  font-size: 1rem;
  padding: 34px 25px;

  @media only screen and (max-width: ${mobile}px) {
    padding: 21px 17px;
  }
`

const InfoContainer = styled.div`
  & > * + * {
    margin-top: 16px;
  }
`

const TransactionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 500;
  font-size: 0.79em;
`

const TransactionInfo = styled.span`
  color: var(--gray);
`

const TransactionHash = styled.span`
  color: var(--blue);
`

const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  height: 65px;
  font-weight: 500;
  font-size: 1em;
  border-radius: 10px;
  background-color: #68cc4533;
  color: var(--green);
`

const Status = styled.span``

const TransactionID = styled.span``

const Assistance = styled.a`
  text-align: center;
  text-decoration: none;
  color: var(--blue);
  font-size: 0.845em;
  font-weight: 500;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.87em;
  }
`

function Pending() {
  return (
    <Container>
      <InfoContainer>
        <InputSelect
          label="You give"
          id="give"
          value="10000"
          options={[
            {
              value: "RUB",
              shortDescription: "Rus ₽",
              description: "RUB"
            }
          ]}
          selectable={false}
        />
        <InputSelect
          label="You get"
          id="get"
          value="0.013"
          options={[
            {
              value: "BTC",
              shortDescription: "Bitcoin",
              description: "BTC"
            }
          ]}
          selectable={false}
        />
        <TransactionRow>
          <TransactionInfo>Transfering Amount (CUR) to you...</TransactionInfo>
          <TransactionHash>Transaction Hash</TransactionHash>
        </TransactionRow>
        <StatusContainer>
          <Status>Success</Status>
          <TransactionID>Transaction ID: 745777123721</TransactionID>
        </StatusContainer>
      </InfoContainer>
      <Assistance href="#">Assistance</Assistance>
    </Container>
  )
}

export default Pending
