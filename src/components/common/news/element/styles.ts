import styled, { css } from 'styled-components'

import AdaptiveFont from '@/components/common/adaptive-font'

import { mobile, mobileLayoutForTablet } from '@/lib/data/constants'

type ContainerProps = {
  pinned?: boolean
}

export const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.5,
  tabletFactor: 1.2
})<ContainerProps>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  ${(props) =>
    props.pinned &&
    css`
      flex-direction: row-reverse;
      align-items: stretch;

      h4 {
        font-size: 2.578em;
        font-weight: 600;
      }

      p {
        font-size: 1em;
      }

      ${ImgContainer} {
        align-self: center;
      }

      ${InfoContainer} {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1.58em;
      }

      ${Info} {
        font-size: 1em;
      }

      @media only screen and (max-width: ${mobileLayoutForTablet}px) {
        h4 {
          font-size: 1.99em;
        }

        ${Info}, p {
          font-size: 0.959em;
        }
      }

      @media only screen and (max-width: ${mobile}px) {
        flex-direction: column;
        align-items: center;

        h4 {
          font-size: 1em;
        }

        ${InfoContainer} {
          padding: 0.6em 1.321em 1.2em;
        }
      }
    `}
`

export const ImgContainer = styled.div`
  display: block;
  width: 100%;
  position: relative;
`

export const InfoContainer = styled.div`
  padding: 1.2em 0.9em;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin: 0.789em 0 0.947em;
`

export const TextWrapper = styled.div``

export const Info = styled.div`
  font-size: 0.78em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
