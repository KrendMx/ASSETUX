import styled from "styled-components"

import { mobileLayoutForTablet, mobile } from "@/src/constants"

const breakPoint = 680

export const Container = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: var(--max-width);
  font-size: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    justify-items: center;
  }

  @media only screen and (max-width: ${breakPoint}px) {
    display: block;

    & > * + * {
      margin-top: 55px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    & > * + * {
      margin-top: 3em;
    }
  }
`

export const InfoBlock = styled.div`
  width: 76%;

  @media only screen and (max-width: 1360px) {
    width: 85%;
  }

  @media only screen and (max-width: ${breakPoint}px) {
    width: 100%;
  }
`

export const Paragraph = styled.p`
  font-size: 1em;
  font-weight: 400;
  color: #616161;
  margin: 31px 0;

  @media only screen and (max-width: ${mobile}px) {
    margin: 1.8em 0;
  }
`

export const Media = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: ${breakPoint}px) {
    width: 100%;
    justify-content: center;
  }
`

export const QRContainer = styled.div`
  width: 178px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 7px 19px rgba(0, 0, 0, 0.12);

  @media only screen and (min-width: 1131px) and (max-width: 1200px) {
    width: 150px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    display: none;
  }
`

export const ImageBlock = styled.div`
  justify-self: end;

  @media only screen and (max-width: ${breakPoint}px) {
    display: flex;
    justify-content: center;
  }
`

export const Stores = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;

  & > * + * {
    margin-top: 7px;
  }

  @media only screen and (max-width: ${breakPoint}px) {
    flex-direction: row;
    align-self: flex-start;

    & > * + * {
      margin-top: 0;
      margin-left: 7px;
    }
  }
`

export const Store = styled.div`
  width: 223px;

  @media only screen and (max-width: 1360px) {
    width: 200px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 160px;
  }

  @media only screen and (max-width: ${breakPoint}px) {
    width: 120px;
  }
`

export const InvestmentsContainer = styled.div`
  position: relative;
  width: 469px;
  height: 533px;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    max-width: 335px;
    height: 372px;
  }
`
