import React, { useState, useMemo } from "react"
import styled from "styled-components"
import Image from "next/image"
import { mobile, optimizeRemoteImages } from "@/src/constants"
import type { Option } from "../types"

type ItemProps = {
  selectable?: boolean
}

const Item = styled.div<ItemProps>`
  padding: 12px 20px;
  border: 1px solid #d2d2d7;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 1rem;
  cursor: ${(props) => (props.selectable ? "pointer" : "default")};

  & > * + * {
    margin-left: 19px;
  }

  @media only screen and (max-width: ${mobile}px) {
    padding: 11px 15px;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;

    & > * + * {
      margin-left: 10px;
    }
  }
`

const Label = styled.h5`
  font-weight: 500;
  font-size: 0.8em;
  text-align: center;
  color: var(--gray);
  margin: 0;
  margin-top: 23px;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.87em;
    margin-top: -2px;
    margin-bottom: 11px !important;
  }

  @media only screen and (max-width: 370px) {
    font-size: 3.5vw;
  }
`

const ItemValue = styled.span`
  font-size: 1em;
  color: var(--gray);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067em;
  }
`

const Shadow = styled.div`
  flex-shrink: 0;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bgColor);
  border-radius: 10px;
  overflow: hidden;

  @media only screen and (max-width: 370px) {
    width: 30px;
    height: 30px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 24px;
  height: 24px;

  @media only screen and (max-width: 370px) {
    width: 14px;
    height: 14px;
  }
`

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 1em;
  color: var(--gray);

  &::placeholder {
    color: var(--gray);
    opacity: 1;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067em;
  }
`

type SearchProps = {
  options: Option[]
  onSelect: (selectedValue: string) => void
  display: number
  label?: string
  hide: boolean
}

function Search({ options, onSelect, display, label, hide }: SearchProps) {
  const [searchContext, setSearchContext] = useState("")
  const searchedOptions = useMemo(() => {
    const lowerCasedCtx = searchContext.toLowerCase()
    return options.filter((option) =>
      option.value.toLowerCase().startsWith(lowerCasedCtx)
    )
  }, [searchContext, options])

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    setSearchContext(value)
  }

  if (hide) {
    return null
  }

  return (
    <>
      {label && <Label>{label}</Label>}
      <Item>
        <Shadow />
        <Input
          type="text"
          placeholder="Start typing to search..."
          value={searchContext}
          onChange={handleInput}
        />
      </Item>
      {searchedOptions.slice(0, display).map((option) => (
        <Item
          key={option.value}
          onClick={() => {
            onSelect(option.value)
          }}
          selectable
        >
          {option.icon ? (
            <Shadow>
              <ImageContainer>
                <Image
                  src={option.icon}
                  layout="fill"
                  alt="Logo"
                  unoptimized={!optimizeRemoteImages}
                />
              </ImageContainer>
            </Shadow>
          ) : (
            <Shadow />
          )}
          <ItemValue>{option.description}</ItemValue>
        </Item>
      ))}
    </>
  )
}

export default Search
