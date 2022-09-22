import dayjs from 'dayjs'
import 'dayjs/locale/ru'

export const getFormattedDate = (date: string | number, locale: string) =>
  dayjs(date).locale(locale).format('HH:mm, D MMMM YYYY')
