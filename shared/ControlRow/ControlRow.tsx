import React, { useEffect } from "react"
import Link from "next/link"

import { useImmediateMobile, useToggle } from "@/src/hooks"
import { mobile } from "@/src/constants"
import { useAppDispatch } from "@/src/redux/hooks"
import { setHideBurgerButton } from "@/src/redux/uiSlice"

import Search from "@/shared/Search"
import Background from "../Background"
import { Container, Controls, Button, Modal, CloseButton } from "./styles"

import type { ControlRowProps } from "./types"

function ControlRow({
  searchPlaceholder,
  buttons,
  context,
  onContextChange
}: ControlRowProps) {
  const dispatch = useAppDispatch()

  const [showModal, toggleModal] = useToggle()
  const isMobile = useImmediateMobile(mobile)

  useEffect(() => {
    if (showModal) {
      manuallyToggleModal()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  const manuallyToggleModal = () => {
    toggleModal()
    dispatch(setHideBurgerButton(!showModal))
  }

  return (
    <>
      <Container>
        <Controls>
          {buttons ? (
            isMobile ? (
              <Button onClick={manuallyToggleModal}>Фильтр</Button>
            ) : (
              buttons.map((button) =>
                button.link ? (
                  <Link key={`${button.name}-link`} href={button.link} passHref>
                    <Button
                      active={button.active}
                      onClick={button.onClick}
                      as="a"
                    >
                      {button.name}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    key={button.name}
                    active={button.active}
                    onClick={button.onClick}
                  >
                    {button.name}
                  </Button>
                )
              )
            )
          ) : null}
        </Controls>
        <Search
          value={context}
          placeholder={searchPlaceholder}
          onChange={onContextChange}
        />
      </Container>
      {showModal && (
        <Background onClick={manuallyToggleModal}>
          <CloseButton onClick={manuallyToggleModal} />
          <Modal spanContent>
            {buttons
              ? buttons.map((button) =>
                  button.link ? (
                    <Link
                      key={`${button.name}-link`}
                      href={button.link}
                      passHref
                    >
                      <Button
                        active={button.active}
                        onClick={() => {
                          manuallyToggleModal()
                          button.onClick && button.onClick()
                        }}
                        as="a"
                        spanWidth
                      >
                        {button.name}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      key={button.name}
                      active={button.active}
                      onClick={() => {
                        manuallyToggleModal()
                        button.onClick && button.onClick()
                      }}
                      spanWidth
                    >
                      {button.name}
                    </Button>
                  )
                )
              : null}
          </Modal>
        </Background>
      )}
    </>
  )
}

export default ControlRow
