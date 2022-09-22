import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import InputSelect from '@/components/common/input-select'
import Container from '@/components/common/modal-components/Container'
import Title from '@/components/common/modal-components/Title'
import ButtonsRow from '@/components/common/modal-components/ButtonsRow'
import Button from '@/components/common/modal-components/Button'
import Icon from '@/components/common/modal-components/Icon'
import Shadow from '@/components/common/modal-components/Shadow'

import type { Option } from '@/components/common/input-select/types'

type ResultModalProps = {
  getToken?: Option
  getValue?: string
  onAccept?: () => void
}

function ResultModal({ getToken, getValue, onAccept }: ResultModalProps) {
  const { t } = useTranslation('home')

  if (!getToken) {
    return null
  }

  return (
    <Container allowScrolling>
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
        <span>{t('home:sell_depositConfirmed')}</span>
      </Title>
      <InputSelect
        label={t('home:sell_got')}
        id="exchange_deposit_get"
        value={getValue}
        options={[getToken]}
        selectable={false}
      />
      <ButtonsRow>
        <Button onClick={onAccept} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default ResultModal
