const locales = require('./locales')

const config = {
  defaultLocale: 'ru',
  locales,
  localeDetection: true,
  nonExplicitSupportedLngs: true
}

module.exports = {
  i18n: {
    ...config,
    localeExtension: 'yaml'
  },
  config
}
