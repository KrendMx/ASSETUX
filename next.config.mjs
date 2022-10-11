import withPWA from 'next-pwa'
import bundleAnalyzer from '@next/bundle-analyzer'

import i18n from './next-i18next.config.js'
import { pwa } from './next-pwa.config.mjs'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.NEXT_PUBLIC_BUNDLE_ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const config = {
  async headers() {
    return [
      {
        source: '/:all*(woff2|woff|ttf|eof)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate'
          }
        ]
      }
    ]
  },
  i18n: i18n.config,
  pwa,
  compiler: {
    styledComponents: true
  },
  reactStrictMode: true,
  images: {
    domains: [
      'bscscan.com',
      'assetux.com',
      'bsc.assetux.com',
      'bsc.dev.assetux.com'
    ]
  },
  eslint: {
    dirs: ['src']
  }
}

// https://github.com/shadowwalker/next-pwa/issues/367#issuecomment-1194057483
const pwaConfig =
  process.env.NEXT_PUBLIC_IS_STAGE === 'true' ? config : withPWA(config)

delete pwaConfig.pwa

export default withBundleAnalyzer(pwaConfig)
