import styled, { css } from "styled-components"

import { maxWidth } from "@/lib/styles/global"
import { tablet } from "@/lib/data/constants"

import type { ResponsiveProps } from "./types.slider"

type ContainerProps = {
  horizPadding: number
  vertPadding: number
  toShow: number
  gap: number
  responsive?: ResponsiveProps[]
}

export const Container = styled.div<ContainerProps>`
  --element-gap: ${(props) => `${props.gap}px`};
  --horizontal-padding: ${(props) => `${props.horizPadding}px`};
  --vertical-padding: ${(props) => `${props.vertPadding}px`};
  --to-show: ${(props) => props.toShow};
  // prettier-ignore
  --start-offset: calc(
    (
      100% -
        (
          var(--max-width) - (var(--paddings) * 2) - (var(--horizontal-padding) * 2)
        )
    ) / 2
  );
  // prettier-ignore
  --element-width: calc(
    (
      100% - (var(--element-gap) * (var(--to-show) - 1)) - 
      (var(--horizontal-padding) * 2) - (var(--start-offset) * 2)
    ) / var(--to-show)
  );

  ${(props) =>
    props.responsive?.map(
      (element) =>
        css`
          @media only screen and (max-width: ${element.resolution}px) {
            --element-gap: ${element.gap}px;
            --to-show: ${element.toShow};
          }
        `
    )}

  width: 100%;
  overflow: hidden;
  padding: var(--vertical-padding) var(--horizontal-padding);

  @media only screen and (max-width: ${maxWidth}px) {
    --start-offset: calc(var(--paddings) + var(--horizontal-padding));
  }

  @media only screen and (max-width: ${tablet}px) {
    --start-offset: calc(var(--paddings) * 2 + var(--horizontal-padding));
  }
`

type ContentProps = {
  swipedPixels: number
  animate: boolean
  currentIndex: number
}

export const Content = styled.div.attrs<ContentProps>(
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

export const Element = styled.div`
  flex: 0 0 var(--element-width);
`
