import React from 'react'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Intro from '@/components/about/intro'
import Info from '@/components/about/info'
import Contacts from '@/components/about/contacts'
import NewsRoom from '@/components/common/news'

import { BackendClient } from '@/lib/backend/clients'
import { getDefaultMetaTags } from '@/lib/utils/seo'

import type { GetStaticProps } from 'next'
import type { PostData } from '@/lib/backend/main/types.backend.main'
import { Container } from '@/components/about/styles'

type AboutProps = {
  news: PostData[] | null
}

const About = ({ news }: AboutProps) => {
  const { t } = useTranslation('about')

  return (
    <>
      <NextSeo
        {...getDefaultMetaTags({
          title: t('title'),
          description: t('description'),
          pathname: '/about'
        })}
      />
      <Container>
        <Intro />
        <Info />
        {/* <Investments /> */}
        <Contacts />
        {news && <NewsRoom news={news} />}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<AboutProps> = async ({
  locale
}) => {
  const response = await BackendClient.getNews({
    category: 'news',
    lang: locale!
  })

  return {
    props: {
      news: response.state == 'success' ? response.data.news : null,
      ...(await serverSideTranslations(locale!, [
        'header',
        'footer',
        'about',
        'news',
        'routes'
      ]))
    },
    revalidate: 3600
  }
}

export default About
