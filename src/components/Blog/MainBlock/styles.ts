import styled, { css } from "styled-components"

import AdaptiveFont from "@/shared/AdaptiveFont"
import { mobile, mobileLayoutForTablet } from "@/lib/data/constants"

type ContainerProps = {
  hasPinned?: boolean
}

export const Container = styled(AdaptiveFont).attrs({
  tabletFactor: 0.85,
  mobileFactor: 0.74
})<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  justify-items: center;
  gap: 25px;

  ${(props) =>
    props.hasPinned &&
    css`
      & > *:first-child {
        grid-row-start: 1;
        grid-column: 1 / -1;
      }

      @media only screen and (max-width: ${mobile}px) {
        & > *:not(:first-child) {
          width: 93%;
        }
      }
    `}

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    gap: 10px;
  }

  @media only screen and (max-width: ${mobile}px) {
    grid-template-columns: 1fr;
    gap: 13px;
  }
`
