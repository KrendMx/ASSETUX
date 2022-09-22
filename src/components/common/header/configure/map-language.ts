import type { LocalesType } from '@/lib/data/locales'

const mapLanguage = (locale: LocalesType) => {
  switch (locale) {
    case 'en':
      return 'EN'
    case 'ru':
      return 'RUS'
  }
}

export default mapLanguage
