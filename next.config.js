/** @type {import('next').NextConfig} */

const withPreact = require("next-plugin-preact")
const withPWA = require("next-pwa")
const { i18n } = require("./next-i18next.config")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

module.exports = withBundleAnalyzer(
  withPWA(
    withPreact({
      async headers() {
        return [
          {
            source: "/:all*(woff2|woff|ttf|eof)",
            locale: false,
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=9999999999, must-revalidate"
              }
            ]
          }
        ]
      },
      i18n,
      reactStrictMode: true,
      images: {
        domains: ["bscscan.com", "assetux.com", "bsc.assetux.com"]
      },
      pwa: {
        dest: "public",
        disable: true
      }
    })
  )
)
