import React from 'react'
import { useTranslation } from 'next-i18next'
import { BackgroundLocal } from './styles'
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
