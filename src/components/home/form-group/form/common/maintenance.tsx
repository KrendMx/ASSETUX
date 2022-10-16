import React, { CSSProperties, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import Container from '@/components/common/modal-components/Container'
import Icon from '@/components/common/modal-components/Icon'
import Info from '@/components/common/modal-components/Info'
import Shadow from '@/components/common/modal-components/Shadow'
import Title from '@/components/common/modal-components/Title'

import ExclamRed from '@/assets/Exclamation-red.svg'
import ButtonsRow from '@/components/common/modal-components/ButtonsRow'
import Button from '@/components/common/modal-components/Button'

const SmallContainer = styled(Container)`
  width: 72%;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 2;
`

const MerchantBackground = styled(Background)`
  border-radius: 10px;
`

const ColoredInfo = styled(Info)`
  color: #6e6e73;
`

const SkrollingColoredInfo = styled(ColoredInfo)<{ miniScroll?: boolean }>`
  max-height: ${(props) => (props?.miniScroll ? '100px' : '200px')};
  overflow-y: auto;
`

const Maintenance = ({ bgStyle }: { bgStyle?: CSSProperties }) => {
  const { t } = useTranslation('home')

  return (
    <Background style={bgStyle}>
      <SmallContainer allowScrolling resetZIndex>
        <Title>
          <Shadow>
            <Icon>
              <Image
                src="/assets/Exclamation-red.svg"
                layout="fill"
                alt="Exclamation"
                objectFit="contain"
                objectPosition="center"
              />
            </Icon>
          </Shadow>
          <span>{t('home:maintenance_title')}</span>
        </Title>
        <ColoredInfo misc>{t('home:maintenance_p1')}</ColoredInfo>
        <ColoredInfo misc>{t('home:maintenance_p2')}</ColoredInfo>
      </SmallContainer>
    </Background>
  )
}

export const MerchantPaymentMaintenance = ({
  tokenAmount,
  symbol
}: {
  tokenAmount: number
  symbol: string
}) => {
  const { t } = useTranslation('profile-listing')

  return (
    <MerchantBackground>
      <SmallContainer allowScrolling resetZIndex>
        <Title>
          <Shadow>
            <Icon>
              <Image
                src={ExclamRed}
                layout="fill"
                alt="Exclamation"
                objectFit="contain"
                objectPosition="center"
              />
            </Icon>
          </Shadow>
          <span>
            {t('maintenance_title', { X: `${tokenAmount} ${symbol}` })}
          </span>
        </Title>
        {tokenAmount > 0 ? (
          <ColoredInfo misc>
            {t('maintenance_p1', { X: `${tokenAmount} ${symbol}` })}
          </ColoredInfo>
        ) : (
          <ColoredInfo misc>{t('maintenance_p2')}</ColoredInfo>
        )}
      </SmallContainer>
    </MerchantBackground>
  )
}

export const EuroUsingWarning = ({
  setOpen,
  bgStyle,
  miniScroll
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
  bgStyle?: CSSProperties
  miniScroll?: boolean
}) => {
  const { t } = useTranslation('common')

  const handleClick = () => {
    sessionStorage.setItem('euro_accept', 'true')
    setOpen(false)
  }

  return (
    <Background style={bgStyle}>
      <SmallContainer allowScrolling resetZIndex>
        <Title>
          <Shadow>
            <Icon>
              <Image
                src={ExclamRed}
                layout="fill"
                alt="Exclamation"
                objectFit="contain"
                objectPosition="center"
              />
            </Icon>
          </Shadow>
          <span>{t('attention')}</span>
        </Title>
        <SkrollingColoredInfo misc miniScroll={miniScroll}>
          {t('euro_not_working_with')}
          {t('euro_not_working_countries')}
        </SkrollingColoredInfo>
        <ColoredInfo misc>{t('euro_not_working_continue')}</ColoredInfo>
        <ButtonsRow>
          <Button onClick={handleClick} main>
            OK
          </Button>
        </ButtonsRow>
      </SmallContainer>
    </Background>
  )
}

export default Maintenance
