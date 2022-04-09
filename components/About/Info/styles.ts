import styled from "styled-components"

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
`

export const ExampleBlocks = styled.div`
  margin-top: 2.2em;
  display: flex;
  flex-direction: row;

  & > *:first-child {
    margin-right: 48px;
  }
`

export const ExampleDescription = styled.div`
  & > *:first-child {
    margin-bottom: 0.5em;
  }
`

export const Paragraph = styled.p`
  font-size: 1em;
  font-weight: 400;
  color: #616161;
`

export const Bold = styled.span`
  font-weight: 600;
`

export const DescriptionSide = styled.div`
  flex: 1 1 100%;
`

export const ExampleBlock = styled.div`
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 2em 3.35em 3.26em 3.35em;
`

export const GoodBlock = styled(ExampleBlock)`
  width: 100%;
  margin-top: 2.1em;
`

export const BadBlock = styled(ExampleBlock)`
  flex: 1 1 calc(100% - 6.7em);
  align-self: stretch;
`

export const BlockTitle = styled.h4`
  font-size: 1.58em;
  color: var(--black);
  text-align: center;
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
  display: inline-block;
  width: 26px;
  height: 21px;
`

export const CloseMarkContainer = styled.span`
  display: inline-block;
  width: 19px;
  height: 19px;
`
