import React from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { GetStaticProps } from 'next'
import { Container } from '@/components/error/styles'

const Error = () => {
  const { t } = useTranslation('404')
  return <Container>{t('404')}</Container>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'header',
        'footer',
        '404',
        'routes'
      ]))
    }
  }
}

export default Error
