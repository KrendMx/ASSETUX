import styled from "styled-components"

import { mobileLayoutForTablet } from "@/utils/constants"

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

const BaseColored = styled.span`
  font-size: inherit;
  background: none;
  border: none;
  outline: none;
  width: auto;
  display: inline;

  text-align: left;
  font-weight: 500;
`

type ColoredProps = {
  colorIn: "red" | "green"
}

export const Colored = styled(BaseColored)<ColoredProps>`
  color: ${(props) => (props.colorIn == "red" ? "var(--red)" : "var(--green)")};
`

type StatusColoredProps = {
  status: string
}

export const StatusColored = styled(BaseColored)<StatusColoredProps>`
  color: ${(props) =>
    props.status == "closed"
      ? "var(--green)"
      : props.status == "pending"
      ? "#FACE5D"
      : "var(--red)"};
`

export const Container = styled.div`
  max-width: 1300px;
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
    border-radius: 0;
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

export const Action = styled.button`
  font-size: 1em;
  background: var(--blue);
  color: var(--white);
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  border: none;
  padding: 1.035em 2em;
  text-decoration: none;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    font-size: 15px;
    width: 100%;
  }
`

export const PagesContainer = styled.div`
  padding: 25px 0;
`
