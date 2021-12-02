import React from "react"
import styled from "styled-components"
import { IoIosArrowUp } from "react-icons/io"

type ButtonProps = {
  active: boolean
}

const Button = styled.button<ButtonProps>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px 0;
  color: ${(props) => (props.active ? "var(--blue)" : "var(--black)")};

  svg {
    font-size: 1.3rem;
    transform: ${(props) => (props.active ? "rotate(0deg)" : "rotate(180deg)")};
  }
`

const ButtonTitle = styled.span`
  font-size: 1.7rem;
  font-weight: 600;
`

type NavButtonProps = {
  title: string
  onClick: () => void
  active: boolean
}

function NavButton({ title, onClick, active }: NavButtonProps) {
  return (
    <Button onClick={onClick} active={active}>
      <ButtonTitle>{title}</ButtonTitle>
      <IoIosArrowUp />
    </Button>
  )
}

export default NavButton
