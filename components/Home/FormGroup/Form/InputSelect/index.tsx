import React, { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import styled from "styled-components"
import { IoIosArrowDown } from "react-icons/io"
import InputWrapper from "./InputWrapper"
import InputContainer from "./InputContainer"
import Label from "./Label"
import Input from "./Input"
import InfoContainer from "./InfoContainer"
import ImageBox from "./ImageBox"
import ImageContainer from "./ImageContainer"
import Bold from "./Bold"
import Arrow from "./Arrow"
import Container from "./Container"
import Search from "./Search"
import { ellipsisString } from "@/src/helpers"
import { optimizeRemoteImages } from "@/src/constants"
import type { Option } from "./types"
import type { ChangeEventHandler } from "react"

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
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  options?: Option[]
  changeable?: boolean
  defaultValue?: string
  displayIcon?: boolean
  displayInSelect?: number
  selectLabel?: string
  id?: string
  error?: boolean
  selectable?: boolean
  selectedValue?: string | null
}

function InputSelect({
  label,
  onSelect,
  onActiveChange,
  options,
  changeable,
  selectLabel,
  id,
  onChange,
  value,
  selectedValue,
  error = false,
  displayIcon = false,
  defaultValue = "",
  displayInSelect = 3,
  selectable = true
}: InputSelectProps) {
  const hasOptions = options != undefined
  const [active, setActive] = useState(false)
  const [userInput, setUserInput] = useState(defaultValue)
  const searchOptions = useMemo(
    () => options?.filter((option) => option.value != selectedValue),
    [selectedValue, options]
  )
  const hideLabel =
    active && ((changeable != undefined && changeable) || value != undefined)
  let selectedOption: Option | undefined
  if (hasOptions) {
    selectedOption = options.find((option) => option.value == selectedValue)
  }
  let displayedValue: string = ""

  // these ifs are cool but it should be refactored
  if (changeable) {
    if (active) {
      if (selectedOption && selectedOption.description) {
        displayedValue = selectedOption.description
      }
    } else {
      if (value != undefined) {
        displayedValue = value
      } else {
        displayedValue = userInput
      }
    }
  } else {
    if (value != undefined) {
      if (active) {
        if (selectedOption && selectedOption.description) {
          displayedValue = selectedOption.description
        }
      } else {
        displayedValue = value
      }
    } else if (selectedOption && selectedOption.description) {
      displayedValue = selectedOption.description
    }
  }

  const toggle = () => {
    onActiveChange && onActiveChange(!active)
    setActive(!active)
  }

  const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (onChange) {
      onChange(event)
    }
    const value = event.target.value
    setUserInput(value)
  }

  const handleSelect = (selectedValue: string) => {
    onSelect && onSelect(selectedValue)
    toggle()
  }

  return (
    <Container resetFirstChild={selectLabel == "undefined"}>
      <InputWrapper active={active} error={error} selectable={selectable}>
        <InputContainer swap={hideLabel}>
          {!hideLabel && label && <Label htmlFor={id}>{label}</Label>}
          {hideLabel &&
            (selectedOption && selectedOption.icon ? (
              <ImageBox>
                <ImageContainer>
                  <Image
                    src={selectedOption.icon}
                    width={24}
                    height={24}
                    layout="responsive"
                    alt="Logo"
                    unoptimized={!optimizeRemoteImages}
                  />
                </ImageContainer>
              </ImageBox>
            ) : (
              <Placeholder />
            ))}
          <Input
            id={id}
            autoComplete="off"
            type="text"
            disabled={!changeable || hideLabel}
            value={displayedValue}
            onChange={handleInput}
          />
        </InputContainer>
        {selectedOption && (
          <>
            <InfoContainer
              onlyImage={selectedOption?.icon != undefined}
              active={active}
              selectable={selectable}
            >
              {displayIcon ? (
                selectedOption.icon ? (
                  <ImageBox>
                    <ImageContainer>
                      <Image
                        src={selectedOption.icon}
                        width={24}
                        height={24}
                        layout="responsive"
                        alt="Logo"
                        unoptimized={!optimizeRemoteImages}
                      />
                    </ImageContainer>
                  </ImageBox>
                ) : (
                  <Placeholder />
                )
              ) : (
                <>
                  {selectedOption.description && !hideLabel && (
                    <Label>
                      {selectedOption.shortDescription &&
                        (selectable
                          ? ellipsisString(selectedOption.shortDescription, 5)
                          : selectedOption.shortDescription)}
                    </Label>
                  )}
                  <Bold>{selectedOption.value}</Bold>
                </>
              )}
            </InfoContainer>
            {selectable && (
              <Arrow active={active} aria-label="Open" onClick={toggle}>
                <IoIosArrowDown />
              </Arrow>
            )}
          </>
        )}
      </InputWrapper>
      {searchOptions && (
        <Search
          display={displayInSelect}
          options={searchOptions}
          onSelect={handleSelect}
          label={selectLabel}
          hide={!active}
        />
      )}
    </Container>
  )
}

export default InputSelect
