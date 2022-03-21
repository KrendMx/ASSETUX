import React from "react"
import styled from "styled-components"
import Image from "next/image"
import { useTranslation } from "next-i18next"

import Container from "@/shared/ModalComponents/Container"
import Icon from "@/shared/ModalComponents/Icon"
import Info from "@/shared/ModalComponents/Info"
import Shadow from "@/shared/ModalComponents/Shadow"
import Title from "@/shared/ModalComponents/Title"

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
`

const ColoredInfo = styled(Info)`
  color: #6e6e73;
`

function Maintenance() {
  const { t } = useTranslation("home")

  return (
    <Background>
      <Container>
        <Title>
          <Shadow>
            <Icon>
              <Image
                src="/assets/Exclamation-red.svg"
                layout="fill"
                alt="Exclamation"
                objectFit="contain"
                objectPosition="center"
              />
            </Icon>
          </Shadow>
          <span>{t("home:maintenance_title")}</span>
        </Title>
        <ColoredInfo misc>{t("home:maintenance_p1")}</ColoredInfo>
        <ColoredInfo misc>{t("home:maintenance_p2")}</ColoredInfo>
      </Container>
    </Background>
  )
}

export default Maintenance
