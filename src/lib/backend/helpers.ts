import { env } from "../env/client.mjs"

export const constructURL = (apiHost: string) => {
  return `${env.hostProtocol}://${apiHost}`
}
