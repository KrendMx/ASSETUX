import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

import Container from "./Container"
import Title from "@/shared/ModalComponents/Title"
import Info from "@/shared/ModalComponents/Info"
import ButtonsRow from "@/shared/ModalComponents/ButtonsRow"
import Button from "@/shared/ModalComponents/Button"
import InputSelect from "@/shared/InputSelect"
import Icon from "@/shared/ModalComponents/Icon"
import Shadow from "@/shared/ModalComponents/Shadow"

import { emailRegexp } from "@/src/constants"

type EmailProps = {
  isLoading?: boolean
  onCancel?: () => void
  onAccept?: (email: string) => void
  errorMessage: string | null
}

function Email({ onCancel, onAccept, isLoading, errorMessage }: EmailProps) {
  const { t } = useTranslation("home")

  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setIsEmailValid(emailRegexp.test(value))

    setEmail(value)
  }

  return (
    <Container>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Question.svg"
              layout="fill"
              alt="Exclamation"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>{t("home:orders_myOperations")}</span>
      </Title>
      <Info>{t("home:orders_pleaseFill")}</Info>
      <InputSelect
        label={t("home:orders_email")}
        id={t("home:orders_refundWallet")}
        onChange={handleChange}
        value={email}
        error={
          errorMessage
            ? errorMessage
            : !isEmailValid && email != ""
            ? t("home:orders_invalidEmail")
            : undefined
        }
        changeable
      />
      <ButtonsRow>
        <Button onClick={onCancel}>{t("home:orders_cancel")}</Button>
        <Button
          onClick={() => onAccept && isEmailValid && onAccept(email)}
          main
        >
          {isLoading ? t("home:orders_loading") : "OK"}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default Email
