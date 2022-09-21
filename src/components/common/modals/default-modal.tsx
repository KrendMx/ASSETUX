import React from "react"
import Image from "next/image"
import { createPortal } from "react-dom"

import Background from "../background"
import Container from "../modal-components/Container"
import Title from "../modal-components/Title"
import Shadow from "../modal-components/Shadow"
import Icon from "../modal-components/Icon"
import Info from "../modal-components/Info"
import Button from "../modal-components/Button"

type DefaultModalProps = {
  title?: string
  content?: string
  onClose?: () => void
}

const DefaultModal = ({ title, content, onClose }: DefaultModalProps) => {
  return createPortal(
    <>
      <Background>
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
