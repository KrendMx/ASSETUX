/**
 * @group General Use
 */
import React from 'react'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { SkeletonTheme } from 'react-loading-skeleton'
import wrapper from '@/lib/redux/store'

import Header from '@/components/common/header'
import ContentManager from '@/components/common/content-manager'

import GlobalStyles from '@/lib/styles/global'
import { useAppMount, useMount } from '@/lib/hooks'

import type { AppProps } from 'next/app'

import 'react-loading-skeleton/dist/skeleton.css'
import 'core-js/features/array/at'
import '@/lib/styles/fonts.css'

const ScrollButton = dynamic(
  () => import('@/components/common/scroll-button'),
  {
    ssr: false
  }
)

const MyApp = (props: AppProps) => {
  const { isCommercePayment, router } = useAppMount()

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="manifest" href={`/manifests/${router.locale}.json`} />
        <meta name="theme-color" content="#FFFFFF" />
      </Head>
      <DefaultSeo title="ASSETUX" />
      {!isCommercePayment && <Header />}
      <SkeletonTheme borderRadius={10}>
        <ContentManager appProps={props} />
      </SkeletonTheme>
      <ScrollButton />
      <GlobalStyles />
    </>
  )
}

export default appWithTranslation(wrapper.withRedux(MyApp))
