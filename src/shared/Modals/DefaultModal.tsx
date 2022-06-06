import React from "react"
import Image from "next/image"
import { createPortal } from "react-dom"

import Background from "../Background"
import Container from "../ModalComponents/Container"
import Title from "../ModalComponents/Title"
import Shadow from "../ModalComponents/Shadow"
import Icon from "../ModalComponents/Icon"
import Info from "../ModalComponents/Info"
import Button from "../ModalComponents/Button"

type DefaultModalProps = {
  title?: string
  content?: string
  onClose?: () => void
}

function DefaultModal({ title, content, onClose }: DefaultModalProps) {
  return createPortal(
    <>
      <Background onClick={() => onClose && onClose()}>
        <Container onClick={(event) => event.stopPropagation()} spanContent>
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
          <Button onClick={() => onClose && onClose()} main>
            OK
          </Button>
        </Container>
      </Background>
    </>,
    document.querySelector("#__next")!
  )
}

export default DefaultModal
