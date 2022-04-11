import styled from "styled-components"

import { mobile, mobileLayoutForTablet } from "@/src/constants"

type ColoredSpanProps = {
  colorIn: "green" | "red"
}

export const ColoredSpan = styled.span<ColoredSpanProps>`
  color: ${(props) =>
    props.colorIn == "green" ? "var(--green)" : "var(--red)"};
`

export const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  margin-top: 110px;
  width: 100%;

  & > *:not(:last-child) {
    margin-bottom: 90px;
  }

  @media only screen and (max-width: 1340px) {
    & > *:not(:last-child) {
      margin-bottom: 50px;
    }
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 405px;
    margin-top: 0;

    & > *:not(:last-child) {
      margin-bottom: 30px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    width: 100%;

    & > *:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`

export const TextColumn = styled.div`
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;

  & > h1 {
    margin-bottom: 25px;
  }

  & > h2 {
    font-size: 1.1em;
    color: var(--gray);
    font-weight: 400;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    & > h1 {
      margin-bottom: 15px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    & > h1 {
      margin-bottom: 25px;
    }
  }
`

export const SponsorsContainer = styled.div`
  width: 75%;
  position: relative;

  @media only screen and (max-width: 1130px) {
    width: 70%;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 100%;
  }
`

type SponsorsProps = {
  isLoading: boolean
}

export const Sponsors = styled.div<SponsorsProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  visibility: ${(props) => (props.isLoading ? "hidden" : "visible")};

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`

export const SponsorContainer = styled.div`
  flex: 1 1 auto;
`

export const SkeletonContainer = styled.h1`
  width: 75%;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 100%;
  }
`
