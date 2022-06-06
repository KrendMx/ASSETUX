import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

import Container from "@/src/shared/ModalComponents/Container"
import Title from "@/src/shared/ModalComponents/Title"
import ButtonsRow from "@/src/shared/ModalComponents/ButtonsRow"
import Button from "@/src/shared/ModalComponents/Button"
import Icon from "@/src/shared/ModalComponents/Icon"
import Info from "@/src/shared/ModalComponents/Info"
import Shadow from "@/src/shared/ModalComponents/Shadow"
import CodeInput from "@/src/shared/ModalComponents/CodeInput"

type RefundCodeModalProps = {
  isLoading?: boolean
  onCancel?: () => void
  onAccept?: (code: string) => void
}

function RefundCodeModal({
  isLoading,
  onCancel,
  onAccept
}: RefundCodeModalProps) {
  const { t } = useTranslation("home")

  const [code, setCode] = useState("")

  return (
    <Container>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Exclamation-green.svg"
              layout="fill"
              alt="Exclamation"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>{t("home:sell_codeSent")}</span>
      </Title>
      <Info>{t("home:sell_enterCode")}</Info>
      <CodeInput onChange={(code) => setCode(code)} />
      <ButtonsRow>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          disabled={isLoading}
          onClick={() => onAccept && onAccept(code)}
          main
        >
          {isLoading ? t("home:sell_loading") : "OK"}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundCodeModal
