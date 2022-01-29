import styled from "styled-components"

type IconContainerProps = {
  isLoading: boolean
}

const IconContainer = styled.div<IconContainerProps>`
  position: relative;
  width: 42px;
  height: 42px;
  padding: 9px;
  border-radius: 8px;
  background-color: var(--bgColor);
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.12);

  & img {
    opacity: ${(props) => (props.isLoading ? 0 : 1)};
  }
`

export default IconContainer
