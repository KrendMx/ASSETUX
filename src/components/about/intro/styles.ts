import styled from "styled-components"

import AdaptiveFont from "@/components/common/adaptive-font"

import { mobile } from "@/lib/data/constants"

const breakPoint = 820

export const Container = styled(AdaptiveFont).attrs({
  as: "section",
  mobileFactor: 1.215,
  tabletFactor: 1
})`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: ${breakPoint}px) {
    flex-direction: column;
  }
`

export const AboutContainer = styled.div`
  flex: 1 1 calc(100% - 100px);
  padding-right: 100px;

  @media only screen and (max-width: ${breakPoint}px) {
    padding-right: 0;
  }
`

export const Title = styled.h1`
  font-weight: 600;

  && {
    font-size: 4.75em;

    @media only screen and (max-width: ${mobile}px) {
      font-size: 3.66em;
    }
  }
`

export const LeftTitle = styled.span`
  color: #616161;
`

export const RightTitle = styled.span`
  color: var(--black);
`

export const SubTitle = styled.h2`
  font-weight: 600;
  color: #616161;
  font-size: 2.21em;
  margin-top: 0.2em;
`

type ParagraphProps = {
  black?: boolean
  decreaseMargins?: boolean
  preLine?: boolean
}

export const Paragraph = styled.p<ParagraphProps>`
  color: ${(props) => (props.black ? "var(--black)" : "var(--gray)")};
  font-weight: ${(props) => (props.black ? 500 : 400)};
  margin-top: ${(props) => (props.decreaseMargins ? "1em" : "1.5em")};
  white-space: ${(props) => (props.preLine ? "pre-line" : "normal")};
  font-size: 1.1em;

  @media only screen and (max-width: ${mobile}px) {
    font-weight: 400;
    color: var(--gray);
  }
`

export const ImageContainer = styled.div`
  position: relative;
  flex: 1 1 100%;
  align-self: center;

  @media only screen and (max-width: ${breakPoint}px) {
    width: 80%;
  }

  @media only screen and (max-width: ${mobile}px) {
    width: 100%;
  }
`

export const SkeletonImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
