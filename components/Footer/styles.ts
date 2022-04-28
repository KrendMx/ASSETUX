import styled from "styled-components"

import { mobile } from "@/src/constants"

export const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  font-size: 1em;
`

type IconElementProps = {
  iconPath?: string | null
}

export const IconElement = styled.li<IconElementProps>`
  font-size: 0.75em;

  &:first-child {
    margin-top: 7px;
  }

  & > * {
    display: inline-block;
  }

  &::before {
    display: ${(props) => (props.iconPath ? "inline-block" : "none")};
    content: "";
    vertical-align: top;
    width: 14px;
    height: 14px;
    background-image: ${(props) =>
      props.iconPath ? `url(${props.iconPath})` : "none"};
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 10px;
  }

  &:not(:last-child) {
    margin-bottom: 28px;
  }

  @media only screen and (max-width: 650px) {
    font-size: 0.8em;

    & {
      padding: 9px 0;
    }

    &:first-child {
      margin-top: 0;
    }

    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`

type WrapperProps = {
  hide: boolean
}

export const Wrapper = styled.footer<WrapperProps>`
  background-color: var(--black);
  display: ${(props) => (props.hide ? "none" : "block")};
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  justify-content: space-between;
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 97px var(--paddings);

  @media only screen and (max-width: 650px) {
    grid-template-columns: repeat(6, auto);
    justify-content: space-between;
    padding: 26px var(--paddings);
    row-gap: 25px;

    & > *:nth-child(-n + 2) {
      grid-column: span 3;
    }

    & > *:nth-child(3) {
      grid-row-start: 2;
      grid-column: span 6;
    }

    & > *:nth-last-child(2) {
      grid-row-start: 3;
      grid-column: 1 / 4;
    }

    & > *:nth-last-child(1) {
      grid-row-start: 3;
      grid-column: 5 / 6;
    }
  }

  @media only screen and (max-width: 650px) {
    padding-bottom: 90px;
  }
`

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--white);
  font-size: 1rem;

  & > h3 {
    color: #6e6e73;
    font-weight: 600;
    font-size: 1em;
    margin-bottom: 23px;
  }

  @media only screen and (max-width: 650px) {
    & > h3 {
      margin-bottom: 5px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.97rem;

    & > h3 {
      font-size: 1.1em;
    }
  }
`

export const Bolder = styled.span`
  font-weight: 700;
`

type StyledLinkProps = {
  mobileSmall?: boolean
}

export const StyledLink = styled.a<StyledLinkProps>`
  display: block;
  text-decoration: none;
  color: var(--white);
  padding: 7px 0;
  font-weight: 400;
  font-size: 0.8em;

  @media only screen and (max-width: 650px) {
    font-size: ${(props) => (props.mobileSmall ? "0.7em" : "0.8em")};
    padding: ${(props) => (props.mobileSmall ? "6px 0" : "7px 0")};
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: ${(props) => (props.mobileSmall ? "0.86em" : "1em")};
  }
`
