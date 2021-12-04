import styled from "styled-components"

type IconElementProps = {
  iconPath?: string | null
}

const IconElement = styled.li<IconElementProps>`
  font-size: 0.75em;

  &:first-child {
    margin-top: 7px;
  }

  & > * {
    display: inline-block;
  }

  &::before {
    display: ${(props) => (props.iconPath ? "inline-block" : "none")};
    content: "";
    vertical-align: top;
    width: 14px;
    height: 14px;
    background-image: ${(props) =>
      props.iconPath ? `url(${props.iconPath})` : "none"};
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 10px;
  }

  &:not(:last-child) {
    margin-bottom: 28px;
  }

  @media only screen and (max-width: 750px) {
    font-size: 0.8em;

    & {
      padding: 9px 0;
    }

    &:first-child {
      margin-top: 0;
    }

    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`

export default IconElement
