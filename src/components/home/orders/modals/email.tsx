import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import Container from './container'
import Title from '@/components/common/modal-components/Title'
import Info from '@/components/common/modal-components/Info'
import ButtonsRow from '@/components/common/modal-components/ButtonsRow'
import Button from '@/components/common/modal-components/Button'
import InputSelect from '@/components/common/input-select'
import Icon from '@/components/common/modal-components/Icon'
import Shadow from '@/components/common/modal-components/Shadow'

import { emailRegexp } from '@/lib/data/constants'

type EmailProps = {
  isLoading?: boolean
  onCancel?: () => void
  onAccept?: (email: string) => void
  errorMessage: string | null
}

const Email = ({ onCancel, onAccept, isLoading, errorMessage }: EmailProps) => {
  const { t } = useTranslation('home')

  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setIsEmailValid(emailRegexp.test(value))

    setEmail(value)
  }

  return (
    <Container>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Question.svg"
              layout="fill"
              alt="Exclamation"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>{t('home:orders_myOperations')}</span>
      </Title>
      <Info>{t('home:orders_pleaseFill')}</Info>
      <InputSelect
        label={t('home:orders_email')}
        id="orders_email"
        name="email"
        type="email"
        autocomplete="email"
        onChange={handleChange}
        onEnterPress={() => onAccept && isEmailValid && onAccept(email)}
        value={email}
        error={
          errorMessage
            ? errorMessage
            : !isEmailValid && email != ''
            ? t('home:orders_invalidEmail')
            : undefined
        }
        changeable
        focused
      />
      <ButtonsRow>
        <Button onClick={onCancel}>{t('home:orders_cancel')}</Button>
        <Button
          onClick={() => onAccept && isEmailValid && onAccept(email)}
          main
        >
          {isLoading ? t('home:orders_loading') : 'OK'}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default Email
