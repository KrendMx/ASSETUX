import React from 'react'
import Image from 'next/image'

import Title from '@/components/common/modal-components/Title'
import Container from '@/components/common/modal-components/Container'
import Shadow from '@/components/common/modal-components/Shadow'
import Icon from '@/components/common/modal-components/Icon'
import { useTranslation } from 'next-i18next'
import { BackgroundLocal, ScrolledBlock } from './styles'
import Info from '@/components/common/modal-components/Info'
import Button from '@/components/common/modal-components/Button'

type WarningProps = {
  caseNumber: number
  setClose: () => void
}

const WarningPopup = ({ caseNumber, setClose }: WarningProps) => {
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
                src={'/assets/Exclamation-red.svg'}
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
