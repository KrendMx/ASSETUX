import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import InputSelect from '@/components/common/input-select'
import Container from '@/components/common/modal-components/Container'
import Title from '@/components/common/modal-components/Title'
import Info from '@/components/common/modal-components/Info'
import ButtonsRow from '@/components/common/modal-components/ButtonsRow'
import Button from '@/components/common/modal-components/Button'
import Shadow from '@/components/common/modal-components/Shadow'
import Icon from '@/components/common/modal-components/Icon'

import type { Option } from '@/components/common/input-select/types'

type RefundModalProps = {
  sentToken?: Option
  getToken?: Option
  sentValue?: string
  getValue?: string
  isLoading?: boolean
  onCancel?: () => void
  onAccept?: () => void
}

const RefundModal = ({
  sentToken,
  getToken,
  sentValue,
  getValue,
  isLoading,
  onCancel,
  onAccept
}: RefundModalProps) => {
  const { t } = useTranslation('home')

  if (!sentToken || !getToken) {
    return null
  }

  return (
    <Container allowScrolling>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Question.svg"
              layout="fill"
              alt="Question"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>{t('home:sell_confirm')}</span>
      </Title>
      <InputSelect
        label="You sent"
        id="refund_sent"
        value={sentValue}
        options={[sentToken]}
        selectable={false}
      />
      <Info>{t('home:sell_sureRefund')}</Info>
      <InputSelect
        label={t('home:sell_get')}
        id="refund_get"
        value={getValue}
        options={[getToken]}
        selectable={false}
      />
      <ButtonsRow>
        <Button onClick={onCancel}>Cancel</Button>
        <Button disabled={isLoading} onClick={onAccept} main>
          {isLoading ? t('home:sell_loading') : 'OK'}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundModal
