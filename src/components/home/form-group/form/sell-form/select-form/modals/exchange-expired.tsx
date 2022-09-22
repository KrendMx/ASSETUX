import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import styled from 'styled-components'
import Container from '@/components/common/modal-components/Container'
import Title from '@/components/common/modal-components/Title'
import Info from '@/components/common/modal-components/Info'
import ButtonsRow from '@/components/common/modal-components/ButtonsRow'
import Button from '@/components/common/modal-components/Button'
import Icon from '@/components/common/modal-components/Icon'
import Shadow from '@/components/common/modal-components/Shadow'
import InputSelect from '@/components/common/input-select'

import type { Option } from '@/components/common/input-select/types'

const Success = styled(Info)`
  background-color: #68cc4533;
  color: var(--green);
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
`

const Ahtung = styled(Info)`
  color: var(--red);
`

const ExchangeInfo = styled(Info)`
  color: var(--gray);
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`

type ExchangeExpiredProps = {
  onAccept: (review: string) => void
  getValue: string
  getToken?: Option
  sentValue: string
  sentToken?: Option
  rate: number
  minimalAmount: number
  orderId: string
}

function ExchangeExpired({
  onAccept,
  getValue,
  getToken,
  sentValue,
  sentToken,
  rate,
  minimalAmount,
  orderId
}: ExchangeExpiredProps) {
  const { t } = useTranslation('home')
  const [review, setReview] = useState('')

  const success = Number(getValue) >= minimalAmount

  if (!getValue || !getToken || !sentToken || !sentValue) {
    return null
  }

  return (
    <Container allowScrolling>
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
        <span>{t('home:sell_timedOut')}</span>
      </Title>
      <InputSelect
        label={t('home:sell_sent')}
        id="refund_sent"
        value={sentValue}
        options={[sentToken]}
        selectable={false}
      />
      {!success && (
        <ExchangeInfo misc>
          {t('home:sell_minimal')} - {minimalAmount} {getToken.value}
        </ExchangeInfo>
      )}
      {success && (
        <>
          <ExchangeInfo misc>
            <span>{t('home:sell_convert')}</span>
            <span>
              {rate} {getToken.value} / {sentToken.value}
            </span>
          </ExchangeInfo>
          <InputSelect
            label={t('home:sell_get')}
            id="refund_get"
            value={getValue}
            options={[getToken]}
            selectable={false}
          />
        </>
      )}

      {!success && <Ahtung>{t('home:sell_ahtung')}</Ahtung>}

      {success && (
        <>
          <Info>{t('home:sell_infoExchange')}</Info>
          <Success>
            <span>{t('home:sell_success')}</span>
            <span>
              {t('home:sell_operationId')}: {orderId}
            </span>
          </Success>
        </>
      )}

      <Info>{t('home:sell_review')}</Info>
      <InputSelect
        id="refund_review"
        label={t('home:sell_message')}
        value={review}
        onChange={(event) => setReview(event.target.value)}
        changeable
      />
      <ButtonsRow>
        <Button onClick={() => onAccept(review)} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default ExchangeExpired
