import config from "./config"
import { locales } from "./locales"

import type { NextSeoProps } from "next-seo"

type SeoMedia = {
  url: string
  width: number
  height: number
  alt: string
  type: string
}

const host = `${config.hostProtocol}://${config.host}`

export const getDefaultMetaTags = (
  title: string,
  description: string,
  pathname: string,
  seoImage?: SeoMedia
): NextSeoProps => ({
  title,
  description,
  languageAlternates: locales.map((locale) => ({
    hrefLang: locale,
    href: host + (locale == "ru" ? "" : `/${locale}`) + pathname
  })),
  openGraph: {
    url: host + pathname,
    title,
    description,
    site_name: "ASSETUX",
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
