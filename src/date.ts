import dayjs from "dayjs"
import "dayjs/locale/ru"

export const getFormattedDate = (date: string, locale: string) =>
  dayjs(date).locale(locale).format("HH:mm, D MMMM YYYY")
