const locales = require("./locales")
const config = {
  defaultLocale: "ru",
  locales,
  localeDetection: true
}

module.exports = {
  i18n: {
    ...config,
    localeExtension: "yaml",
    domains: [
      {
        domain: "assetux.com",
        defaultLocale: "ru"
      },
      {
        domain: "commerce.assetux.com",
        defaultLocale: "ru"
      }
    ]
  },
  config,
  nonExplicitSupportedLngs: true
}
