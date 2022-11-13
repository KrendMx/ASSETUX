/**
 * @group General Use
 */
import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { SkeletonTheme } from 'react-loading-skeleton'
import wrapper from '@/lib/redux/store'

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
  return (
    <>
      <SkeletonTheme borderRadius={10}>
        <ContentManager appProps={props} />
      </SkeletonTheme>
      <ScrollButton />
      <GlobalStyles />
    </>
  )
}

export default appWithTranslation(wrapper.withRedux(MyApp))
