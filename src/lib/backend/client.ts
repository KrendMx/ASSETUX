import { env } from '@/lib/env/client.mjs'

class Client {
  public genericURL = `${env.hostProtocol}://bsc.${env.host}`
}

export default Client
