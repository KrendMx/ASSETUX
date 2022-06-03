type Config = {
  hostProtocol: string
  host: string
  mode: string
  magicKey: string
  isStage: boolean
}

const config: Config = {
  hostProtocol: process.env.NEXT_PUBLIC_HOST_PROTOCOL!,
  host: process.env.NEXT_PUBLIC_HOST!,
  mode: process.env.NODE_ENV,
  magicKey: process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!,
  isStage: process.env.NEXT_PUBLIC_IS_STAGE == "true"
}

for (const [key, value] of Object.entries(config)) {
  if (value == undefined) {
    throw new Error(`Environment variable not found: ${key}`)
  }
}

export default config
