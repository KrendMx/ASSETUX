import styled from "styled-components"

import AdaptiveFont from "@/shared/AdaptiveFont"

import { mobile } from "@/src/constants"

export const Container = styled.section`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
`

export const Title = styled.h3``

export const Content = styled(AdaptiveFont).attrs({
  mobileFactor: 1.34,
  tabletFactor: 1
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2em;
  height: 8em;

  & > * + * {
    margin-left: 10px;
  }

  @media only screen and (max-width: ${mobile}px) {
    height: auto;
    flex-direction: column;

    & > * + * {
      margin-left: 0;
      margin-top: 2.6em;
    }
  }
`

type ParagraphProps = {
  alignRight?: boolean
}

export const Paragraph = styled.p<ParagraphProps>`
  color: #616161;
  font-size: 1em;
  font-weight: 400;
  text-align: ${(props) => (props.alignRight ? "right" : "left")};
  white-space: pre-line;

  @media only screen and (max-width: 680px) {
    padding-left: 0;
  }

  @media only screen and (max-width: ${mobile}px) {
    text-align: left;
  }
`

export const News = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > * + * {
    margin-top: 1.185em;
  }
`

export const Support = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > * + * {
    margin-top: 1.185em;
  }
`

export const SupportButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > * + * {
    margin-left: 2.57em;
  }

  @media only screen and (max-width: ${mobile}px) {
    flex-direction: column;

    & > * + * {
      margin-top: 0.4em;
      margin-left: 0;
    }
  }
`

export const ButtonLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  color: var(--white);
  background: var(--blue);
  border-radius: 10px;
  width: 15em;
  height: 3em;
  font-weight: 500;
  font-size: 0.845em;

  & > * + * {
    margin-left: 1em;
  }

  @media only screen and (max-width: 680px) {
    width: 13em;
  }

  @media only screen and (max-width: ${mobile}px) {
    align-self: center;
    font-size: 1.065em;
    width: 15em;
  }
`

export const ButtonLinkSkeleton = styled.div`
  width: 15em;
  height: 3em;
  font-size: 0.845em;

  @media only screen and (max-width: 680px) {
    width: 13em;
  }

  @media only screen and (max-width: ${mobile}px) {
    align-self: center;
    font-size: 1.065em;
    width: 15em;
  }
`
