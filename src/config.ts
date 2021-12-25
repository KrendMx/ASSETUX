type Config = {
  hostProtocol?: string
  host?: string
  mode?: string
}

const config: Config = {
  hostProtocol: process.env.NEXT_PUBLIC_HOST_PROTOCOL,
  host: process.env.NEXT_PUBLIC_HOST,
  mode: process.env.NODE_ENV
}

for (const [key, value] of Object.entries(config)) {
  if (!value) {
    throw new Error(`Environment variable not found: ${key}`)
  }
}

export default config
