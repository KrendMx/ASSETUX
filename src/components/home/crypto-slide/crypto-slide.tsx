import React, { useMemo, useCallback, memo } from 'react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { setSelectedToken, swapAction } from '@/lib/redux/crypto'
import { mobile } from '@/lib/data/constants'
import { useSliderConfig } from '@/lib/hooks'
import Slider from '@/components/common/slider'
import type { Token } from '@/lib/backend/main/types.backend.main'
import type { ActionType } from '@/lib/redux/crypto/types.crypto'
import { getSkeletons, mapExplorerData } from './helpers.crypto-slide'

const Container = styled.section`
  display: block;
  width: 100%;
  height: 245px;

  // override page padding
  padding: 0 !important;

  @media only screen and (max-width: ${mobile}px) {
    height: auto;
  }
`

const CryptoSlide = () => {
  const dispatch = useAppDispatch()
  const explorerData = useAppSelector((state) => state.crypto.explorerData)
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const currentAction = useAppSelector((state) => state.crypto.action)
  const sliderConfig = useSliderConfig()

  const handleAction = useCallback(
    (action: ActionType, token: Token) => {
      dispatch(swapAction(action))
      dispatch(setSelectedToken(token))
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    [dispatch]
  )

  const mappedTokens = useMemo(
    () =>
      explorerData &&
      mapExplorerData(
        explorerData,
        handleAction,
        currentCurrency,
        currentAction
      ),
    [explorerData, handleAction, currentCurrency, currentAction]
  )

  return (
    <Container>
      <Slider {...sliderConfig}>
        {mappedTokens ? mappedTokens : getSkeletons()}
      </Slider>
    </Container>
  )
}

export default memo(CryptoSlide)
