import { NextFunction, Request, Response } from 'express'
import { sendError } from '@/utils/responses'
import { verifyAccessToken } from '@/utils/token'

const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header) {
    return sendError(res, 'Authorization header missing', 401)
  }

  const token = header.split(' ')[1]
  if (!token) {
    return sendError(res, 'Invalid authorization header', 401)
  }

  try {
    const payload = verifyAccessToken(token)
    req.user = { id: payload.sub, email: payload.email }
    return next()
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401, error)
  }
}

export default auth
