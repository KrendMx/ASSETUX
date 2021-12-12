import React, { useState } from "react"
import type { ChangeEventHandler } from "react"
import Image from "next/image"
import styled from "styled-components"
import { IoIosArrowDown } from "react-icons/io"
import InputWrapper from "./InputWrapper"
import InputContainer from "./InputContainer"
import Label from "./Label"
import Input from "./Input"
import InfoContainer from "./InfoContainer"
import ImageContainer from "./ImageContainer"
import Bold from "./Bold"
import Arrow from "./Arrow"
import Container from "./Container"
import Search from "./Search"
import type { Option } from "./Search"

const Placeholder = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background-color: var(--bgColor);
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 10px;

  @media only screen and (max-width: 370px) {
    width: 30px;
    height: 30px;
  }
`

type InputSelectProps = {
  label?: string
  onSelect?: (selectedValue: string) => void
  onActiveChange?: (active: boolean) => void
  options?: Option[]
  changeable?: boolean
  defaultIndex?: number
  defaultValue?: string
  displayIcon?: boolean
  displayInSelect?: number
  selectLabel?: string
  id?: string
}

function InputSelect({
  label,
  onSelect,
  onActiveChange,
  options,
  changeable,
  selectLabel,
  id,
  displayIcon = false,
  defaultIndex = 0,
  defaultValue = "",
  displayInSelect = 3
}: InputSelectProps) {
  const hasOptions = options != undefined
  const [active, setActive] = useState(false)
  const [selectedValue, setSelectedValue] = useState(
    hasOptions ? options[defaultIndex].value : null
  )
  const [userInput, setUserInput] = useState(defaultValue)
  const hideLabel = active && changeable != undefined && changeable
  let selectedOption: Option | undefined
  if (hasOptions) {
    selectedOption = options.find((option) => option.value == selectedValue)
  }
  let displayedValue: string = ""
  if (changeable) {
    if (active) {
      if (selectedOption) {
        displayedValue = selectedOption.value
      }
    } else {
      displayedValue = userInput
    }
  } else {
    if (selectedOption) {
      displayedValue = selectedOption.value
    }
  }

  const toggle = () => {
    onActiveChange && onActiveChange(!active)
    setActive(!active)
  }

  const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    setUserInput(value)
  }

  const handleSelect = (selectedValue: string) => {
    onSelect && onSelect(selectedValue)
    setSelectedValue(selectedValue)
    toggle()
  }

  return (
    <Container resetFirstChild={selectLabel == "undefined"}>
      <InputWrapper active={active} bigger={hideLabel}>
        <InputContainer swap={hideLabel}>
          {!hideLabel && label && <Label htmlFor={id}>{label}</Label>}
          {hideLabel && <Placeholder />}
          <Input
            id={id}
            type="text"
            disabled={!changeable || hideLabel}
            value={displayedValue}
            onChange={handleInput}
          />
        </InputContainer>
        {selectedOption && (
          <InfoContainer
            onlyImage={selectedOption?.icon != undefined}
            onClick={toggle}
            active={active}
          >
            {displayIcon ? (
              selectedOption.icon ? (
                <ImageContainer>
                  <Image src={selectedOption.icon} layout="fill" alt="Logo" />
                </ImageContainer>
              ) : (
                <Placeholder />
              )
            ) : (
              <>
                {selectedOption.description && !hideLabel && (
                  <Label>{selectedOption.description}</Label>
                )}
                <Bold>{selectedOption.shortDescription}</Bold>
              </>
            )}
            <Arrow active={active} aria-label="Open">
              <IoIosArrowDown />
            </Arrow>
          </InfoContainer>
        )}
      </InputWrapper>
      {hasOptions && (
        <Search
          display={displayInSelect}
          options={options}
          onSelect={handleSelect}
          label={selectLabel}
          hide={!active}
        />
      )}
    </Container>
  )
}

export default InputSelect
