import React, { useState, useRef } from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
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
import { useAuthorized } from "@/src/hooks"

import type { Profile, UserImage } from "@/src/BackendClients/ecommerce/types"
import type { RequestState } from "@/src/BackendClients/types"
import type { Nullable } from "@/src/helpers"

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
  widget: { nameCompany, logoCompanyName, backgroundCompanyName }
}: FormGroupProps) {
  const { t } = useTranslation("profile")
  const router = useRouter()

  const checkAuthorized = useAuthorized()

  const [wallet, setWallet] = useState(public_key)
  const [company, setCompany] = useState(nameCompany == null ? "" : nameCompany)
  const [logo, setLogo] = useState<Nullable<UserImage>>({
    name: logoCompanyName,
    img: null
  })
  const [background, setBackground] = useState<Nullable<UserImage>>({
    name: backgroundCompanyName,
    img: null
  })
  const [inputError, setInputError] = useState<
    Record<string, string | undefined>
  >({})
  const [requests, setRequests] = useState<
    Record<Widgets, RequestState | null>
  >({
    wallet: null,
    company: null
  })

  const [updatedWidget, setUpdatedWidget] = useState(false)

  const prevPublicKey = useRef(public_key)
  const prevCompany = useRef(nameCompany == null ? "" : nameCompany)
  const prevLogo = useRef(logoCompanyName)
  const prevBackground = useRef(backgroundCompanyName)

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

      const token = checkAuthorized()

      if (!token) {
        router.push("/profile/login")

        return
      }

      const response = await EcommerceClient.changeWallet({ wallet, token })

      if (response.state != "success") {
        if (
          response.state == "error" &&
          response.data.message == "Wallet is not valid"
        ) {
          setInputError((prev) => ({
            ...prev,
            [inputId.wallet]: t("walletError")
          }))
        } else if (
          response.state == "error" &&
          response.data.message == "The wallet must be unique"
        ) {
          setInputError((prev) => ({
            ...prev,
            [inputId.wallet]: t("walletUnique")
          }))
        } else {
          setInputError((prev) => ({
            ...prev,
            [inputId.wallet]: t("smthHappened")
          }))
        }

        setRequests((prev) => ({
          ...prev,
          wallet: { state: "error", error: null }
        }))

        return
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

    const token = checkAuthorized()

    if (!token) {
      router.push("/profile/login")

      return
    }

    let nameCompany: string | undefined = undefined
    if (prevCompany.current != company) {
      nameCompany = company
    }

    let logoCompany: UserImage | undefined = undefined
    if (
      logo.name != null &&
      logo.img != null &&
      prevLogo.current != logo.name
    ) {
      logoCompany = { name: logo.name, img: logo.img }
    }

    let backgroundCompany: UserImage | undefined = undefined
    if (
      background.name != null &&
      background.img != null &&
      prevBackground.current != background.name
    ) {
      backgroundCompany = { name: background.name, img: background.img }
    }

    const response = await EcommerceClient.changeCompany({
      nameCompany,
      logoCompany,
      backgroundCompany,
      token
    })

    setUpdatedWidget(false)

    if (response.state == "success") {
      setRequests((prev) => ({
        ...prev,
        company: { state: "success", result: null }
      }))

      prevCompany.current = company
      prevLogo.current = logo.name
      prevBackground.current = background.name
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

    if (requests.wallet?.state == "error") {
      setRequests((prev) => ({ ...prev, wallet: null }))
    }

    setInputError((prev) => ({
      ...prev,
      [inputId.wallet]: undefined
    }))
  }

  const handleSetCompany: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    setCompany(value)
    setUpdatedWidget(true)

    if (requests.company?.state == "error") {
      setRequests((prev) => ({
        ...prev,
        company: null
      }))
    }
  }

  const handleFile =
    (image: "companyLogo" | "companyBackground") => async (file: File) => {
      const validTypes = ["image/png", "image/jpeg"]

      const setError = (error?: string) =>
        setInputError((prev) => ({
          ...prev,
          [image]: error
        }))

      if (!validTypes.includes(file.type)) {
        setError(t("invalidImage"))

        return
      }

      try {
        const base64 = await toBase64(file)
        const name = file.name

        setError()
        setUpdatedWidget(true)

        if (requests.company?.state == "error") {
          setRequests((prev) => ({
            ...prev,
            company: null
          }))
        }

        if (image == "companyLogo") {
          setLogo({ img: base64, name })
        } else {
          setBackground({ img: base64, name })
        }
      } catch (_) {
        setError(t("invalidImage"))
      }
    }

  return (
    <Container>
      <Form as="section">
        <FormHeading>{t("balance")}</FormHeading>
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
          isLoading={requests.wallet?.state == "pending"}
          disabled={
            wallet == prevPublicKey.current ||
            (requests.wallet != null && requests.wallet.state != "success") ||
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
          accept=".png,.jpg,.jpeg"
          selectable={false}
          uploadedFileName={logo.name ? logo.name : undefined}
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
          accept=".png,.jpg,.jpeg"
          selectable={false}
          uploadedFileName={background.name ? background.name : undefined}
          changeable
          file
        />
        <Button
          type="submit"
          isLoading={requests.company?.state == "pending"}
          disabled={
            !updatedWidget ||
            (company == prevCompany.current &&
              logo.name == prevLogo.current &&
              background.name == prevBackground.current) ||
            inputError[inputId.companyLogo] != undefined ||
            inputError[inputId.companyBackground] != undefined ||
            (requests.company != null && requests.company.state != "success")
          }
        >
          {requests.company?.state == "pending" ? t("loading") : t("change")}
        </Button>
      </Form>
    </Container>
  )
}

export default FormGroup
