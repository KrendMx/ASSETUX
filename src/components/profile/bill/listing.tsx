import React, { useEffect, useState, useMemo, useRef } from "react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import Skeleton from "react-loading-skeleton"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { useAuthorized } from "@/lib/hooks"

import CryptoManager from "@/components/common/crypto-manager"
import InputSelect from "@/components/common/input-select"
import ExchangeInfo from "@/components/common/exchange-info"
import HideableWithMargin from "@/components/home/form-group/form/common/hideable-with-margin"
import { FormHeading, Button } from "../common/form-components"
import {
  Container,
  FormContainer,
  Form,
  FormContent,
  ExchangeInfoWrapper,
  ContainerForListing
} from "./styles"
import LinkModal from "./link-modal"

import { BackendClient, EcommerceClient } from "@/lib/backend/clients"
import {
  currencies as definedCurrencies,
  CurrenciesType,
  mapCurrency,
  mapCurrencyName,
  mapShortCurrencyName
} from "@/lib/data/currencies"
import { rateCheckInterval } from "@/lib/data/constants"
import { validateDecimal, getEcommercePrefix } from "@/lib/utils/helpers"

import type { Profile } from "@/lib/backend/ecommerce/types"
import type { Option } from "@/components/common/input-select/types"
import type { Blockchain, FiatRate } from "@/lib/backend/main/types"
import { setIsTransferer } from "@/lib/redux/ui"
import { env } from "@/lib/env/client.mjs"
import Client from "@/lib/backend/client"

const inputIds = {
  get: "get",
  send: "send",
  blockchains: "blockchains"
}

const mapBlockchains = (blockchains: Blockchain[]): Option[] =>
  blockchains.map((blockchain) => {
    return {
      value: blockchain.title,
      description: blockchain.title,
      icon: blockchain.logo,
      chain_id: blockchain.chain_id
    }
  })

export type BillProps = { profile: Profile }

function ListingComponent({ profile }: BillProps) {
  const { token_info, mode } = profile
  const { t } = useTranslation("profile-listing")
  const router = useRouter()
  const checkAuthorized = useAuthorized()
  const isTRANSFER = mode == "TRANSFER"
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setIsTransferer(isTRANSFER))
  }, [dispatch, isTRANSFER])

  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const [currencies, setCurrencies] = useState<Option[] | null>(null)
  const [ranges, setRanges] = useState<{ min: number; max: number } | null>(
    null
  )
  const [inputError, setInputError] = useState("")
  const [submitValue, setSubmitValue] = useState<string>(t("copyLink"))
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [get, setGet] = useState({
    visible: "",
    actual: 0
  })
  const [send, setSend] = useState("10000")

  const [getActive, setGetActive] = useState(false)
  const [getCurrencyActive, setGetCurrencyActive] = useState(false)
  const [waitingResponse, setWaitingResponse] = useState(false)

  const [linkModalProps, setLinkModalProps] = useState<
    | {
        open: true
        link: string
      }
    | { open: false }
  >({ open: false })

  const copyTimeout = useRef<NodeJS.Timeout | null>(null)

  const loading = selectedCurrency == null || ranges == null
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )

  const handleGet: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (!ranges) {
      return
    }

    const value = event.target.value

    const [validated, result] = validateDecimal(value)

    if (!validated) {
      return
    }

    const sumWithFee = await EcommerceClient.calcFee(
      Number(result),
      selectedCurrency as CurrenciesType,
      "BUY",
      true
    )

    if (sumWithFee.state === "success") {
      setSend(Number(sumWithFee.data.data.amount.toFixed(2)) + "")

      const resultNum = Number(result)
      const sendRes = sumWithFee.data.data.amount
      const sendAmount = resultNum

      if (sendAmount < ranges.min || sendRes < ranges.min) {
        setInputError(t("minError", { min: ranges.min }))
      } else if (sendAmount > ranges.max || sendRes > ranges.max) {
        setInputError(t("maxError", { max: ranges.max }))
      } else {
        setInputError("")
      }
    }

    setGet({
      visible: result,
      actual: Number(result)
    })
  }

  const handleSend: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (!ranges) {
      return
    }

    const value = event.target.value

    const [validated, result] = validateDecimal(value)

    if (!validated) {
      return
    }

    setSend(result)

    const sumWithFee = await EcommerceClient.calcFee(
      Number(result),
      selectedCurrency as CurrenciesType,
      "BUY",
      false
    )

    if (sumWithFee.state === "success") {
      const amountRes = sumWithFee.data.data.amount
      setGet({
        visible: Number(amountRes.toFixed(2)) + "",
        actual: amountRes
      })

      const resultNum = Number(result)

      if (resultNum < ranges.min || +amountRes < ranges.min) {
        setInputError(t("minError", { min: ranges.min }))
      } else if (resultNum > ranges.max || +amountRes > ranges.max) {
        setInputError(t("maxError", { max: ranges.max }))
      } else {
        setInputError("")
      }
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault()

    const token = checkAuthorized()

    if (!token) {
      router.push(`${getEcommercePrefix()}/login`)
      return
    }

    if (copyTimeout.current != null) {
      clearTimeout(copyTimeout.current)
    }

    setWaitingResponse(true)

    setSubmitValue(t("loading"))

    setWaitingResponse(false)

    const link =
      window.location.protocol +
      "//" +
      window.location.host +
      `/payment_listing/${selectedToken}`

    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(link)

      setSubmitValue(t("copied"))

      setTimeout(() => {
        setSubmitValue(t("copyLink"))
        copyTimeout.current = null
      }, 2000)
    } else {
      setLinkModalProps({ open: true, link })

      setSubmitValue(t("copyLink"))
    }
  }

  useEffect(() => {
    const fetch = async (signal: AbortSignal) => {
      const response = await BackendClient.getFiatProviders({
        apiHost: `bsc.${env.host}`,
        signal
      })
      console.log(response)
      if (response.state == "success") {
        const fiatProviders = response.data
        const buyProviders = fiatProviders.filter(
          (provider) => provider.type == "BUY"
        )

        if (buyProviders.length != 0) {
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
              min: buyProviders[0].min,
              max: buyProviders[0].max
            }
          )

          setRanges(ranges)
        }
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
      setSelectedCurrency(
        mappedCurrencies.find(({ value }) => value === currentCurrency)
          ?.value || mappedCurrencies[0].value
      )
    }

    const controller = new AbortController()
    fetch(controller.signal)

    const rateInterval = setInterval(
      () => fetch(controller.signal),
      rateCheckInterval
    )

    return () => {
      clearInterval(rateInterval)
      controller.abort()
    }
  }, [currentCurrency])

  useEffect(() => {
    if (!availableTokens || isTRANSFER) {
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

    setSelectedToken(mappedTokens[0].value)
  }, [availableTokens, isTRANSFER])

  useEffect(() => {
    if (!token_info || !isTRANSFER) {
      return
    }

    const mappedTokens = token_info.map(({ token }) => ({
      value: token.symbol,
      icon: token.logo_uri,
      description: token.name,
      shortDescription: token.name,
      address: token.address,
      chain_id: token?.chain_id
    }))

    if (mappedTokens.length == 0) {
      return
    }

    setSelectedToken(mappedTokens[0].value)
  }, [token_info, isTRANSFER])

  useEffect(() => {
    t("copyLink") === submitValue &&
      !!selectedToken &&
      setSubmitValue(t("copyLink") + ` ${selectedToken}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitValue, selectedToken])

  useEffect(() => {
    ;(async () => {
      if (!selectedCurrency) return
      const sumWithFee = await EcommerceClient.calcFee(
        10000,
        selectedCurrency as CurrenciesType,
        "BUY",
        false
      )
      console.log("effect", sumWithFee)
      if (sumWithFee.state === "success") {
        console.log("sumWithFee", sumWithFee.data.data.amount)

        setGet({
          visible: Number(sumWithFee.data.data.amount.toFixed(2)) + "",
          actual: sumWithFee.data.data.amount
        })
        setSend(Number(sumWithFee.data.data.amountIn.toFixed(2)) + "")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrency])

  return (
    <>
      {linkModalProps.open && (
        <LinkModal
          link={linkModalProps.link}
          onAccept={() => setLinkModalProps({ open: false })}
        />
      )}
      <CryptoManager getToken />
      <ContainerForListing>
        {/* <Paragraph>{t("p1")}</Paragraph>
        <List>
          <Item>{t("item1")}</Item>
          <Item>{t("item2")}</Item>
          <Item>{t("item3")}</Item>
        </List>
        <Paragraph>{t("p2")}</Paragraph> */}
        <FormContainer>
          <Form
            getActive={getActive || getCurrencyActive}
            // onSubmit={handleSubmit}
            style={{ height: 300 }}
          >
            <FormContent>
              <FormHeading>
                {loading ? <Skeleton /> : t("formHeading")}
              </FormHeading>
              <HideableWithMargin hide={false} margins>
                {!loading ? (
                  <InputSelect
                    label={t("get")}
                    id={inputIds.send}
                    options={currencies ? currencies : undefined}
                    onChange={handleSend}
                    value={send}
                    selectedValue={selectedCurrency}
                    selectable={!!currencies && currencies.length > 1}
                    error={inputError == "" ? undefined : inputError}
                    changeable
                    onlyNumbers
                    onSelect={(val) => setSelectedCurrency(val)}
                    onActiveChange={setGetCurrencyActive}
                    displayInSelect={1}
                  />
                ) : (
                  <Skeleton containerClassName="input-skeleton" />
                )}
              </HideableWithMargin>
              <HideableWithMargin hide={false} margins>
                <ExchangeInfoWrapper>
                  <ExchangeInfo
                    isLoading={loading}
                    placeholder={t("allIncluded")}
                    text=""
                  />
                </ExchangeInfoWrapper>
              </HideableWithMargin>
              <HideableWithMargin hide={false} margins>
                {!loading ? (
                  <InputSelect
                    label={t("send", {
                      min: ranges.min,
                      max: ranges.max
                    })}
                    id={inputIds.send}
                    options={currencies ? currencies : undefined}
                    onChange={handleGet}
                    value={get.visible}
                    selectedValue={selectedCurrency}
                    selectable={!!currencies && currencies.length > 1}
                    error={inputError == "" ? undefined : inputError}
                    changeable
                    onlyNumbers
                    onSelect={(val) => setSelectedCurrency(val)}
                    onActiveChange={setGetCurrencyActive}
                    displayInSelect={1}
                  />
                ) : (
                  <Skeleton containerClassName="input-skeleton" />
                )}
              </HideableWithMargin>
            </FormContent>
          </Form>
        </FormContainer>
        <FormContainer>
          {loading ? (
            <Skeleton containerClassName="button-skeleton" />
          ) : (
            !getActive && (
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={get.visible == "" || send == "" || waitingResponse}
              >
                {submitValue}
              </Button>
            )
          )}
        </FormContainer>
      </ContainerForListing>
    </>
  )
}

export default ListingComponent
