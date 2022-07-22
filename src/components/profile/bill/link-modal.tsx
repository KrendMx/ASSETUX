import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import styled from "styled-components"
import Link from "next/link"

import Background from "@/shared/Background"
import Container from "@/shared/ModalComponents/Container"
import Title from "@/shared/ModalComponents/Title"
import Info from "@/shared/ModalComponents/Info"
import ButtonsRow from "@/shared/ModalComponents/ButtonsRow"
import Button from "@/shared/ModalComponents/Button"
import Icon from "@/shared/ModalComponents/Icon"
import Shadow from "@/shared/ModalComponents/Shadow"

const Payment = styled.a`
  text-decoration: none;
  color: var(--blue);
  font-weight: 500;
`

type LinkModalProps = {
  link: string
  onAccept?: () => void
}

function LinkModal({ link, onAccept }: LinkModalProps) {
  const { t } = useTranslation("profile-bill")

  return (
    <Background>
      <Container spanContent>
        <Title>
          <Shadow>
            <Icon>
              <Image
                src="/assets/Exclamation-blue.svg"
                layout="fill"
                alt="Question"
                objectFit="contain"
                objectPosition="center"
              />
            </Icon>
          </Shadow>
          <span>{t("paymentLink")}</span>
        </Title>

        <Info>
          <Link href={link} passHref>
            <Payment>{link}</Payment>
          </Link>
        </Info>

        <ButtonsRow>
          <Button onClick={onAccept} main>
            OK
          </Button>
        </ButtonsRow>
      </Container>
    </Background>
  )
}

export default LinkModal
