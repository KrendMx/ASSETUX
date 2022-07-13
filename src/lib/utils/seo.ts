import config from "../config"
import { locales } from "../data/locales"

import type { NextSeoProps } from "next-seo"

type SeoMedia = {
  url: string
  width?: number
  height?: number
  alt: string
  type: string
}

const host = `${config.hostProtocol}://${config.host}`
const ecommerceHost = config.isStage
  ? host + "/profile"
  : "https://commerce.assetux.com"

type SEOProps = {
  title: string
  description: string
  pathname: string
  seoImage?: SeoMedia
  siteName?: string
  ecommerce?: boolean
}

export const getDefaultMetaTags = ({
  title,
  description,
  pathname,
  seoImage,
  siteName,
  ecommerce = false
}: SEOProps): NextSeoProps => ({
  title,
  description,
  languageAlternates: locales.map((locale) => ({
    hrefLang: locale,
    href:
      (ecommerce ? ecommerceHost : host) +
      (locale == "ru" ? "" : `/${locale}`) +
      pathname
  })),
  openGraph: {
    url: (ecommerce ? ecommerceHost : host) + pathname,
    title,
    description,
    site_name: siteName || "ASSETUX",
    images: seoImage
      ? [seoImage]
      : [
          {
            url: `${host}/assets/seo.png`,
            width: 1600,
            height: 900,
            alt: "Og Seo Image",
            type: "image/png"
          }
        ]
  }
})
