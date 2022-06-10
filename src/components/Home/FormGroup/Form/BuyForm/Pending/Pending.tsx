import React from "react"

import InputSelect from "@/shared/InputSelect"

import {
  Container,
  InfoContainer,
  TransactionRow,
  TransactionInfo,
  TransactionHash,
  StatusContainer,
  Status,
  TransactionID,
  Assistance
} from "./styles"

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
          paleBorders
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
          paleBorders
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
