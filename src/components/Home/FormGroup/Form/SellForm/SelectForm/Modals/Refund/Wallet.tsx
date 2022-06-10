import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

import Container from "@/shared/ModalComponents/Container"
import Title from "@/shared/ModalComponents/Title"
import Info from "@/shared/ModalComponents/Info"
import ButtonsRow from "@/shared/ModalComponents/ButtonsRow"
import Button from "@/shared/ModalComponents/Button"
import InputSelect from "@/shared/InputSelect"
import Icon from "@/shared/ModalComponents/Icon"
import Shadow from "@/shared/ModalComponents/Shadow"

type RefundWalletModalProps = {
  onCancel?: () => void
  onAccept?: (wallet: string) => void
}

function RefundWalletModal({ onCancel, onAccept }: RefundWalletModalProps) {
  const { t } = useTranslation("home")

  const [wallet, setWallet] = useState("")

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setWallet(value)
  }

  return (
    <Container>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Exclamation-blue.svg"
              layout="fill"
              alt="Exclamation"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>{t("home:sell_fillRequiredData")}</span>
      </Title>
      <Info misc>{t("home:sell_accessWallet")}</Info>
      <InputSelect
        label={t("home:sell_wallet")}
        id="refund_wallet"
        onChange={handleChange}
        onEnterPress={() => onAccept && onAccept(wallet)}
        value={wallet}
        changeable
      />
      <ButtonsRow>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onAccept && onAccept(wallet)} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundWalletModal
