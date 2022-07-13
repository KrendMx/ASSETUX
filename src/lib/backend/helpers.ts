import config from "../config"

export const constructURL = (apiHost: string) => {
  return `${config.hostProtocol}://${apiHost}`
}
