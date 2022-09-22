import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import Container from '@/components/common/modal-components/Container'
import Icon from '@/components/common/modal-components/Icon'
import Info from '@/components/common/modal-components/Info'
import Shadow from '@/components/common/modal-components/Shadow'
import Title from '@/components/common/modal-components/Title'

const SmallContainer = styled(Container)`
  width: 72%;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
`

const ColoredInfo = styled(Info)`
  color: #6e6e73;
`

const Maintenance = () => {
  const { t } = useTranslation('home')

  return (
    <Background>
      <SmallContainer allowScrolling resetZIndex>
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
          <span>{t('home:maintenance_title')}</span>
        </Title>
        <ColoredInfo misc>{t('home:maintenance_p1')}</ColoredInfo>
        <ColoredInfo misc>{t('home:maintenance_p2')}</ColoredInfo>
      </SmallContainer>
    </Background>
  )
}

export default Maintenance
