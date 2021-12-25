/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const webpack = (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    Object.assign(config.resolve.alias, {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime"
    })
  }

  return config
}

module.exports = withBundleAnalyzer({
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
  webpack,
  i18n,
  reactStrictMode: true,
  images: {
    domains: ["bscscan.com", "assetux.com"]
  }
})
