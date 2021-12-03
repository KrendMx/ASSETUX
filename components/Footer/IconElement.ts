import styled from "styled-components"

const IconElement = styled.li`
  display: flex;
  flex-direction: row;
  font-size: 0.75em;

  &:not(:last-child) {
    margin-bottom: 28px;
  }

  @media only screen and (max-width: 750px) {
    font-size: 0.8em;

    &:not(:last-child) {
      padding: 7px 0;
    }

    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`

export default IconElement
