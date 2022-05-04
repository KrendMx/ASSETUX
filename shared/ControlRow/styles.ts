import styled from "styled-components"
import ModalContainer from "../ModalComponents/Container"

import { mobile } from "@/src/constants"

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  & > * + * {
    margin-left: 10px;
  }
`

export const Controls = styled.div`
  display: flex;
  flex-direction: row;

  & > * + * {
    margin-left: 10px;
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
  border-radius: 10px;
  width: 127px;
  height: 49px;
  cursor: pointer;
  text-decoration: none;

  &:first-child {
    width: 62px;
  }

  @media only screen and (max-width: 770px) {
    width: ${(props) => (props.spanWidth ? "100%" : "127px")};

    &:first-child {
      width: ${(props) => (props.spanWidth ? "100%" : "127px")};
    }
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
