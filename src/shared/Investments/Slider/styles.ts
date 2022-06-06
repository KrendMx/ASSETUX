import styled from "styled-components"

import { mobileLayoutForTablet } from "@/src/utils/constants"

const breakPoint = 680

export const FlexWrapper = styled.div`
  justify-self: end;
  display: flex;

  @media only screen and (max-width: ${breakPoint}px) {
    justify-content: center;
  }
`

export const Container = styled.div`
  position: relative;
  width: 469px;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 335px;
  }

  @media only screen and (max-width: ${breakPoint}px) {
    width: 100%;
  }
`

export const ImagePositioner = styled.div`
  position: relative;
  width: 100%;
  display: flex !important;
  flex-direction: row;
  justify-content: center;

  outline: none !important;
  box-shadow: none !important;
`

export const ImageContainer = styled.div`
  width: 71% !important;
  border-radius: 10px;
  overflow: hidden;
`

type SliderContainerProps = {
  visible?: boolean
}

export const SliderContainer = styled.div<SliderContainerProps>`
  height: ${(props) => (!props.visible ? "642px" : "auto")};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`
