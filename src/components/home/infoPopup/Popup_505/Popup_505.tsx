import React from 'react'
import Image from 'next/image'

import Title from '@/components/common/modal-components/Title'
import Container from '@/components/common/modal-components/Container'
import Shadow from '@/components/common/modal-components/Shadow'
import Icon from '@/components/common/modal-components/Icon'
import ExclamationGreenIcon from '../../../../public/assets/Exclamation-red.svg'
import { useTranslation } from 'next-i18next'
import { BackgroundLocal, ScrolledBlock } from './styles'
import Info from '@/components/common/modal-components/Info'
import Button from '@/components/common/modal-components/Button'
import UnknownError from '../../form-group/form/sell-form/select-form/modals/exchange/unknown-error'

type WarningProps = {
  setClose: () => void
}

const Popup505 = ({ setClose }: WarningProps) => {
  const { t } = useTranslation('home')

  return (
    <BackgroundLocal>
      <UnknownError onAccept={setClose} />
    </BackgroundLocal>
  )
}

export default Popup505
