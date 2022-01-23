import React from "react"
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

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  color: var(--gray);
  font-size: 25px;
`

function Search() {
  return (
    <Container>
      <Input placeholder="Search" />
      <IconContainer>
        <IoIosSearch />
      </IconContainer>
    </Container>
  )
}

export default Search
