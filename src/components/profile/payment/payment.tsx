import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "next-i18next"
import { isValidPhoneNumber } from "libphonenumber-js"

import Configure from "@/components/common/header/configure"
import InputSelect from "@/components/common/input-select"
import HideableWithMargin from "@/components/home/form-group/form/common/hideable-with-margin"
import {
  Header,
  Footer,
  Content,
  Form,
  LogoContainer,
  Name,
  Submit,
  PoweredBy
} from "./styles"

import {
  currencies as definedCurrencies,
  mapCurrency,
  mapCurrencyName,
  mapShortCurrencyName
} from "@/lib/data/currencies"

import { EcommerceClient } from "@/lib/backend/clients"
import { emailRegexp } from "@/lib/data/constants"
import { stringToPieces } from "@/lib/utils/helpers"
import { env } from "@/lib/env/client.mjs"

import type { Bill } from "@/lib/backend/ecommerce/types"
import type { FiatProvider, FiatRate } from "@/lib/backend/main/types"
import type { Option } from "@/components/common/input-select/types"
import NetworkRow from "@/components/home/form-group/form/common/network-row"
import { useAppSelector } from "@/lib/redux/hooks"
import { validatePhone } from "@/lib/backend/helpers"
import { VISAMASTER } from "@/core/backend/types"

const inputIds = {
  email: "email",
  phone: "phone",
  card: "cardnumber",
  wallet: "publickey"
}

export type PaymentProps<T, B> = {
  bill: T
  providers: FiatProvider[]
  blockchainURL: string
  fiatrate: B
}

function Payment(props: PaymentProps<Bill, FiatRate[]>) {
  const { bill, providers, blockchainURL } = props
  const isTRANSFER = bill.ecommerceUser.mode == "TRANSFER"
  const widget = bill.ecommerceUser.widget
  const displayHeader =
    widget.logoCompany != null ||
    (widget.nameCompany != null && widget.nameCompany != "")

  const { t } = useTranslation("profile-payment")
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const [selectedPayment, setSelectedPayment] = useState(
    providers.find((provider) => provider.method == VISAMASTER)
      ? "QIWIVISAMASTER"
      : providers[0].method
  )
  const [paymentActive, setPaymentActive] = useState(false)
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState("")
  const [wallet, setWallet] = useState("")
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [waitingResponse, setWaitingResponse] = useState(false)
  const [currencies, setCurrencies] = useState<Option[] | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(
    currentCurrency
  )
  const [getCurrencyActive, setGetCurrencyActive] = useState<boolean>(false)

  useEffect(() => {
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
  }, [currentCurrency])

  const paymentOptions: Option[] = useMemo(() => {
    const options = providers
      .filter(({ currency }) => currency === selectedCurrency)
      .map((provider) => ({
        icon: provider.logo
          ? env.hostProtocol + "://" + blockchainURL + provider.logo
          : undefined,
        value:
          provider.method == VISAMASTER ? "QIWIVISAMASTER" : provider.method,
        description: provider.method
      }))
    selectedCurrency !== "RUB" && setSelectedPayment(options[0].value)
    return options
  }, [providers, blockchainURL, selectedCurrency])

  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setEmail(value)
  }

  const handleCard: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value.replaceAll(" ", "")
    const validated = /^[0-9]*$/.test(value)

    validated && setDetails(value)
  }

  const handleAddress: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value.replaceAll(" ", "")
    const validated = /^[0-9a-zA-Z]*$/.test(value)
    validated && setWallet(value)
  }

  const handlePhone: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setDetails(value.length > details.length ? validatePhone(value) : value)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    const validEmail = email != "" && emailRegexp.test(email)
    const validPhone =
      selectedPayment == "QIWI"
        ? details != "" && isValidPhoneNumber(details, "RU")
        : true
    const validCard = selectedPayment != "QIWI" ? details.length == 16 : true
    const validWallet = !isTRANSFER || wallet.length === 42

    setErrors((prev) => ({
      ...prev,
      [inputIds.email]: validEmail ? undefined : t("invalidEmail"),
      [inputIds.phone]: validPhone ? undefined : t("invalidPhone"),
      [inputIds.card]: validCard ? undefined : t("invalidCard"),
      [inputIds.wallet]: validWallet ? undefined : t("invalidWallet")
    }))

    if (!validEmail || !validPhone || !validCard || !validWallet) {
      return
    }

    setWaitingResponse(true)

    const response = await EcommerceClient.createPayment({
      paymentMethod: selectedPayment,
      email,
      creditCard: details
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(" ", "")
        .replaceAll("-", ""),
      ecommerceBillId: bill.id,
      address: isTRANSFER ? wallet : undefined
    })

    setWaitingResponse(false)

    if (response.state != "success") {
      return
    }

    location.href = response.data.bill.linkToPayemntString
  }

  return (
    <>
      {displayHeader && (
        <Header>
          {widget.logoCompany && (
            <LogoContainer>
              <Image
                src={EcommerceClient.genericURL + widget.logoCompany}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt=""
              />
            </LogoContainer>
          )}
          {widget.nameCompany && <Name>{widget.nameCompany}</Name>}
        </Header>
      )}
      <Content
        displayHeader={displayHeader}
        style={
          widget.backgroundCompany
            ? {
                backgroundImage: `url(${
                  EcommerceClient.genericURL + widget.backgroundCompany
                })`
              }
            : undefined
        }
      >
        <Form
          onSubmit={handleSubmit}
          style={
            isTRANSFER
              ? {
                  maxWidth: 510
                }
              : {}
          }
        >
          <InputSelect
            label={t("toPay")}
            value={bill.sendAmount + ""}
            visuallyDisabled
            options={currencies ? currencies : undefined}
            selectedValue={selectedCurrency}
            onSelect={(val) => setSelectedCurrency(val)}
            onActiveChange={setGetCurrencyActive}
            displayInSelect={1}
            selectable={!!currencies && currencies.length > 1}
          />
          <HideableWithMargin hide={getCurrencyActive} space="0.842em">
            <InputSelect
              label={t("paymentMethod")}
              options={paymentOptions}
              selectedValue={selectedPayment}
              displayInSelect={1}
              onActiveChange={setPaymentActive}
              onSelect={(value) => {
                setSelectedPayment(value)
                setDetails("")
              }}
              displayIcon
              selectable
            />
            <HideableWithMargin hide={paymentActive} space="0.842em">
              <InputSelect
                id={inputIds.email}
                label={t("email")}
                placeholder="coolemail@gmail.com"
                autocomplete="email"
                value={email}
                onChange={handleEmail}
                error={errors[inputIds.email]}
                type="email"
                changeable
              />
              {selectedPayment == "QIWI" ? (
                <InputSelect
                  label={t("phoneNumber")}
                  id={inputIds.phone}
                  value={details}
                  onChange={handlePhone}
                  autocomplete="tel"
                  error={errors[inputIds.phone]}
                  type="tel"
                  changeable
                  placeholder="+7 (123) 456 7890"
                />
              ) : (
                <InputSelect
                  id={inputIds.card}
                  value={stringToPieces(details, 4, " ")}
                  onChange={handleCard}
                  label={t("creditCard")}
                  autocomplete="cc-number"
                  error={errors[inputIds.card]}
                  placeholder="0000 0000 0000 0000"
                  onlyNumbers
                  changeable
                />
              )}
              {isTRANSFER && <NetworkRow isLoading={false} />}
              {isTRANSFER && (
                <InputSelect
                  label={t("home:buy_wallet")}
                  id={"wallet"}
                  onChange={handleAddress}
                  value={wallet}
                  error={errors[inputIds.wallet]}
                  placeholder="0x09A6...d5B"
                  changeable
                />
              )}
              <Submit disabled={waitingResponse}>
                {waitingResponse ? t("loading") : t("submit")}
              </Submit>
            </HideableWithMargin>
          </HideableWithMargin>
        </Form>
      </Content>
      <Footer>
        {env.isStage ? (
          <Link href="/" passHref>
            <a>
              <PoweredBy />
            </a>
          </Link>
        ) : (
          <a href="https://assetux.com">
            <PoweredBy />
          </a>
        )}

        <Configure direction="top" />
      </Footer>
    </>
  )
}

export default Payment
