import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import Button from '@/components/common/modal-components/Button'
import ButtonsRow from '@/components/common/modal-components/ButtonsRow'
import Container from '@/components/common/modal-components/Container'
import Icon from '@/components/common/modal-components/Icon'
import Shadow from '@/components/common/modal-components/Shadow'
import Info from '@/components/common/modal-components/Info'
import Title from '@/components/common/modal-components/Title'

import ExclamRed from '@/assets/Exclamation-red.svg'

type RefundCodeInvalidProps = {
  onAccept: () => void
}

const RefundCodeInvalid = ({ onAccept }: RefundCodeInvalidProps) => {
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
        <span>{t('home:sell_error')}</span>
      </Title>
      <Info>{t('home:sell_invalidCode')}</Info>
      <ButtonsRow>
        <Button onClick={onAccept} main>
          {t('home:sell_tryAgain')}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundCodeInvalid
