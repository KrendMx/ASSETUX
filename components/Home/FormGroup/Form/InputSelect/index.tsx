import React, { useState, useMemo } from "react"
import Image from "next/image"
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
import SelectedWrapper from "./SelectedWrapper"

type InputSelectProps = {
  label?: string
  onSelect?: (selectedValue: string) => void
  onActiveChange?: (active: boolean) => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  placeholder?: string
  options?: Option[]
  changeable?: boolean
  defaultValue?: string
  displayIcon?: boolean
  displayInSelect?: number
  selectLabel?: string
  id?: string
  error?: string
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
  error,
  placeholder = "",
  displayIcon = false,
  defaultValue = "",
  displayInSelect = 3,
  selectable = true
}: InputSelectProps) {
  const hasOptions = options != undefined
  const [active, setActive] = useState(false)
  const [userInput, setUserInput] = useState({ value: defaultValue })
  const searchOptions = useMemo(
    () => options?.filter((option) => option.value != selectedValue),
    [selectedValue, options]
  )
  const hideLabel =
    active && ((changeable != undefined && changeable) || value != undefined)
  let selectedOption: Option | undefined
  if (hasOptions) {
    if (selectable) {
      selectedOption = options.find((option) => option.value == selectedValue)
    } else {
      selectedOption = options[0]
    }
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
        displayedValue = userInput.value
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
    if (!selectable) {
      return
    }

    onActiveChange && onActiveChange(!active)
    setActive(!active)
  }

  const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (onChange) {
      onChange(event)
    }
    const value = event.target.value
    setUserInput({ value })
  }

  const handleSelect = (selectedValue: string) => {
    onSelect && onSelect(selectedValue)
    toggle()
  }

  return (
    <Container resetFirstChild={selectLabel == "undefined"}>
      <InputWrapper
        active={active}
        error={error != undefined}
        selectable={selectable}
      >
        <InputContainer swap={hideLabel}>
          {!hideLabel && label && (
            <Label error={error != undefined} htmlFor={id}>
              {error != undefined ? error : label}
            </Label>
          )}
          {hideLabel && (
            <ImageBox>
              {selectedOption && selectedOption.icon ? (
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
              ) : selectedOption?.shortDescription?.split(" ")[1] ? (
                selectedOption?.shortDescription?.split(" ")[1]
              ) : null}
            </ImageBox>
          )}
          <Input
            id={id}
            autoComplete="off"
            type="text"
            disabled={!changeable || hideLabel}
            value={displayedValue}
            onChange={handleInput}
            placeholder={placeholder}
          />
        </InputContainer>
        {selectedOption && (
          <SelectedWrapper onClick={toggle} selectable={selectable}>
            <InfoContainer
              onlyImage={displayIcon}
              active={active}
              selectable={selectable}
            >
              {displayIcon ? (
                <ImageBox>
                  {selectedOption.icon && (
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
                  )}
                </ImageBox>
              ) : (
                <>
                  {selectedOption.description && !hideLabel && (
                    <Label>
                      {selectedOption.shortDescription &&
                        ellipsisString(selectedOption.shortDescription, 5)}
                    </Label>
                  )}
                  <Bold>{selectedOption.value}</Bold>
                </>
              )}
            </InfoContainer>
            {selectable && (
              <Arrow active={active} aria-label="Open">
                <IoIosArrowDown />
              </Arrow>
            )}
          </SelectedWrapper>
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
