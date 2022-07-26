// @ts-check
import { z } from "zod"

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  BUNDLE_ANALYZE: z.string().optional(),
  ENABLE_PWA: z.string()
})

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  hostProtocol: z.string(),
  host: z.string(),
  magicKey: z.string(),
  isStage: z.boolean()
})

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  hostProtocol: process.env.NEXT_PUBLIC_HOST_PROTOCOL,
  host: process.env.NEXT_PUBLIC_HOST,
  magicKey: process.env.NEXT_PUBLIC_MAGIC_PUB_KEY,
  isStage: process.env.NEXT_PUBLIC_IS_STAGE == "true"
}
