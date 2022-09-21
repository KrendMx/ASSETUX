import { mobile } from "@/lib/data/constants"
import styled, { css } from "styled-components"

type StyledButtonProps = {
  active: boolean
}

export const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  & > *:not(:last-child) {
    margin-bottom: ${(props) => (props.active ? "0" : "5px")};
  }

  & > *:first-child {
    transform: ${(props) =>
      props.active ? "rotate(45deg) translate(1px, 1px)" : "none"};
  }

  & > *:last-child {
    transform: ${(props) =>
      props.active ? "rotate(-45deg) translate(1px, -1px)" : "none"};
  }

  & > *:nth-child(2) {
    display: ${(props) => (props.active ? "none" : "block")};
  }
`

export const Bar = styled.span`
  display: block;
  width: 20px;
  height: 3px;
  background-color: #000000;
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 var(--paddings);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

export const DesktopContainer = styled(Container)`
  @media only screen and (max-width: ${mobile}px) {
    display: none;
  }
`

export const RightContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
`

export const NavContainer = styled.nav`
  display: flex;
  height: 100%;
  flex-direction: row;
  margin-right: 32px;

  @media only screen and (max-width: 800px) {
    margin-right: 10px;
  }
`

type NavLinkProps = {
  as?: string
}

export const NavLink = styled.a<NavLinkProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 40px;
  font-size: 0.95em;
  font-weight: 500;
  text-decoration: none;
  color: var(--black);

  ${(props) =>
    props.as == "button" &&
    css`
      background: transparent;
      cursor: pointer;
      border: none;
      outline: none;
    `}

  @media only screen and (max-width: 800px) {
    padding: 0 15px;
  }

  @media only screen and (max-width: 600px) {
    padding: 0 12px;
  }
`
