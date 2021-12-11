import React, { useState } from "react"
import Container from "./Container"
import InputSelect from "../../InputSelect"
import Hideable from "@/shared/Hideable"
import NextButton from "../../NextButton"
import FormContainer from "./FormContainer"
import ExchangeRow from "../../Exchange"
import NetworkRow from "./NetworkRow"

function CurrencyForm() {
  const [chainActive, setChainActive] = useState(false)
  const [giveActive, setGiveActive] = useState(false)
  const [getActive, setGetActive] = useState(false)

  return (
    <Container>
      <FormContainer>
        <InputSelect
          label="Blockchain"
          selectLabel="You are currently using Assetux on"
          options={[
            { value: "Binance Smart Chain", icon: "/icons/icon.png" },
            { value: "Fantom", icon: "/icons/icon.png" },
            { value: "Avalanche" },
            { value: "Huobi Eco Chain", icon: "/icons/icon.png" }
          ]}
          displayInSelect={3}
          onActiveChange={(active) => setChainActive(active)}
          displayIcon
        />
        <Hideable hide={chainActive}>
          <InputSelect
            label="You give"
            id="give"
            defaultValue="10000"
            options={[
              {
                value: "Russian Ruble",
                description: "Rus ₽",
                shortDescription: "RUB"
              },
              {
                value: "Ukrain Hrivna",
                description: "UAH",
                shortDescription: "UAH"
              }
            ]}
            onActiveChange={(active) => setGiveActive(active)}
            changeable
          />
          <Hideable hide={giveActive}>
            <ExchangeRow />
            <InputSelect
              label="You get"
              options={[
                {
                  value: "Bitcoin",
                  description: "Bitcoin",
                  shortDescription: "BTC"
                }
              ]}
              displayInSelect={1}
              defaultValue="0.013"
              onActiveChange={(active) => setGetActive(active)}
              changeable
            />
            <Hideable hide={getActive}>
              <NetworkRow />
              <InputSelect label="Wallet address" changeable />
            </Hideable>
          </Hideable>
        </Hideable>
      </FormContainer>
      {!chainActive && !giveActive && !getActive && (
        <NextButton>Next Step</NextButton>
      )}
    </Container>
  )
}

export default CurrencyForm
