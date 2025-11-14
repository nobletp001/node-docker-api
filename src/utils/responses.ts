import { Response } from 'express'

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error'
  message?: string
  data?: T
  errors?: unknown
}

export const sendSuccess = <T>(res: Response, data: T, message = 'OK', statusCode = 200) => {
  return res.status(statusCode).json({ status: 'success', message, data })
}

export const sendError = (
  res: Response,
  message = 'Internal Server Error',
  statusCode = 500,
  errors?: unknown,
) => {
  return res.status(statusCode).json({ status: 'error', message, errors })
}
