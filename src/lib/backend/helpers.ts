import { env } from "../env/client.mjs"

export const constructURL = (apiHost: string) => {
  return `${env.hostProtocol}://${apiHost}`
}

export const toLocaleBalance = (
  amount: number | undefined,
  style?: string
): string =>
  typeof amount !== "undefined" && !isNaN(amount)
    ? `${amount.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        style: !!style ? style : "decimal",
        currency: "RUB"
      })}`
    : "0"

export const validatePhone = (value: string) => {
  let groups = value
    .replace(/\D/g, "")
    .trim()
    .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/)
  value = !groups![3]
    ? `+${groups![1]} ${groups![2]}`
    : `+${groups![1]} (${groups![2]}) ${groups![3]} ${groups![4]}`
  return value
}
