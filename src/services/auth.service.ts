import env from '@/config/env'
import prisma from '@/db/prisma'
import { comparePassword, hashPassword } from '@/utils/password'
import { durationToMs } from '@/utils/time'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/utils/token'

export interface RegisterInput {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  accessTokenExpiresIn: string
  refreshTokenExpiresAt: Date
}

const createSessionTokens = async (userId: string, email: string): Promise<AuthTokens> => {
  const payload = { sub: userId, email }
  const accessToken = signAccessToken(payload)
  const refreshToken = signRefreshToken(payload)
  const refreshTokenExpiresAt = new Date(Date.now() + durationToMs(env.REFRESH_TOKEN_EXPIRES_IN))

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
      expiresAt: refreshTokenExpiresAt,
    },
  })

  return {
    accessToken,
    refreshToken,
    accessTokenExpiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresAt,
  }
}

export const registerUser = async ({ email, password, firstName, lastName }: RegisterInput) => {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw new Error('User already exists')
  }

  const passwordHash = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName,
      lastName,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  })

  const tokens = await createSessionTokens(user.id, user.email)
  return { user, tokens }
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isValid = await comparePassword(password, user.passwordHash)
  if (!isValid) {
    throw new Error('Invalid credentials')
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
  }

  const tokens = await createSessionTokens(user.id, user.email)
  return { user: safeUser, tokens }
}

export const refreshTokens = async (refreshToken: string) => {
  const storedToken = await prisma.refreshToken.findUnique({ where: { token: refreshToken } })
  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new Error('Session expired')
  }

  const payload = verifyRefreshToken(refreshToken)
  await prisma.refreshToken.delete({ where: { token: refreshToken } })
  const tokens = await createSessionTokens(payload.sub, payload.email)

  return tokens
}

export const logoutUser = async (refreshToken: string) => {
  await prisma.refreshToken.deleteMany({ where: { token: refreshToken } })
}
