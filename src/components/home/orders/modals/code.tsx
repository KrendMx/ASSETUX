import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import Container from './container'
import Title from '@/components/common/modal-components/Title'
import ButtonsRow from '@/components/common/modal-components/ButtonsRow'
import Button from '@/components/common/modal-components/Button'
import Icon from '@/components/common/modal-components/Icon'
import Shadow from '@/components/common/modal-components/Shadow'
import Info from '@/components/common/modal-components/Info'
import CodeInput from '@/components/common/modal-components/CodeInput'

type CodeProps = {
  isLoading?: boolean
  onCancel?: () => void
  onAccept?: (code: string) => void
}

const Code = ({ isLoading, onCancel, onAccept }: CodeProps) => {
  const { t } = useTranslation('home')

  const [code, setCode] = useState('')

  return (
    <Container>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Exclamation-green.svg"
              layout="fill"
              alt="Exclamation"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>{t('home:orders_codeSent')}</span>
      </Title>
      <Info>{t('home:orders_enterCode')}</Info>
      <CodeInput
        onChange={(code) => setCode(code)}
        onEnterPress={() => onAccept && onAccept(code)}
      />
      <ButtonsRow>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onAccept && onAccept(code)} main>
          {isLoading ? t('home:orders_loading') : 'OK'}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default Code
