import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import Help from '@/components/common/exchange-info/help'
import { mobile } from '@/lib/data/constants'
import Skeleton from 'react-loading-skeleton'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 27px 0 14px 0;
  position: relative;
  font-size: 1em;
  padding-right: 1.8em;

  & > span {
    font-size: 0.8em;
    font-weight: 400;
    color: var(--gray);
  }

  @media only screen and (max-width: ${mobile}px) {
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    padding-right: 0;
  }

  @media only screen and (max-width: 370px) {
    & > span {
      font-size: 2.8vw;
    }
  }
`

const QuestionMark = styled.span`
  position: absolute;
  top: 50%;
  right: 7px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 19px;
  height: 19px;
  background-color: #0066cc1a;
  font-size: 12px;
  cursor: pointer;

  &::before {
    content: '?';
    color: var(--blue);
  }

  @media only screen and (max-width: ${mobile}px) {
    position: static;
    top: 0;
    right: 0;
    transform: none;
  }
`

type NetworkRowProps = {
  isLoading: boolean
}

function NetworkRow({ isLoading }: NetworkRowProps) {
  const { t } = useTranslation('home')

  const [hovered, setHovered] = useState(false)

  return (
    <Container>
      {!isLoading ? (
        <>
          <span>{t('home:network_sure')}</span>
          <QuestionMark
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
          {hovered && <Help offsetY={14}>{t('home:network_help')}</Help>}
        </>
      ) : (
        <Skeleton containerClassName="skeletonFlexContainer" />
      )}
    </Container>
  )
}

export default NetworkRow
