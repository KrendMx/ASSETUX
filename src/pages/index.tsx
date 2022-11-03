import React from 'react'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import FormGroup from '@/components/home/form-group'
import Investments from '@/components/home/investments'
import NewsRoom from '@/components/common/news'
import AboutUs from '@/components/home/about-us'
import CryptoManager from '@/components/common/crypto-manager'
import QueryController from '@/components/home/query-controller'
import Orders from '@/components/home/orders'
import { Container } from '@/components/home/style'

import { getDefaultMetaTags } from '@/lib/utils/seo'

import { BackendClient } from '@/lib/backend/clients'

import type { GetServerSideProps, GetStaticProps } from 'next'
import type { PostData } from '@/lib/backend/main/types.backend.main'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/lib/redux/hooks'

const CryptoSlide = dynamic(() => import('@/components/home/crypto-slide'))
const CryptoExplorer = dynamic(
  () => import('@/components/home/crypto-explorer')
)

type IndexProps = {
  news: PostData[] | null
}

const Index = ({ news }: IndexProps) => {
  const { t } = useTranslation('home')

  return (
    <>
      <NextSeo
        {...getDefaultMetaTags({
          title: t('title'),
          description: t('description'),
          pathname: ''
        })}
      />
      <Container>
        <FormGroup />
        {/* <Investments /> */}
        <CryptoSlide />
        <CryptoExplorer />
        {news && <NewsRoom news={news} />}
        <AboutUs />

        <Orders />

        <CryptoManager getToken getChart />
        <QueryController />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async ({
  locale,
  locales,
  query
}) => {
  const response = await BackendClient.getNews({
    category: 'news',
    lang: locale!
  })
  if (
    response.state == 'success' &&
    !!response?.data?.pin &&
    !!response.data.news
  ) {
    response.data.news.splice(0, 0, response.data.pin)
  }

  return {
    props: {
      news: response.state == 'success' ? response.data.news : null,
      ...(await serverSideTranslations(locale!, [
        'common',
        'header',
        'footer',
        'home',
        'news',
        'routes',
        'inputSelect'
      ])),
      paths: locales!.map((el: any) => ({
        params: query,
        locales: el
      })),
      revalidate: 3600,
      query
    }
  }
}

export default Index
