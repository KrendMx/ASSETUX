import React, { useRef, useState } from "react"
import styled from "styled-components"
import { IoIosSearch } from "react-icons/io"

import { mobile, mobileLayoutForTablet } from "@/src/constants"

const Container = styled.div`
  border-radius: 0.625em;
  border: 1px solid #d2d2d7;
  display: flex;
  width: 243px;
  font-size: 16px;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 140px;
    font-size: 11px;
  }

  @media only screen and (max-width: ${mobile}px) {
    width: 100%;
    font-size: 16px;
  }
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-radius: 0.625em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.875em 0 0.875em 1.3em;
  font-size: inherit;
  font-weight: 500;
  color: var(--gray);
  background: var(--white);

  &::placeholder {
    color: var(--gray);
  }
`

const IconButton = styled.button`
  flex: 0 0 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--gray);
  font-size: 25px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    font-size: 18px;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 25px;
  }
`

type SearchProps = {
  placeholder: string
  onChange?: (value: string) => void
}

function Search({ placeholder, onChange }: SearchProps) {
  const [searchContext, setSearchContext] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setSearchContext(value)

    onChange && onChange(value)
  }

  return (
    <Container>
      <Input
        placeholder={placeholder}
        ref={inputRef}
        value={searchContext}
        onChange={handleChange}
      />
      <IconButton
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }}
      >
        <IoIosSearch />
      </IconButton>
    </Container>
  )
}

export default Search
