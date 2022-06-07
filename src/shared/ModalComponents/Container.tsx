import styled from "styled-components"
import { mobile } from "@/utils/constants"

type ContainerProps = {
  spanContent?: boolean
  fixed?: boolean
  allowScrolling?: boolean
  resetZIndex?: boolean
}

const Container = styled.div.attrs<ContainerProps>(({ allowScrolling }) => ({
  onWheel: (event: React.WheelEvent) =>
    !allowScrolling && event.cancelable && event.preventDefault(),
  onTouchMove: (event: React.TouchEvent) =>
    !allowScrolling && event.cancelable && event.preventDefault()
}))<ContainerProps>`
  position: ${(props) => (props.fixed ? "fixed" : "absolute")};
  top: 50%;
  left: ${(props) => (props.spanContent ? "50%" : "0")};
  transform: ${(props) =>
    props.spanContent ? "translate(-50%, -50%)" : "translateY(-50%)"};
  width: ${(props) => (props.spanContent ? "auto" : "calc(100% - 40px)")};
  background: var(--white);
  margin: 0 20px;
  z-index: ${(props) => (props.resetZIndex ? "1" : "100000")};
  border-radius: 0.526em;
  font-size: 1rem;
  padding: 1.052em 1.315em;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);

  @media only screen and (max-width: ${mobile}px) {
    margin: 0;
    width: ${(props) => (props.spanContent ? "auto" : "100%")};
    padding: 0.933em;
    border-radius: 0.666em;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }
`

export default Container
