import { config } from 'dotenv'
import { z } from 'zod'

config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('4000'),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default('15m'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
  SALT_ROUNDS: z.coerce.number().int().min(4).max(15).default(10),
})

const env = envSchema.parse(process.env)

export const isProduction = env.NODE_ENV === 'production'
export default env
