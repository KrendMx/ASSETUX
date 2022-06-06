import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

import InputSelect from "@/src/shared/InputSelect"
import Container from "@/src/shared/ModalComponents/Container"
import Title from "@/src/shared/ModalComponents/Title"
import ButtonsRow from "@/src/shared/ModalComponents/ButtonsRow"
import Button from "@/src/shared/ModalComponents/Button"
import Icon from "@/src/shared/ModalComponents/Icon"
import Shadow from "@/src/shared/ModalComponents/Shadow"

import type { Option } from "@/src/shared/InputSelect/types"

type ResultModalProps = {
  getToken?: Option
  getValue?: string
  onAccept?: () => void
}

function ResultModal({ getToken, getValue, onAccept }: ResultModalProps) {
  const { t } = useTranslation("home")

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
        <span>{t("home:sell_depositConfirmed")}</span>
      </Title>
      <InputSelect
        label={t("home:sell_got")}
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
