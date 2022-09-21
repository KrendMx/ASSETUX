import styled, { css } from "styled-components"
import {
  ArrowContainerProps,
  ContainerProps,
  ElementProps,
  RowProps
} from "./types.table"

export const Container = styled.table<ContainerProps>`
  width: 100%;
  background-color: var(--bgColor);
  box-shadow: ${(props) =>
    props.withShadow ? "1px 4px 19px rgba(0, 0, 0, 0.12)" : "none"};
  border-radius: 10px;
  padding: ${(props) => props.customPaddings || "43px 21px"};
  border-spacing: 10px 0;
`

export const Head = styled.thead``

export const HeadElement = styled.th`
  font-size: 15px;
  color: var(--gray);
  text-align: center;
  font-weight: 500;
`

export const SortableHeading = styled.button`
  border: none;
  outline: none;
  background: transparent;
  font-weight: 500;
  font-size: 15px;
  color: var(--gray);
  cursor: pointer;
  display: inline-block;
  position: relative;
`

export const ArrowContainer = styled.span<ArrowContainerProps>`
  display: flex;
  position: absolute;
  top: 50%;
  transform: ${(props) =>
    props.shouldRotate
      ? "translateY(-50%) rotate(180deg)"
      : "translateY(-50%)"};
  right: -1.1em;
  font-size: 1em;
`

export const Row = styled.tr<RowProps>`
  ${(props) =>
    props.nRows &&
    css`
      & > *:nth-last-child(-n + ${props.nRows}) {
        width: 1px;
      }
    `}

  ${(props) =>
    props.collapseCols &&
    props.collapseCols.map(
      (col) => css`
        & > *:nth-child(${col}) {
          width: 1px;
        }
      `
    )}
`

export const Body = styled.tbody``

export const Element = styled.td<ElementProps>`
  font-size: 15px;
  color: var(--black);
  text-align: center;
  font-weight: 500;
  padding: ${(props) => props.paddings || "14px"} 0;
`
