import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import Button from '@/components/common/modal-components/Button'
import ButtonsRow from '@/components/common/modal-components/ButtonsRow'
import Container from './container'
import Icon from '@/components/common/modal-components/Icon'
import Shadow from '@/components/common/modal-components/Shadow'
import Info from '@/components/common/modal-components/Info'
import Title from '@/components/common/modal-components/Title'

type CodeInvalidProps = {
  onAccept: () => void
}

const CodeInvalid = ({ onAccept }: CodeInvalidProps) => {
  const { t } = useTranslation('home')

  return (
    <Container>
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
        <span>{t('home:orders_error')}</span>
      </Title>
      <Info>{t('home:orders_enteredInvalidCode')}</Info>
      <ButtonsRow>
        <Button onClick={onAccept} main>
          {t('home:orders_tryAgain')}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default CodeInvalid
