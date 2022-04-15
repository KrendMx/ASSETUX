import React from "react"
import Image from "next/image"

import Background from "../Background"
import Container from "../ModalComponents/Container"
import Title from "../ModalComponents/Title"
import Shadow from "../ModalComponents/Shadow"
import Icon from "../ModalComponents/Icon"
import Info from "../ModalComponents/Info"

type DefaultModalProps = {
  title?: string
  content?: string
  onBackgroundClick?: () => void
}

function DefaultModal({
  title,
  content,
  onBackgroundClick
}: DefaultModalProps) {
  return (
    <>
      <Background onClick={() => onBackgroundClick && onBackgroundClick()} />
      <Container onClick={(event) => event.stopPropagation()} spanContent fixed>
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
          <span>{title}</span>
        </Title>
        <Info>{content}</Info>
      </Container>
    </>
  )
}

export default DefaultModal
