import styled from "styled-components"

type ContentProps = {
  gap: number
  offsetX: number
}

const Content = styled.div<ContentProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  transform: ${(props) => `translateX(${props.offsetX}px)`};
  transition: transform .3s linear;
  
  & > *:not(:last-child) {
    margin-right: ${(props) => `${props.gap}px`}
  }
`

export default Content
