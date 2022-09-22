import React from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { GetStaticProps } from 'next'
import {
  Container,
  LogoWrapper,
  SubTitle,
  Title
} from '@/components/offline/style'
import { Logo } from '@/components/offline/assets.offline'

const Error = () => {
  const { t } = useTranslation('offline')
  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Title>{t('title')}</Title>
      <SubTitle>{t('subtitle')}</SubTitle>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'header',
        'footer',
        'offline',
        'routes'
      ]))
    }
  }
}

export default Error
