import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'

import env from '@/config/env'

export interface TokenPayload extends JwtPayload {
  sub: string
  email: string
}

const accessTokenOptions: SignOptions = {
  expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as SignOptions['expiresIn'],
}

const refreshTokenOptions: SignOptions = {
  expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as SignOptions['expiresIn'],
}

export const signAccessToken = (payload: TokenPayload) =>
  jwt.sign(payload, env.JWT_ACCESS_SECRET, accessTokenOptions)

export const signRefreshToken = (payload: TokenPayload) =>
  jwt.sign(payload, env.JWT_REFRESH_SECRET, refreshTokenOptions)

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload
