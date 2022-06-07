import styled, { css } from "styled-components"
import { maxWidth } from "@/styles/GlobalStyles"
import { tablet } from "@/utils/constants"
import type { ResponsiveProps } from "./types"

type ContainerProps = {
  horizPadding: number
  vertPadding: number
  toShow: number
  gap: number
  responsive?: ResponsiveProps[]
}

const Container = styled.div<ContainerProps>`
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

export default Container
