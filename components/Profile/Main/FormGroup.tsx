import React from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"

import { Form, Button, FormHeading, Balance } from "../shared/FormComponents"
import InputSelect from "@/shared/InputSelect"
import AdaptiveFont from "@/shared/AdaptiveFont"

import { mobile } from "@/src/constants"

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

function FormGroup() {
  const { t } = useTranslation("profile")

  const handlePersonalSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault()
  }

  const handlePaymentSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault()
  }

  const handleWidgetlSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault()
  }

  return (
    <Container>
      <Form as="section">
        <FormHeading>{t("personalInfo")}</FormHeading>
        <Balance
          amount="1528540.00"
          icon="https://bscscan.com/token/images/busd_32.png"
          symbol="BUSD"
        />
        <Balance amount="1528540.00" icon="₽" symbol="BUSD" fiat />
      </Form>
      <Form onSubmit={handlePersonalSubmit}>
        <FormHeading>{t("personalInfo")}</FormHeading>
        <InputSelect id="email" label="E-Mail" selectable={false} changeable />
        <Button type="submit">{t("change")}</Button>
      </Form>
      <Form onSubmit={handlePaymentSubmit}>
        <FormHeading>{t("payment")}</FormHeading>
        <InputSelect
          id="wallet"
          label={t("wallet")}
          selectable={false}
          changeable
        />
        <Button type="submit">{t("change")}</Button>
      </Form>
      <Form onSubmit={handleWidgetlSubmit}>
        <FormHeading>{t("widgetPersonalization")}</FormHeading>
        <InputSelect
          id="companyName"
          label={t("nameYourCompany")}
          selectable={false}
          changeable
        />
        <InputSelect
          id="companyLogo"
          label={t("logo")}
          onUpload={() => {}}
          fileLabel={t("upload")}
          accept="image/*"
          selectable={false}
          changeable
          file
        />
        <InputSelect
          id="companyBackground"
          label={t("background")}
          onChange={() => {}}
          fileLabel={t("upload")}
          accept="image/*"
          selectable={false}
          changeable
          file
        />
        <Button type="submit">{t("change")}</Button>
      </Form>
    </Container>
  )
}

export default FormGroup
