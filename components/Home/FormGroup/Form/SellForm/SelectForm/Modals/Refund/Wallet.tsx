import React, { useState } from "react"
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
        <span>Please fill the required data to refund</span>
      </Title>
      <Info misc>
        Make sure you have access to the specified wallet. If you dont, we
        couldn&apos;t help you
      </Info>
      <InputSelect
        label="Wallet"
        id="refund_wallet"
        onChange={handleChange}
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
