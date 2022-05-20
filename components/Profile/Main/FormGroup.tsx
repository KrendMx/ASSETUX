import React, { useState, useRef } from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { toChecksumAddress } from "web3-utils"

import {
  Form,
  Button,
  FormHeading,
  Balance,
  Paragraph
} from "../shared/FormComponents"
import InputSelect from "@/shared/InputSelect"
import AdaptiveFont from "@/shared/AdaptiveFont"

import { mobile } from "@/src/constants"
import { EcommerceClient } from "@/src/BackendClients"
import { toBase64 } from "@/src/helpers"

import type { Profile } from "@/src/BackendClients/ecommerce/types"
import type { RequestState } from "@/src/BackendClients/types"

const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.3335,
  tabletFactor: 1.25
})`
  max-width: 574px;
  display: grid;
  row-gap: 2.1em;

  @media only screen and (max-width: ${mobile}px) {
    gap: 1.466em;
  }
`

const inputId = {
  wallet: "wallet",
  email: "email",
  companyName: "companyName",
  companyLogo: "companyLogo",
  companyBackground: "companyBackground"
} as const

type Widgets = "wallet" | "company"

export type FormGroupProps = Profile

function FormGroup({
  email,
  public_key,
  widget: { nameCompany }
}: FormGroupProps) {
  const { t } = useTranslation("profile")
  const [wallet, setWallet] = useState(public_key)
  const [company, setCompany] = useState(nameCompany == null ? "" : nameCompany)
  const [logo, setLogo] = useState<string | null>(null)
  const [background, setBackground] = useState<string | null>(null)
  const [inputError, setInputError] = useState<
    Record<string, string | undefined>
  >({})
  const [requests, setRequests] = useState<
    Record<Widgets, RequestState | null>
  >({
    wallet: null,
    company: null
  })

  const prevPublicKey = useRef(public_key)
  const prevCompany = useRef(nameCompany)

  const handlePaymentSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    try {
      toChecksumAddress(wallet)

      setInputError((prev) => ({
        ...prev,
        [inputId.wallet]: undefined
      }))

      setRequests((prev) => ({
        ...prev,
        wallet: { state: "pending" }
      }))

      const response = await EcommerceClient.changeWallet({ wallet })

      if (response.state != "success") {
        setInputError((prev) => ({
          ...prev,
          [inputId.wallet]: t("smthHappened")
        }))
      }

      prevPublicKey.current = wallet

      setRequests((prev) => ({
        ...prev,
        wallet: { state: "success", result: null }
      }))
    } catch (e) {
      setInputError((prev) => ({
        ...prev,
        [inputId.wallet]: t("walletError")
      }))
    }
  }

  const handleWidgetSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    setRequests((prev) => ({
      ...prev,
      company: { state: "pending" }
    }))

    const response = await EcommerceClient.changeCompany({
      nameCompany: company,
      logoCompany: logo,
      backgroundCompany: background
    })

    prevCompany.current = company

    if (response.state == "success") {
      setRequests((prev) => ({
        ...prev,
        company: { state: "success", result: null }
      }))
    } else {
      setRequests((prev) => ({
        ...prev,
        company: { state: "error", error: null }
      }))
    }
  }

  const handleSetWallet: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    setWallet(value)

    setInputError((prev) => ({
      ...prev,
      [inputId.wallet]: undefined
    }))

    if (requests.wallet != null) {
      setRequests((prev) => ({
        ...prev,
        wallet: null
      }))
    }
  }

  const handleSetCompany: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    setCompany(value)

    if (requests.company != null) {
      setRequests((prev) => ({
        ...prev,
        company: null
      }))
    }
  }

  const handleFile =
    (image: "companyLogo" | "companyBackground") => async (file: File) => {
      try {
        const base64 = await toBase64(file)

        if (image == "companyLogo") {
          setLogo(base64)
        } else {
          setBackground(base64)
        }

        if (requests.company != null) {
          setRequests((prev) => ({
            ...prev,
            company: null
          }))
        }
      } catch (_) {
        setInputError((prev) => ({
          ...prev,
          [image]: t("invalidImage")
        }))
      }
    }

  return (
    <Container>
      <Form as="section">
        <FormHeading>{t("personalInfo")}</FormHeading>
        <Paragraph>{t("assets")}</Paragraph>
        {/* <Balance
          amount="1528540.00"
          icon="https://bscscan.com/token/images/busd_32.png"
          symbol="BUSD"
        />
        <Balance amount="1528540.00" icon="₽" symbol="BUSD" fiat /> */}
      </Form>
      <Form as="section">
        <FormHeading>{t("personalInfo")}</FormHeading>
        <InputSelect
          id={inputId.email}
          label="E-Mail"
          autocomplete="email"
          value={email}
          selectable={false}
        />
      </Form>
      <Form onSubmit={handlePaymentSubmit}>
        <FormHeading>{t("payment")}</FormHeading>
        <InputSelect
          id={inputId.wallet}
          label={t("wallet")}
          selectable={false}
          onChange={handleSetWallet}
          value={wallet}
          error={inputError[inputId.wallet]}
          changeable
        />
        <Button
          type="submit"
          disabled={
            wallet == prevPublicKey.current ||
            requests.wallet?.state == "pending" ||
            requests.wallet?.state == "success" ||
            inputError[inputId.wallet] != undefined
          }
        >
          {requests.wallet?.state == "pending" ? t("loading") : t("change")}
        </Button>
      </Form>
      <Form onSubmit={handleWidgetSubmit}>
        <FormHeading>{t("widgetPersonalization")}</FormHeading>
        <InputSelect
          id={inputId.companyName}
          error={
            requests.company?.state == "error" ? t("smthHappened") : undefined
          }
          label={t("nameYourCompany")}
          value={company}
          onChange={handleSetCompany}
          selectable={false}
          changeable
        />
        <InputSelect
          id={inputId.companyLogo}
          error={
            requests.company?.state == "error"
              ? t("smthHappened")
              : inputError[inputId.companyLogo]
          }
          label={t("logo")}
          onUpload={handleFile(inputId.companyLogo)}
          fileLabel={t("upload")}
          accept="image/.jpg,.jpeg,.png"
          selectable={false}
          changeable
          file
        />
        <InputSelect
          id={inputId.companyBackground}
          error={
            requests.company?.state == "error"
              ? t("smthHappened")
              : inputError[inputId.companyBackground]
          }
          label={t("background")}
          onUpload={handleFile(inputId.companyBackground)}
          fileLabel={t("upload")}
          accept="image/.jpg,.jpeg,.png"
          selectable={false}
          changeable
          file
        />
        <Button
          type="submit"
          disabled={
            (company == prevCompany.current &&
              logo == null &&
              background == null) ||
            company == "" ||
            inputError[inputId.companyLogo] != undefined ||
            inputError[inputId.companyBackground] != undefined ||
            requests.company?.state == "pending" ||
            requests.company?.state == "success" ||
            requests.company?.state == "error"
          }
        >
          {requests.company?.state == "pending" ? t("loading") : t("change")}
        </Button>
      </Form>
    </Container>
  )
}

export default FormGroup
