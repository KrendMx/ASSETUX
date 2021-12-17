/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config")

module.exports = {
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
  reactStrictMode: true,
  i18n,
  images: {
    domains: ["bscscan.com", "assetux.com"]
  }
}
