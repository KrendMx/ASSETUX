import styled from "styled-components"

import AdaptiveFont from "@/src/shared/AdaptiveFont"

import { mobile, mobileLayoutForTablet } from "@/src/utils/constants"

export const Container = styled.section`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto 7.89em auto;
`

export const Content = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    margin-bottom: 4.8em;
    flex-direction: column;
    align-items: center;
  }
`

export const AboutContainer = styled.div`
  flex: 1 1 50%;
  padding-top: 99px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  margin-right: 120px;

  & > h3 {
    margin-bottom: 1.9em;
  }

  @media only screen and (max-width: 1200px) {
    margin-right: 60px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    margin-right: 0;
  }
`

export const TextContainer = styled(AdaptiveFont).attrs({
  mobileFactor: 1.34,
  tabletFactor: 1.2
})`
  p {
    color: #616161;
    white-space: pre-line;
  }

  p:not(:last-child) {
    margin-bottom: 1.31em;
  }
`

export const ShowLink = styled.a`
  text-decoration: none;
  color: var(--white);
  background-color: var(--blue);
  width: 13em;
  height: 2.58em;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1em;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    margin: 0 auto;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.43em;
  }
`

export const ImageContainer = styled.div`
  align-self: flex-end;
  position: relative;
  flex: 1 1 50%;
  display: block;
  max-width: 596px;
  max-height: 596px;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    align-self: center;
    width: 100%;
  }
`

export const ShowLinkSkeletonContainer = styled.div`
  width: 13em;
  height: 2.58em;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    margin: 0 auto;
  }
`
