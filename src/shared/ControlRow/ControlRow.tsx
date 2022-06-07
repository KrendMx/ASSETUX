import React, { useEffect } from "react"
import Link from "next/link"
import { useTranslation } from "next-i18next"

import { useImmediateMobile, useToggle } from "@/utils/hooks"
import { mobile } from "@/utils/constants"
import { useAppDispatch } from "@/redux/hooks"
import { setHideBurgerButton } from "@/redux/ui"

import Search from "@/shared/Search"
import Background from "../Background"
import {
  Container,
  Controls,
  Button,
  Modal,
  CloseButton,
  FilterButton
} from "./styles"

import type { ControlRowProps } from "./types"

function ControlRow({
  searchPlaceholder,
  buttons,
  context,
  onContextChange
}: ControlRowProps) {
  const { t } = useTranslation("controlRow")
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
      <Container spaceBetween={buttons != undefined}>
        {buttons && (
          <>
            <FilterButton onClick={manuallyToggleModal}>
              {t("filter")}
            </FilterButton>
            <Controls>
              {buttons.map((button) =>
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
              )}
            </Controls>
          </>
        )}
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
