import styled from 'styled-components'
import { mobileLayoutForTablet } from '@/lib/data/constants'

export const PairIconsContainer = styled.span`
  display: inline-block;
  width: 54px;
  height: 36px;
  position: relative;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    display: none;
  }
`

export const MobilePairIconsContainer = styled.span`
  width: 47px;
  height: 18px;
  display: none;
  position: relative;
  transform: translateY(-25%);

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    display: inline-block;
  }
`

export const RelativeIcon = styled.span`
  display: inline-block;
  width: 50%;
  height: 50%;
  position: relative;
`

export const PairIcon = styled.span`
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  box-shadow: -1px -1px 9px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--white);

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 26px;
    height: 26px;
  }
`

export const FrontIcon = styled(PairIcon)`
  left: 50%;
  transform: translateX(-25%);
  bottom: -9px;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    bottom: -100%;
    transform: none;
    right: 0;
    left: auto;
    top: 0;
  }
`

export const BackgroundIcon = styled(PairIcon)`
  left: 0;
  top: -9px;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    top: 0;
    left: 0;
  }
`

export const BlockchainIconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: var(--white);
  box-shadow: -1px 2px 9px rgba(0, 0, 0, 0.15);
`

export const BlockchainIcon = styled.span`
  display: inline-block;
  width: 50%;
  height: 50%;
  position: relative;
`
