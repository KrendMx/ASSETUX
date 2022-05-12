const withPrefresh = require("@prefresh/next")
const withPWA = require("next-pwa")
const { i18n } = require("./next-i18next.config")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

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
  compiler: {
    styledComponents: true
  },
  reactStrictMode: true,
  images: {
    domains: [
      "bscscan.com",
      "assetux.com",
      "bsc.assetux.com",
      "dev.assetux.com"
    ]
  },
  pwa: {
    dest: "public",
    disable: true
  },
  eslint: {
    dirs: ["src", "shared", "pages", "components"]
  }
}

module.exports = withBundleAnalyzer(withPWA(withPrefresh(config)))
