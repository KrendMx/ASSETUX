import config from "../config"

class Client {
  protected genericURL = `${config.hostProtocol}://bsc.${config.host}`
}

export default Client
