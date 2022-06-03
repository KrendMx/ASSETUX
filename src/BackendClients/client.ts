import config from "../config"

class Client {
  public genericURL = `${config.hostProtocol}://bsc.${config.host}`
}

export default Client
