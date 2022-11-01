import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import Container from '@/components/common/modal-components/Container'
import Title from '@/components/common/modal-components/Title'
import ButtonsRow from '@/components/common/modal-components/ButtonsRow'
import Button from '@/components/common/modal-components/Button'
import Icon from '@/components/common/modal-components/Icon'
import Shadow from '@/components/common/modal-components/Shadow'
import Info from '@/components/common/modal-components/Info'

import ExclamRed from '@/assets/Exclamation-red.svg'

type NotEnoughProps = {
  min: number
  fiat: string
  onAccept?: () => void
}

const NotEnough = ({ min, fiat, onAccept }: NotEnoughProps) => {
  const { t } = useTranslation('home')

  return (
    <Container allowScrolling>
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
        <span>{t('home:sell_notEnoughTitle')}</span>
      </Title>
      {t<string, string[]>('home:sell_notEnoughDesc', {
        returnObjects: true,
        min,
        cur: fiat
      }).map((item) => (
        <Info key={item} misc>
          {item}
        </Info>
      ))}
      <ButtonsRow>
        <Button onClick={onAccept} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default NotEnough
