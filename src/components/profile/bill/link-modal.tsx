import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import styled from "styled-components"
import Link from "next/link"

import Background from "@/components/common/background"
import Container from "@/components/common/modal-components/Container"
import Title from "@/components/common/modal-components/Title"
import Info from "@/components/common/modal-components/Info"
import ButtonsRow from "@/components/common/modal-components/ButtonsRow"
import Button from "@/components/common/modal-components/Button"
import Icon from "@/components/common/modal-components/Icon"
import Shadow from "@/components/common/modal-components/Shadow"

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
