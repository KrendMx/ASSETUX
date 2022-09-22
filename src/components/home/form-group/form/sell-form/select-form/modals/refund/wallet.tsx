import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import Container from '@/components/common/modal-components/Container'
import Title from '@/components/common/modal-components/Title'
import Info from '@/components/common/modal-components/Info'
import ButtonsRow from '@/components/common/modal-components/ButtonsRow'
import Button from '@/components/common/modal-components/Button'
import InputSelect from '@/components/common/input-select'
import Icon from '@/components/common/modal-components/Icon'
import Shadow from '@/components/common/modal-components/Shadow'

type RefundWalletModalProps = {
  onCancel?: () => void
  onAccept?: (wallet: string) => void
}

const RefundWalletModal = ({ onCancel, onAccept }: RefundWalletModalProps) => {
  const { t } = useTranslation('home')

  const [wallet, setWallet] = useState('')

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setWallet(value)
  }

  return (
    <Container allowScrolling>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Exclamation-blue.svg"
              layout="fill"
              alt="Exclamation"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>{t('home:sell_fillRequiredData')}</span>
      </Title>
      <Info misc>{t('home:sell_accessWallet')}</Info>
      <InputSelect
        label={t('home:sell_wallet')}
        id="refund_wallet"
        onChange={handleChange}
        onEnterPress={() => onAccept && onAccept(wallet)}
        value={wallet}
        changeable
      />
      <ButtonsRow>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onAccept && onAccept(wallet)} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundWalletModal
