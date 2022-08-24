const locales = require("./locales")
const config = {
  defaultLocale: "ru",
  locales,
  localeDetection: true
}

module.exports = {
  i18n: {
    ...config,
    localeExtension: "yaml"
  },
  config,
  fallbackLng: {
    default: ["ru"],
    "en-US": ["en"]
  },
  nonExplicitSupportedLngs: true
}
