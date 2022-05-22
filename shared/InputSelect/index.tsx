import React, { useState, useMemo, useEffect, useRef } from "react"
import Image from "next/image"
import { IoIosArrowDown } from "react-icons/io"

import { ellipsisString } from "@/src/helpers"
import { optimizeRemoteImages } from "@/src/constants"

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
import SelectedWrapper from "./SelectedWrapper"
import ChangeFileContainer from "./ChangeFileContainer"

import type { Option } from "./types"
import type { ChangeEventHandler } from "react"

type InputSelectProps = {
  label?: string
  onSelect?: (selectedValue: string) => void
  onActiveChange?: (active: boolean) => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onUpload?: (file: File) => void
  value?: string
  placeholder?: string
  options?: Option[]
  changeable?: boolean
  defaultValue?: string
  displayIcon?: boolean
  displayInSelect?: number
  selectLabel?: string
  onlyNumbers?: boolean
  file?: boolean
  fileLabel?: string
  accept?: string
  type?: React.HTMLInputTypeAttribute
  id?: string
  name?: string
  error?: string
  selectable?: boolean
  selectedValue?: string | null
  autocomplete?: string
  paleBorders?: boolean
  focused?: boolean
}

function InputSelect({
  label,
  onSelect,
  onActiveChange,
  options,
  changeable,
  selectLabel,
  onlyNumbers = false,
  file,
  fileLabel,
  accept,
  type = "text",
  id,
  name,
  onChange,
  onUpload,
  value,
  selectedValue,
  error,
  autocomplete,
  placeholder,
  displayIcon = false,
  defaultValue = "",
  displayInSelect = 3,
  selectable = true,
  paleBorders = false,
  focused = false
}: InputSelectProps) {
  const hasOptions = options != undefined

  const [active, setActive] = useState(false)
  const [userInput, setUserInput] = useState({ value: defaultValue })
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const searchOptions = useMemo(
    () => options?.filter((option) => option.value != selectedValue),
    [selectedValue, options]
  )

  const inputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    if (!focused) {
      return
    }

    if (!inputRef.current) {
      return
    }

    inputRef.current.focus()
  }, [focused])

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

  const handleUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files
    const file = files && files[0]

    if (!file) {
      return
    }

    setUploadedFile(file.name)
    onUpload && onUpload(file)
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
        paleBorders={paleBorders}
      >
        <InputContainer swap={hideLabel}>
          {!hideLabel && label && (
            <Label
              error={error != undefined}
              htmlFor={!file ? id : undefined}
              as={file ? "span" : "label"}
            >
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
          {file && !uploadedFile && (
            <Label htmlFor={id} file>
              {fileLabel}
            </Label>
          )}
          {file && uploadedFile && <Input as="span">{uploadedFile}</Input>}
          <Input
            ref={inputRef}
            id={id}
            autoComplete={autocomplete ? autocomplete : "off"}
            name={name ? name : id}
            type={file ? "file" : type}
            inputMode={onlyNumbers ? "decimal" : undefined}
            accept={file ? accept : undefined}
            disabled={!changeable || hideLabel}
            value={!file ? displayedValue : undefined}
            onChange={file ? handleUpload : handleInput}
            placeholder={placeholder}
          />
        </InputContainer>
        {file && uploadedFile && (
          <ChangeFileContainer>
            <Label htmlFor={id} file>
              Change
            </Label>
          </ChangeFileContainer>
        )}
        {selectedOption && (
          <SelectedWrapper
            onClick={toggle}
            selectable={selectable}
            aria-label="Open"
            as={!selectable ? "div" : undefined}
          >
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
                    <Label pointer={selectable}>
                      {selectedOption.shortDescription &&
                        ellipsisString(selectedOption.shortDescription, 5)}
                    </Label>
                  )}
                  <Bold>{selectedOption.value}</Bold>
                </>
              )}
            </InfoContainer>
            {selectable && (
              <Arrow active={active}>
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
