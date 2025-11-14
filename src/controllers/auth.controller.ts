import { Request, Response } from 'express'
import { loginUser, logoutUser, refreshTokens, registerUser } from '@/services/auth.service'
import { sendError, sendSuccess } from '@/utils/responses'

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { user, tokens } = await registerUser(req.body)
    return sendSuccess(res, { user, tokens }, 'User registered', 201)
  } catch (error) {
    return sendError(res, (error as Error).message, 400)
  }
}

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await loginUser(email, password)
    return sendSuccess(res, result, 'Authentication successful')
  } catch (error) {
    return sendError(res, (error as Error).message, 401)
  }
}

export const refreshHandler = async (req: Request, res: Response) => {
  const { refreshToken } = req.body
  try {
    const tokens = await refreshTokens(refreshToken)
    return sendSuccess(res, { tokens }, 'Tokens refreshed')
  } catch (error) {
    return sendError(res, (error as Error).message, 401)
  }
}

export const logoutHandler = async (req: Request, res: Response) => {
  const { refreshToken } = req.body
  try {
    await logoutUser(refreshToken)
    return sendSuccess(res, null, 'Logged out')
  } catch (error) {
    return sendError(res, (error as Error).message, 400)
  }
}

export const meHandler = (req: Request, res: Response) => {
  if (!req.user) {
    return sendError(res, 'Unauthorized', 401)
  }
  return sendSuccess(res, { user: req.user }, 'Current user')
}
