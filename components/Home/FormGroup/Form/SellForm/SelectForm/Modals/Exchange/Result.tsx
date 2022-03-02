import React from "react"
import Image from "next/image"
import InputSelect from "@/shared/InputSelect"
import Container from "@/shared/ModalComponents/Container"
import Title from "@/shared/ModalComponents/Title"
import ButtonsRow from "@/shared/ModalComponents/ButtonsRow"
import Button from "@/shared/ModalComponents/Button"
import Icon from "@/shared/ModalComponents/Icon"
import Shadow from "@/shared/ModalComponents/Shadow"

import type { Option } from "@/shared/InputSelect/types"

type ResultModalProps = {
  getToken?: Option
  getValue?: string
  onAccept?: () => void
}

function ResultModal({ getToken, getValue, onAccept }: ResultModalProps) {
  if (!getToken) {
    return null
  }

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
        <span>Deposit confirmed</span>
      </Title>
      <InputSelect
        label="You got"
        id="exchange_deposit_get"
        value={getValue}
        options={[getToken]}
        selectable={false}
      />
      <ButtonsRow>
        <Button onClick={onAccept} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default ResultModal
