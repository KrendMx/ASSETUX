import React from "react"
import Image from "next/image"
import InputSelect from "../../../../InputSelect"
import Container from "../components/Container"
import Title from "../components/Title"
import ButtonsRow from "../components/ButtonsRow"
import Button from "../components/Button"
import Icon from "../components/Icon"
import Shadow from "../components/Shadow"

import type { Option } from "../../../../InputSelect/types"

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
