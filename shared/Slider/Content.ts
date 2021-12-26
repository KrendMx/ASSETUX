import styled from "styled-components"

type ContentProps = {
  swipedPixels: number
  animate: boolean
  currentIndex: number
}

const Content = styled.div.attrs<ContentProps>(
  ({ swipedPixels, currentIndex }) => ({
    style: {
      transform: `translateX(calc(var(--start-offset) + ${swipedPixels}px - (${currentIndex} * (var(--element-width) + var(--element-gap)))))`
    }
  })
)<ContentProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  transition: ${(props) => (props.animate ? "transform 0.3s linear" : "")};

  & > *:not(:last-child) {
    margin-right: var(--element-gap);
  }
`

export default Content
