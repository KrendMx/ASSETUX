const withPrefresh = require("@prefresh/next")
const withPWA = require("next-pwa")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const { i18n } = require("./next-i18next.config")
const { pwa } = require("./next-pwa.config")

/** @type {import('next').NextConfig} */
const config = {
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
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime"
    }

    return config
  },
  i18n,
  pwa,
  compiler: {
    styledComponents: true
  },
  reactStrictMode: true,
  images: {
    domains: [
      "bscscan.com",
      "assetux.com",
      "bsc.assetux.com",
      "bsc.dev.assetux.com"
    ]
  },
  eslint: {
    dirs: ["src"]
  }
}

module.exports = withBundleAnalyzer(withPWA(withPrefresh(config)))
