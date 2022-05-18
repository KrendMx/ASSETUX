import styled, { css } from "styled-components"

import { mobileLayoutForTablet } from "@/src/constants"

export const BlockchainContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  & > * + * {
    margin-left: 8px;
  }
`
export const Close = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 15px;
  top: 15px;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;

  & > span:first-child {
    transform: rotate(-135deg);
  }

  & > span:last-child {
    transform: rotate(-45deg);
  }
`

export const CloseBar = styled.span`
  position: absolute;
  left: 5px;
  top: 14px;
  width: 19px;
  height: 2px;
  display: block;
  background: var(--black);
`

type ColoredProps = {
  colorIn: "red" | "green"
  split?: boolean
  as?: "button"
}

export const Colored = styled.span<ColoredProps>`
  font-size: inherit;
  background: none;
  border: none;
  outline: none;
  width: auto;
  display: inline;
  color: ${(props) => (props.colorIn == "red" ? "var(--red)" : "var(--green)")};
  text-align: left;
  font-weight: 500;
  cursor: ${(props) => (props.as == "button" ? "pointer" : "default")};

  ${(props) =>
    props.split &&
    css`
      display: block;
      width: 100%;

      & > span {
        display: block;
      }
    `}

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    font-size: 1.07em;
    display: block;
    margin-bottom: 0.5em;
  }
`

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 14px 25px;
  background: var(--white);
  position: fixed;
  overflow-y: hidden;
  font-size: 1rem;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    height: 100vh;
    position: absolute;
    overflow-y: auto;
  }
`

export const DataContainer = styled.div`
  max-height: 550px;
  overflow-y: auto;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    max-height: none;
    overflow-y: visible;
  }
`

export const PairContainer = styled.span`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    & > * + * {
      margin-left: 8px;
    }
  }
`
