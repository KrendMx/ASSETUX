import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

import Container from "@/components/common/modal-components/Container"
import Title from "@/components/common/modal-components/Title"
import ButtonsRow from "@/components/common/modal-components/ButtonsRow"
import Button from "@/components/common/modal-components/Button"
import Icon from "@/components/common/modal-components/Icon"
import Info from "@/components/common/modal-components/Info"
import Shadow from "@/components/common/modal-components/Shadow"
import CodeInput from "@/components/common/modal-components/CodeInput"

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
    <Container allowScrolling>
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
