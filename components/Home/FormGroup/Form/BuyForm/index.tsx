import React, { useState, useEffect, useMemo } from "react"
import CurrencyForm from "./CurrencyForm"
import { useAppSelector } from "@/src/redux/hooks"
import BackendClient from "@/src/BackendClient"
import type { Option } from "../InputSelect/types"
import type { PaymentOption, TokenOption } from "../types"
import type {
  FiatRate,
  FiatProvider,
  Blockchain
} from "@/src/BackendClient/types"

type BuyFormProps = {
  currentBlockchain: Blockchain | null
  blockchains: Option[] | null
  currencies: Option[] | null
  tokens: TokenOption[] | null
  rates: FiatRate[] | null
  payments: FiatProvider[] | null
  firstLoad: boolean
}

function BuyForm({
  currentBlockchain,
  blockchains,
  currencies,
  tokens,
  rates,
  payments,
  firstLoad
}: BuyFormProps) {
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [giveAmount, setGiveAmount] = useState("10000") // in form it is validated to be a number
  const [email, setEmail] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [processedPayments, setProcessedPayments] = useState<
    PaymentOption[] | null
  >(null)
  const currentRate = useMemo(() => {
    if (rates && selectedToken && selectedCurrency) {
      const rate = rates.find((rate) => rate.name == selectedToken)
      if (rate) {
        return rate.buy[selectedCurrency]
      }

      return null
    }

    return null
  }, [rates, selectedToken, selectedCurrency])
  const defaultCurrencyIndex = currencies
    ? currencies.findIndex((currency) => currency.value == currentCurrency)
    : 0
  const defaultBlockchainIndex =
    currentBlockchain && blockchains
      ? blockchains.findIndex(
          (blockchain) => blockchain.value == currentBlockchain.title
        )
      : 0

  const onSubmit = () => {
    if (currentBlockchain && tokens) {
      const tokenAddress = tokens.find(
        (token) => token.value == selectedToken
      )?.address

      if (tokenAddress && selectedPayment) {
        BackendClient.getPaymentUrl({
          apiHost: currentBlockchain.url,
          ticker: currentCurrency,
          provider: selectedPayment,
          amount: Number(giveAmount),
          cryptoAddress: walletAddress,
          chainId: currentBlockchain.chain_id,
          tokenAddress,
          email
        })
      }
    }
  }

  useEffect(() => {
    setSelectedCurrency(currentCurrency)
  }, [currentCurrency])

  useEffect(() => {
    if (!selectedToken && tokens) {
      setSelectedToken(tokens[0].value)
    }
  }, [tokens, selectedToken])

  useEffect(() => {
    if (selectedCurrency && payments) {
      setProcessedPayments(
        payments
          .filter((payment) => payment.currency == selectedCurrency)
          .map((payment) => {
            return {
              value: payment.method,
              description: payment.method,
              min: payment.min,
              max: payment.max
            }
          })
      )
    }
  }, [selectedCurrency, payments])

  useEffect(() => {
    if (!selectedPayment && processedPayments) {
      setSelectedPayment(processedPayments[0].value)
    }
  }, [processedPayments, selectedPayment])

  return (
    <CurrencyForm
      defaultBlockchainIndex={defaultBlockchainIndex}
      blockchains={blockchains}
      defaultCurrencyIndex={
        defaultCurrencyIndex == -1 ? 0 : defaultCurrencyIndex
      }
      currentCurrency={selectedCurrency}
      currencies={currencies}
      defaultTokenIndex={0}
      currentToken={selectedToken}
      tokens={tokens}
      defaultPaymentIndex={0}
      currentPayment={selectedPayment}
      payments={processedPayments}
      currentWallet={walletAddress}
      giveAmount={giveAmount}
      email={email}
      rate={currentRate}
      firstLoad={firstLoad}
      onBlockchainChange={(blockchain) => {}}
      onCurrencyChange={setSelectedCurrency}
      onTokenChange={setSelectedToken}
      onPaymentChange={setSelectedPayment}
      onWalletChange={setWalletAddress}
      onGiveAmountChange={setGiveAmount}
      onEmailChange={setEmail}
      onSubmit={onSubmit}
    />
  )
}

export default BuyForm
