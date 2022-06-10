import styled from "styled-components"

import BaseContainer from "@/shared/BaseContainer"
import AdaptiveFont from "@/shared/AdaptiveFont"
import { mobile, mobileLayoutForTablet, tablet } from "@/utils/constants"

export const Container = styled(BaseContainer)`
  font-size: 1rem;
  padding: 8.78em var(--paddings);
  margin: 0 auto;
  max-width: var(--max-width);
  width: 100%;
  min-height: calc(100vh - var(--header-height));

  display: grid;
  column-gap: 85px;
  grid-template-columns: repeat(3, 1fr);

  @media only screen and (max-width: ${tablet}px) {
    padding: 4.5em var(--paddings);
    column-gap: 36px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    font-size: 0.735rem;
  }

  @media only screen and (max-width: 600px) {
    column-gap: 20px;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1rem;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    row-gap: 3.25em;
  }
`

export const Content = styled.article`
  grid-column: 1 / span 2;

  @media only screen and (max-width: ${mobile}px) {
    grid-column: 1 / -1;
  }
`

type TitleProps = {
  secondary?: boolean
}

export const Title = styled.h1<TitleProps>`
  margin-bottom: 0.71em;
  font-weight: 700;
  color: ${(props) => (props.secondary ? "var(--blue)" : "var(--dark-gray)")};

  && {
    font-size: 1.578em;
  }

  @media only screen and (max-width: ${mobile}px) {
    && {
      font-size: 2em;
    }
  }
`

export const PreviewImage = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
`

export const PostTime = styled.time`
  font-size: 1em;
  color: var(--gray);
  margin: 1.579em 0;
  width: 100%;
  text-align: right;
  display: block;
`

export const Text = styled.div`
  font-size: 1em;
  font-weight: 400;
  color: #616161;

  p {
    margin: 1em 0;

    &:first-child {
      margin-bottom: 1em;
      margin-top: 0;
    }

    &:last-child {
      margin-top: 1em;
      margin-bottom: 0;
    }
  }

  b,
  strong {
    font-weight: 700;
  }

  i,
  em {
    font-weight: 400;
    font-style: italic;
  }
`

export const RecentPosts = styled.div``

export const Column = styled(AdaptiveFont).attrs({
  mobileFactor: 0.75,
  tabletFactor: 0.78
})`
  & > * + * {
    margin-top: 1.944em;
  }

  @media only screen and (max-width: ${mobile}px) {
    & > * + * {
      margin-top: 0.87em;
    }
  }
`
