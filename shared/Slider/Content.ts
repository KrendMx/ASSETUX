import styled from "styled-components"

type ContentProps = {
  gap: number
  offsetX: number
  animate: boolean
}

const Content = styled.div.attrs<ContentProps>(({ offsetX }) => ({
  style: {
    transform: `translateX(${offsetX}px)`
  }
}))<ContentProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  transition: ${(props) => (props.animate ? "transform 0.3s linear" : "")};

  & > *:not(:last-child) {
    margin-right: ${(props) => `${props.gap}px`};
  }
`

export default Content
