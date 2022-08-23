import React, { useMemo, useState } from "react"
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

import { EcommerceClient } from "@/lib/backend/clients"
import { emailRegexp } from "@/lib/data/constants"
import { stringToPieces } from "@/lib/utils/helpers"
import { env } from "@/lib/env/client.mjs"

import type { Bill } from "@/lib/backend/ecommerce/types"
import type { FiatProvider } from "@/lib/backend/main/types"
import type { Option } from "@/components/common/input-select/types"
import NetworkRow from "@/components/home/form-group/form/common/network-row"
import { mapTokens } from "@/components/home/form-group/form/form-controller"

const inputIds = {
  email: "email",
  phone: "phone",
  card: "cardnumber",
  wallet: "publickey"
}

export type PaymentProps = {
  bill: Bill
  providers: FiatProvider[]
  blockchainURL: string
}

function Payment(props: PaymentProps) {
  const { bill, providers, blockchainURL } = props
  const isTRANSFER = bill.ecommerceUser.mode == "TRANSFER"
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
  const [wallet, setWallet] = useState("")
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [waitingResponse, setWaitingResponse] = useState(false)

  const paymentOptions: Option[] = useMemo(
    () =>
      providers.map((provider) => ({
        icon: provider.logo
          ? env.hostProtocol + "://" + blockchainURL + provider.logo
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

  const handleAddress: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value.replaceAll(" ", "")
    const validated = /^[0-9a-zA-Z]*$/.test(value)
    validated && setWallet(value)
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
      creditCard: details,
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
                  maxWidth: 510,
                  height: 630
                }
              : {}
          }
        >
          <InputSelect
            label={t("toPay")}
            value={bill.amountIn.toString()}
            visuallyDisabled
          />
          {isTRANSFER && (
            <InputSelect
              label={t("home:buy_get")}
              id={"give"}
              value={bill.sendAmount + ""}
              selectedValue={bill.tokens.symbol}
              selectable={false}
              onlyNumbers
              options={mapTokens([bill.tokens])}
              changeable={false}
            />
          )}
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
            {isTRANSFER && <NetworkRow isLoading={false} />}
            {isTRANSFER && (
              <InputSelect
                label={t("home:buy_wallet")}
                id={"wallet"}
                onChange={handleAddress}
                value={wallet}
                error={errors[inputIds.wallet]}
                placeholder={"0x04A6eDc2Cd603D7a1D875479444A8ad2CEDf6d5f"}
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
