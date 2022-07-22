import styled from "styled-components"

import AdaptiveFont from "@/components/common/adaptive-font"

import { mobileLayoutForTablet, mobile } from "@/lib/data/constants"

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
      margin-top: 2.895em;
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

export const Paragraph = styled(AdaptiveFont).attrs({
  as: "p",
  mobileFactor: 1.34,
  tabletFactor: 1.2
})`
  font-weight: 400;
  color: #616161;
  margin: 1.6315em 0;

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
  position: relative;
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

export const Stores = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;

  & > * + * {
    margin-top: 0.368em;
  }

  @media only screen and (max-width: ${breakPoint}px) {
    flex-direction: row;
    align-self: center;
    align-items: center;

    & > * + * {
      margin-top: 0;
      margin-left: 0.368em;
    }
  }
`

export const Store = styled.a`
  position: relative;
  width: 223px;
  line-height: 0;
  display: block;
  text-decoration: none;

  @media only screen and (max-width: 1360px) {
    width: 200px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 160px;
  }

  @media only screen and (max-width: ${breakPoint}px) {
    width: 10.7em;
  }
`
