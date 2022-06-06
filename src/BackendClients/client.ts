import config from "../utils/config"

class Client {
  public genericURL = `${config.hostProtocol}://bsc.${config.host}`
}

export default Client
