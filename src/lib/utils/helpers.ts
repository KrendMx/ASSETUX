import Cookies from "js-cookie"
import cookie from "cookie"
import sanitizeHtml from "sanitize-html"

import { env } from "../env/client.mjs"
import { EcommerceClient } from "../backend/clients"
import { mappedCookies, floatRegexp } from "../data/constants"

import type { GetServerSidePropsContext } from "next"

export const ellipsisString = (value: string, maxLength: number) => {
  if (value.length > maxLength) {
    return value.substring(0, maxLength) + "..."
  }

  return value
}

export const stringToPieces = (
  string: string,
  pieceLength: number,
  delimeter: string
): string => {
  const piecesLength = Math.ceil(string.length / pieceLength)
  const pieces = new Array(piecesLength)
  for (let i = 0; i < piecesLength; i++) {
    pieces[i] = string.slice(i * pieceLength, i * pieceLength + pieceLength)
  }

  return pieces.join(delimeter)
}

export const capitalizeString = (value: string) => {
  if (value.length == 0) {
    return value
  }

  return value[0].toUpperCase() + value.slice(1)
}

export const updateURL = (newUrl: string) => {
  window.history.replaceState(
    { ...window.history.state, as: newUrl, url: newUrl },
    "",
    newUrl
  )
}

export type QueryObject = {
  [key: string]: string | undefined
}

export const mapQueryObject = (query: QueryObject) => {
  return Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
}

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const logout = () => {
  const token = Cookies.get(mappedCookies.authToken)

  if (token) {
    EcommerceClient.logout({ token })
  }

  Cookies.remove(mappedCookies.authToken)
}

export const checkAuthorization = (
  req: GetServerSidePropsContext["req"]
): string | null => {
  const cookies = req.headers.cookie

  if (!cookies) {
    return null
  }

  const parsedCookies = cookie.parse(cookies)
  const token = parsedCookies[mappedCookies.authToken]

  if (!token) {
    return null
  }

  return token
}

export const validateDecimal = (value: string): [boolean, string] => {
  const processedValue = value.replace(/,/g, ".")

  const validated = processedValue == "" || floatRegexp.test(processedValue)

  return [validated, validated ? processedValue : ""]
}

export const sanitize = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: ["p", "br", "b", "strong", "i", "em"]
  })

export type Nullable<T> = { [K in keyof T]: T[K] | null }

export const getEcommercePrefix = () => (env.isStage ? "/profile" : "")
