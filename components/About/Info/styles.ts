import styled from "styled-components"

import AdaptiveFont from "@/shared/AdaptiveFont"

import { mobile } from "@/src/constants"

export const Container = styled.section`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
`

export const Title = styled.h3``

type ColoredProps = {
  colorIn: "red" | "green"
}

export const Colored = styled.span<ColoredProps>`
  color: ${(props) => (props.colorIn == "red" ? "var(--red)" : "var(--green)")};
`

export const SubTitleParagraph = styled.p`
  margin-top: 1.1em;
  color: var(--gray);
  font-weight: 400;
  font-size: 1.1em;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.335em;
  }
`

export const ExampleBlocks = styled(AdaptiveFont).attrs({
  mobileFactor: 1.335,
  tabletFactor: 1
})`
  margin-top: 2.2em;
  display: flex;
  flex-direction: row;

  & > *:first-child {
    margin-right: 48px;
  }

  @media only screen and (max-width: ${mobile}px) {
    flex-direction: column;

    & > *:first-child {
      margin-right: 0;
    }
  }
`

export const ExampleDescription = styled.div`
  & > *:first-child {
    margin-bottom: 0.5em;
  }
`

type ParagraphProps = {
  preLine?: boolean
}

export const Paragraph = styled.p<ParagraphProps>`
  font-size: 1em;
  font-weight: 400;
  color: #616161;
  white-space: ${(props) => (props.preLine ? "pre-line" : "normal")};
`

export const Bold = styled.span`
  font-weight: 600;
`

export const DescriptionSide = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ExampleBlock = styled.div`
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 2em 3.35em 3.26em 3.35em;

  @media only screen and (max-width: ${mobile}px) {
    padding: 1.8em 2.75em;
  }
`

type GoodBlockProps = {
  isLoading?: boolean
}

export const GoodBlock = styled(ExampleBlock)<GoodBlockProps>`
  width: 100%;
  margin-top: 2.1em;

  @media only screen and (max-width: ${mobile}px) {
    border: ${(props) => (props.isLoading ? "none" : "3px solid var(--green)")};
  }
`

type BadBlockProps = {
  isLoading?: boolean
}

export const BadBlock = styled(ExampleBlock)<BadBlockProps>`
  flex: 1 1 calc(100% - 6.7em);
  align-self: stretch;

  @media only screen and (max-width: ${mobile}px) {
    border: ${(props) => (props.isLoading ? "none" : "3px solid var(--red)")};
    margin-top: 0.6em;
  }
`

export const BlockTitle = styled.h4`
  font-size: 1.58em;
  color: var(--black);
  text-align: center;
  font-weight: 600;

  @media only screen and (max-width: ${mobile}px) {
    font-weight: 700;
    font-size: 1em;
  }
`

type BlockListProps = {
  decreaseMargins?: boolean
}

export const BlockList = styled.ul<BlockListProps>`
  margin-top: ${(props) => (props.decreaseMargins ? "1.578em" : "3em")};
  list-style: none;

  & > * + * {
    margin-top: 1em;
  }
`

export const BlockItem = styled.li`
  color: #616161;
  font-weight: 400;
  font-size: 1em;
  display: flex;
  flex-direction: row;

  & > * + * {
    margin-left: 0.63em;
  }
`

export const CheckMarkContainer = styled.span`
  flex-shrink: 0;
  display: inline-block;
  width: 26px;
  height: 21px;

  @media only screen and (max-width: ${mobile}px) {
    width: 14px;
    height: 11px;
  }
`

export const CloseMarkContainer = styled.span`
  flex-shrink: 0;
  display: inline-block;
  width: 19px;
  height: 19px;

  @media only screen and (max-width: ${mobile}px) {
    width: 11px;
    height: 11px;
  }
`
