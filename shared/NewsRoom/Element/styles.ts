import styled from "styled-components"

import AdaptiveFont from "@/shared/AdaptiveFont"

import { mobile } from "@/src/constants"

export const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.5,
  tabletFactor: 1.2
})`
  width: 100%;
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ImgContainer = styled.div`
  display: block;
  width: 85%;
  position: relative;
`

export const InfoContainer = styled.div`
  padding: 32px 30px;
  width: 100%;

  @media only screen and (max-width: ${mobile}px) {
    padding: 20px 15px;
  }
`

export const Title = styled.h4`
  font-size: 1em;
  font-weight: 500;
  color: var(--black);
`

export const Description = styled.p`
  font-weight: 400;
  font-size: 0.78em;
  color: var(--gray);
  margin: 15px 0 18px;

  @media only screen and (max-width: ${mobile}px) {
    margin: 13px 0 15px;
  }
`

export const Info = styled.div`
  font-size: 0.78em;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`

export const ReadMore = styled.a`
  text-decoration: none;
  font-weight: 500;
  color: var(--blue);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.15em;
  }
`

export const PostDate = styled.time`
  font-weight: 400;
  color: var(--gray);
`
