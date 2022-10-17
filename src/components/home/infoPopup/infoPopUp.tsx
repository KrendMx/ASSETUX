import React from 'react'
import Image from 'next/image'

// import Background from '@/components/common/background'
// import Popup from '@/components/common/header/configure/popup'
import Title from '@/components/common/modal-components/Title'
import Container from '@/components/common/modal-components/Container'
import Shadow from '@/components/common/modal-components/Shadow'
import Icon from '@/components/common/modal-components/Icon'
import ExclamationGreenIcon from '../../../../public/assets/Exclamation-red.svg'
import styled from 'styled-components'
import AdaptiveFont from '@/components/common/adaptive-font'
import { useTranslation } from 'next-i18next'
import { BackgroundLocal, ScrolledBlock } from './styles'
import Info from '@/components/common/modal-components/Info'
import Button from '@/components/common/modal-components/Button'

const WarningPopup: React.FC<{ caseNumber: number; setClose: () => void }> = ({
  caseNumber,
  setClose
}) => {
  const { t } = useTranslation('home')

  return (
    <BackgroundLocal>
      <Container
        spanContent
        style={{ width: '300px' }}
        customTransform={'translate(-105%, -55%)'}
      >
        <Title>
          <Shadow>
            <Icon>
              <Image
                src={ExclamationGreenIcon}
                layout="fill"
                alt="Exclamation"
                objectFit="contain"
                objectPosition="center"
              />
            </Icon>
          </Shadow>
          <span>{t('sell_notEnoughTitle')}</span>
        </Title>
        <ScrolledBlock height="200px">
          <Info misc style={{ fontWeight: 400 }}>
            {t(`warningPopup_case${caseNumber}`)}
          </Info>
        </ScrolledBlock>
        <Info misc style={{ fontWeight: 400 }} margin={'20px 0'}>
          {t(`warningPopup_agrees`)}
        </Info>
        <Button onClick={setClose} main>
          OK
        </Button>
      </Container>
    </BackgroundLocal>
  )
}

export default WarningPopup
