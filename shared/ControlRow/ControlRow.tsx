import React, { useState, useEffect } from "react"
import Link from "next/link"

import { useImmediateMobile } from "@/src/hooks"
import { mobile } from "@/src/constants"

import Search from "@/shared/Search"
import Background from "../Background"
import { Container, Controls, Button, Modal } from "./styles"

import type { ControlRowProps } from "./types"

function ControlRow({
  searchPlaceholder,
  buttons,
  onContextChange
}: ControlRowProps) {
  const [showModal, setShowModal] = useState(false)
  const isMobile = useImmediateMobile(mobile)

  useEffect(() => {
    if (showModal) {
      setShowModal(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  return (
    <>
      <Container>
        <Controls>
          {buttons ? (
            isMobile ? (
              <Button onClick={() => setShowModal(true)}>Фильтр</Button>
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
        <Search placeholder={searchPlaceholder} onChange={onContextChange} />
      </Container>
      {showModal && (
        <Background onClick={() => setShowModal(false)}>
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
                          setShowModal(false)
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
                        setShowModal(false)
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
