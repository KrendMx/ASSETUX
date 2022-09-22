import React, { useState, useMemo, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { IoIosArrowDown } from 'react-icons/io'

import { ellipsisString } from '@/lib/utils/helpers'
import { optimizeRemoteImages } from '@/lib/data/constants'

import {
  Arrow,
  Bold,
  ChangeFileContainer,
  Container,
  ImageBox,
  ImageContainer,
  InfoContainer,
  Input,
  InputContainer,
  InputWrapper,
  Label,
  SelectedWrapper
} from './styles'
import Select from '../select'

import type { ChangeEventHandler } from 'react'
import { InputSelectProps } from './types.input'
import type { Option } from '../types'

const InputSelect = ({
  label,
  onSelect,
  onActiveChange,
  onEnterPress,
  options,
  changeable,
  selectLabel,
  onlyNumbers = false,
  file,
  fileLabel,
  accept,
  type = 'text',
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
  defaultValue = '',
  displayInSelect = 3,
  selectable = true,
  paleBorders = false,
  focused = false,
  visuallyDisabled = false,
  uploadedFileName,
  maxValue
}: InputSelectProps) => {
  const { t } = useTranslation('inputSelect')

  const hasOptions = options != undefined

  const [active, setActive] = useState(false)
  const [userInput, setUserInput] = useState({ value: defaultValue })

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

  let displayedValue: string = ''

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
    const value = event.target.value
    if (maxValue && +value > maxValue) {
      return
    }
    if (onChange) {
      onChange(event)
    }

    setUserInput({ value })
  }

  const handleUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files
    const file = files && files[0]

    if (!file) {
      return
    }

    onUpload && onUpload(file)
  }

  const handleSelect = (selectedValue: string) => {
    onSelect && onSelect(selectedValue)
    toggle()
  }

  return (
    <Container resetFirstChild={selectLabel == 'undefined'}>
      <InputWrapper
        active={active}
        error={error != undefined}
        paleBorders={paleBorders}
        visuallyDisabled={visuallyDisabled}
      >
        <InputContainer swap={hideLabel}>
          {!hideLabel && label && (
            <Label
              error={error != undefined}
              htmlFor={!file ? id : undefined}
              as={file ? 'span' : 'label'}
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
              ) : selectedOption?.shortDescription?.split(' ')[1] ? (
                selectedOption?.shortDescription?.split(' ')[1]
              ) : null}
            </ImageBox>
          )}
          {file && !uploadedFileName && (
            <Label htmlFor={id} file>
              {fileLabel}
            </Label>
          )}
          {file && uploadedFileName && (
            <Input value={uploadedFileName} disabled />
          )}
          <Input
            ref={inputRef}
            id={id}
            autoComplete={autocomplete ? autocomplete : 'off'}
            name={name ? name : id}
            type={file ? 'file' : type}
            inputMode={onlyNumbers ? 'decimal' : undefined}
            accept={file ? accept : undefined}
            disabled={!changeable || hideLabel}
            value={!file ? displayedValue : undefined}
            onChange={file ? handleUpload : handleInput}
            onKeyDown={(event) => {
              if (event.key == 'Enter') {
                onEnterPress && onEnterPress()
              }
            }}
            placeholder={placeholder}
          />
        </InputContainer>
        {file && uploadedFileName && (
          <ChangeFileContainer>
            <Label htmlFor={id} file>
              {t('change')}
            </Label>
          </ChangeFileContainer>
        )}
        {selectedOption && (
          <SelectedWrapper
            onClick={toggle}
            selectable={selectable}
            aria-label="Open"
            as={!selectable ? 'div' : undefined}
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
                <IoIosArrowDown color="#6E6E73" />
              </Arrow>
            )}
          </SelectedWrapper>
        )}
      </InputWrapper>
      {searchOptions && (
        <Select
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
