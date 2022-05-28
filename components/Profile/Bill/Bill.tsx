import React, { useEffect, useState, useMemo, useRef } from "react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import Skeleton from "react-loading-skeleton"

import { useAppSelector } from "@/src/redux/hooks"
import { useIsomorphicLayoutEffect, useAuthorized } from "@/src/hooks"

import CryptoManager from "@/components/CryptoManager"
import InputSelect from "@/shared/InputSelect"
import ExchangeInfo from "@/shared/ExchangeInfo"
import HideableWithMargin from "@/components/Home/FormGroup/Form/HideableWithMargin"
import { FormHeading, Button } from "../shared/FormComponents"
import {
  Container,
  Paragraph,
  List,
  Item,
  FormContainer,
  Form,
  FormContent,
  ExchangeInfoWrapper
} from "./styles"

import { BackendClient, EcommerceClient } from "@/src/BackendClients"
import {
  currencies as definedCurrencies,
  mapCurrency,
  mapCurrencyName,
  mapShortCurrencyName
} from "@/src/currencies"
import { rateCheckInterval } from "@/src/constants"
import { validateDecimal } from "@/src/helpers"

import type { Profile } from "@/src/BackendClients/ecommerce/types"
import type { Option } from "@/shared/InputSelect/types"
import { FiatProvider, FiatRate } from "@/src/BackendClients/main/types"

const inputIds = {
  get: "get",
  send: "send",
  blockchains: "blockchains"
}

export type BillProps = Profile

function Bill({}: BillProps) {
  const { t } = useTranslation("profile-bill")
  const router = useRouter()
  const checkAuthorized = useAuthorized()

  const selectedBlockchain = useAppSelector(
    (state) => state.crypto.selectedBlockchain
  )
  const availableBlockchains = useAppSelector(
    (state) => state.crypto.availableBlockchains
  )
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )

  const [blockchains, setBlockchains] = useState<Option[] | null>(null)
  const [tokens, setTokens] = useState<Option[] | null>(null)
  const [currencies, setCurrencies] = useState<Option[] | null>(null)
  const [rates, setRates] = useState<FiatRate[] | null>(null)
  const [ranges, setRanges] = useState<{ min: number; max: number } | null>(
    null
  )
  const [inputError, setInputError] = useState("")
  const [submitValue, setSubmitValue] = useState<string>(t("copyLink"))

  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [get, setGet] = useState("")
  const [send, setSend] = useState("10000")

  const [getActive, setGetActive] = useState(false)
  const [waitingResponse, setWaitingResponse] = useState(false)

  const copyTimeout = useRef<NodeJS.Timeout | null>(null)

  const currentRate = useMemo(() => {
    if (!rates || !selectedToken || !selectedCurrency) {
      return null
    }

    const rate = rates.find((rate) => rate.name == selectedToken)

    return rate ? rate.buy[selectedCurrency] : null
  }, [rates, selectedToken, selectedCurrency])

  const loading =
    selectedToken == null ||
    selectedCurrency == null ||
    currentRate == null ||
    ranges == null

  const handleGet: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!currentRate || !ranges) {
      return
    }

    const value = event.target.value

    const [validated, result] = validateDecimal(value)

    if (!validated) {
      return
    }

    setGet(result)

    const resultNum = Number(result)

    const sendAmount = resultNum * currentRate

    if (sendAmount < ranges.min) {
      setInputError(t("minError", { min: ranges.min }))
    } else if (sendAmount > ranges.max) {
      setInputError(t("maxError", { max: ranges.max }))
    } else {
      setInputError("")
    }

    setSend(sendAmount.toFixed(2))
  }

  const handleSend: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!currentRate || !ranges) {
      return
    }

    const value = event.target.value

    const [validated, result] = validateDecimal(value)

    if (!validated) {
      return
    }

    setSend(result)

    const resultNum = Number(result)

    if (resultNum < ranges.min) {
      setInputError(t("minError", { min: ranges.min }))
    } else if (resultNum > ranges.max) {
      setInputError(t("maxError", { max: ranges.max }))
    } else {
      setInputError("")
    }

    const getAmount = resultNum / currentRate

    setGet(getAmount.toFixed(2))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    if (
      !selectedBlockchain ||
      !selectedToken ||
      !availableTokens ||
      !selectedCurrency
    ) {
      return
    }

    const token = checkAuthorized()

    if (!token) {
      router.push("/profile/login")

      return
    }

    const tokenId = availableTokens.find(
      (token) => token.symbol == selectedToken
    )?.id

    if (!tokenId) {
      return
    }

    if (copyTimeout.current != null) {
      clearTimeout(copyTimeout.current)
    }

    setWaitingResponse(true)

    setSubmitValue(t("loading"))

    const response = await EcommerceClient.createBill({
      token,
      chainId: selectedBlockchain.chain_id,
      tokensId: tokenId,
      amountIn: Number(send),
      sendAmount: Number(get),
      currency: selectedCurrency
    })

    setWaitingResponse(false)

    if (response.state == "success") {
      if ("clipboard" in navigator) {
        const link =
          window.location.protocol +
          "//" +
          window.location.host +
          `/profile/payment/${response.data.bill.id}`

        navigator.clipboard.writeText(link)

        setSubmitValue(t("copied"))

        setTimeout(() => {
          setSubmitValue(t("copyLink"))
          copyTimeout.current = null
        }, 2000)
      } else {
        setSubmitValue(t("copyLink"))
      }
    } else {
      setSubmitValue(t("copyLink"))
    }
  }

  useEffect(() => {
    if (!selectedBlockchain) {
      return
    }

    const fetch = async () => {
      const responses = await Promise.all([
        BackendClient.getFiatRates({
          apiHost: selectedBlockchain.url
        }),
        BackendClient.getFiatProviders({
          apiHost: selectedBlockchain.url
        })
      ])

      if (responses[0].state == "success") {
        setRates(responses[0].data)
      }

      if (responses[1].state == "success") {
        const fiatProviders = responses[1].data
        const buyProviders = fiatProviders.filter(
          (provider) => provider.type == "BUY"
        )

        const ranges = buyProviders.reduce(
          (prev, curr) => {
            if (curr.max > prev.max) {
              prev.max = curr.max
            }

            if (curr.min < prev.min) {
              prev.min = curr.min
            }

            return prev
          },
          {
            min: 0,
            max: 0
          }
        )

        setRanges(ranges)
      }
    }

    const mappedCurrencies = definedCurrencies.map((currency) => ({
      value: currency,
      description: mapCurrencyName(currency),
      shortDescription:
        mapShortCurrencyName(currency) + " " + mapCurrency(currency)
    }))

    if (mappedCurrencies.length > 0) {
      setCurrencies(mappedCurrencies)
      setSelectedCurrency(mappedCurrencies[0].value)
    }

    fetch()

    const rateInterval = setInterval(fetch, rateCheckInterval)

    return () => {
      clearInterval(rateInterval)
    }
  }, [selectedBlockchain])

  useEffect(() => {
    if (!availableBlockchains) {
      return
    }

    setBlockchains(
      availableBlockchains.map((blockchain) => {
        return {
          value: blockchain.title,
          description: blockchain.title,
          icon: blockchain.logo
        }
      })
    )
  }, [availableBlockchains])

  useEffect(() => {
    if (!availableTokens) {
      return
    }

    const mappedTokens = availableTokens
      .filter((token) => token.enabled)
      .map((token) => ({
        value: token.symbol,
        icon: token.logo_uri,
        description: token.name,
        shortDescription: token.name,
        address: token.address
      }))

    if (mappedTokens.length == 0) {
      return
    }

    setTokens(mappedTokens)
    setSelectedToken(mappedTokens[0].value)
  }, [availableTokens])

  useIsomorphicLayoutEffect(() => {
    if (!currentRate) {
      return
    }

    setGet((Number(send) / currentRate).toFixed(2))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRate])

  return (
    <>
      <CryptoManager getToken />
      <Container>
        <Paragraph>{t("p1")}</Paragraph>
        <List>
          <Item>{t("item1")}</Item>
          <Item>{t("item2")}</Item>
          <Item>{t("item3")}</Item>
        </List>
        <Paragraph>{t("p2")}</Paragraph>
        <FormContainer>
          <Form getActive={getActive} onSubmit={handleSubmit}>
            <FormContent>
              <FormHeading>
                {loading ? <Skeleton /> : t("formHeading")}
              </FormHeading>
              {!loading ? (
                <InputSelect
                  label={t("blockchain")}
                  id={inputIds.blockchains}
                  options={blockchains ? blockchains : undefined}
                  displayIcon
                  selectable={false}
                />
              ) : (
                <Skeleton containerClassName="input-skeleton" />
              )}
              <HideableWithMargin hide={false} margins>
                {!loading ? (
                  <InputSelect
                    label={t("get")}
                    id={inputIds.get}
                    options={tokens ? tokens : undefined}
                    onChange={handleGet}
                    value={get}
                    onSelect={setSelectedToken}
                    selectedValue={selectedToken}
                    onActiveChange={setGetActive}
                    displayInSelect={3}
                    changeable
                    onlyNumbers
                  />
                ) : (
                  <Skeleton containerClassName="input-skeleton" />
                )}
                <HideableWithMargin hide={getActive} margins>
                  <ExchangeInfoWrapper>
                    <ExchangeInfo
                      token={selectedToken}
                      currency={selectedCurrency}
                      rate={currentRate}
                      isLoading={loading}
                      placeholder={t("allIncluded")}
                      text=""
                    />
                  </ExchangeInfoWrapper>
                  <HideableWithMargin hide={false} margins>
                    {!loading ? (
                      <InputSelect
                        label={t("send", {
                          min: ranges.min,
                          max: ranges.max
                        })}
                        id={inputIds.send}
                        options={currencies ? currencies : undefined}
                        onChange={handleSend}
                        value={send}
                        selectedValue={selectedCurrency}
                        selectable={false}
                        error={inputError == "" ? undefined : inputError}
                        changeable
                        onlyNumbers
                      />
                    ) : (
                      <Skeleton containerClassName="input-skeleton" />
                    )}
                  </HideableWithMargin>
                </HideableWithMargin>
              </HideableWithMargin>
            </FormContent>
            {loading ? (
              <Skeleton containerClassName="button-skeleton" />
            ) : (
              !getActive && (
                <Button
                  type="submit"
                  disabled={get == "" || send == "" || waitingResponse}
                >
                  {submitValue}
                </Button>
              )
            )}
          </Form>
        </FormContainer>
      </Container>
    </>
  )
}

export default Bill
