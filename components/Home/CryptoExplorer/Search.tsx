import React, { useRef } from "react"
import styled from "styled-components"
import { IoIosSearch } from "react-icons/io"
import { mobile } from "@/src/constants"

const Container = styled.div`
  border-radius: 10px;
  border: 1px solid #d2d2d7;
  display: flex;
  width: 243px;
  height: 49px;

  @media only screen and (max-width: ${mobile}px) {
    width: 100%;
  }
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 0 14px 21px;
  font-size: 16px;
  font-weight: 500;
  color: var(--gray);

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
`

function Search() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Container>
      <Input placeholder="Search" ref={inputRef} />
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
