import styled, { css } from "styled-components"

type NavLinkProps = {
  bold?: boolean
  as?: "button"
}

const NavLink = styled.a<NavLinkProps>`
  display: block;
  width: 100%;
  padding: ${(props) => (props.bold ? "10px 0" : "8px 0")};
  text-decoration: none;
  color: ${(props) => (props.bold ? "var(--black)" : "var(--gray)")};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  font-size: ${(props) => (props.bold ? "1.7em" : "1.3em")};

  ${(props) =>
    props.as == "button" &&
    css`
      background: transparent;
      cursor: pointer;
      border: none;
      outline: none;
      text-align: left;
    `}
`

export default NavLink
