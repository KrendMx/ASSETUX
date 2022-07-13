import styled from "styled-components"

import ModalContainer from "../ModalComponents/Container"
import { mobile, mobileLayoutForTablet } from "@/lib/data/constants"

type ContainerProps = {
  spaceBetween?: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : "flex-end"};
  align-items: center;

  & > *:last-child {
    margin-left: 10px;
  }
`

export const Controls = styled.div`
  display: flex;
  flex-direction: row;

  & > * + * {
    margin-left: 10px;
  }

  @media only screen and (max-width: ${mobile}px) {
    display: none;
  }
`

type ButtonProps = {
  active?: boolean
  spanWidth?: boolean
}

export const Button = styled.button<ButtonProps>`
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.active ? "var(--blue)" : "var(--lightgray)")};
  color: ${(props) => (props.active ? "var(--white)" : "var(--gray)")};
  font-size: 16px;
  font-weight: 500;
  border-radius: 0.526em;
  width: 127px;
  height: 3.0625em;
  cursor: pointer;
  text-decoration: none;

  &:first-child {
    width: 62px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 73px;
    font-size: 11px;

    &:first-child {
      width: 40px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    width: ${(props) => (props.spanWidth ? "100%" : "73px")};
    font-size: 16px;

    &:first-child {
      width: ${(props) => (props.spanWidth ? "100%" : "127px")};
    }
  }
`

export const FilterButton = styled(Button)`
  display: none;

  @media only screen and (max-width: ${mobile}px) {
    display: flex;
  }
`

export const Modal = styled(ModalContainer)`
  width: 90%;
  font-size: 1rem;
  border-radius: 10px;
  padding: 40px 22px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin: 0;

  & > *:first-child {
    grid-row-start: 1;
    grid-column: 1 / span 3;
  }

  & > *:nth-child(2) {
    grid-row-start: 1;
    grid-column: 4 / span 4;
  }

  & > *:nth-child(3) {
    grid-row-start: 2;
    grid-column: 5 / span 3;
  }

  & > *:nth-child(4) {
    grid-row-start: 2;
    grid-column: 1 / span 4;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  right: 18px;
  top: 22px;
  border: none;
  outline: none;
  background: transparent;
  width: 20px;
  height: 20px;

  &::after,
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: top left;
    display: block;
    content: "";
    width: 20px;
    height: 2px;
    background: var(--white);
  }

  &::after {
    transform: rotate(45deg) translate(-50%, -50%);
  }

  &::before {
    transform: rotate(-45deg) translate(-50%, -50%);
  }
`
