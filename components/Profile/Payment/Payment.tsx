import React, { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "next-i18next"
import { isValidPhoneNumber } from "libphonenumber-js"

import LanguageCurrencyChange from "@/components/Header/LanguageCurrencyChange"
import InputSelect from "@/shared/InputSelect"
import HideableWithMargin from "@/components/Home/FormGroup/Form/HideableWithMargin"
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

import { EcommerceClient } from "@/src/BackendClients"
import { emailRegexp } from "@/src/constants"
import { stringToPieces } from "@/src/helpers"
import config from "@/src/config"

import type { Bill } from "@/src/BackendClients/ecommerce/types"
import type { FiatProvider } from "@/src/BackendClients/main/types"
import type { Option } from "@/shared/InputSelect/types"

const inputIds = {
  email: "email",
  phone: "phone",
  card: "cardnumber"
}

export type PaymentProps = {
  bill: Bill
  providers: FiatProvider[]
  blockchainURL: string
}

function Payment({ bill, providers, blockchainURL }: PaymentProps) {
  const widget = bill.ecommerceUser.widget
  const displayHeader =
    widget.logoCompany != null ||
    (widget.nameCompany != null && widget.nameCompany != "")

  const { t } = useTranslation("profile-payment")

  const [selectedPayment, setSelectedPayment] = useState(
    providers.find((provider) => provider.method == "VISAMASTER")
      ? "QIWIVISAMASTER"
      : providers[0].method
  )
  const [paymentActive, setPaymentActive] = useState(false)
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState("")

  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [waitingResponse, setWaitingResponse] = useState(false)

  const paymentOptions: Option[] = useMemo(
    () =>
      providers.map((provider) => ({
        icon: provider.logo
          ? config.hostProtocol + "://" + blockchainURL + provider.logo
          : undefined,
        value:
          provider.method == "VISAMASTER" ? "QIWIVISAMASTER" : provider.method,
        description: provider.method
      })),
    [providers, blockchainURL]
  )

  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setEmail(value)
  }

  const handleCard: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value.replaceAll(" ", "")
    const validated = /^[0-9]*$/.test(value)

    validated && setDetails(value)
  }

  const handlePhone: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setDetails(value)
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

    setErrors((prev) => ({
      ...prev,
      [inputIds.email]: validEmail ? undefined : t("invalidEmail"),
      [inputIds.phone]: validPhone ? undefined : t("invalidPhone"),
      [inputIds.card]: validCard ? undefined : t("invalidCard")
    }))

    if (!validEmail || !validPhone || !validCard) {
      return
    }

    setWaitingResponse(true)

    const response = await EcommerceClient.createPayment({
      paymentMethod: selectedPayment,
      email,
      creditCard: details,
      ecommerceBillId: bill.id
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
        <Form onSubmit={handleSubmit}>
          <InputSelect
            label={t("toPay")}
            value={bill.amountIn.toString()}
            visuallyDisabled
          />
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
              />
            ) : (
              <InputSelect
                id={inputIds.card}
                value={stringToPieces(details, 4, " ")}
                onChange={handleCard}
                label={t("creditCard")}
                autocomplete="cc-number"
                error={errors[inputIds.card]}
                onlyNumbers
                changeable
              />
            )}
            <Submit disabled={waitingResponse}>
              {waitingResponse ? t("loading") : t("submit")}
            </Submit>
          </HideableWithMargin>
        </Form>
      </Content>
      <Footer>
        <Link href="/" passHref>
          <a>
            <PoweredBy />
          </a>
        </Link>
        <LanguageCurrencyChange direction="top" />
      </Footer>
    </>
  )
}

export default Payment
