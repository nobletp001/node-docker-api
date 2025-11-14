import { NextFunction, Request, Response } from 'express'
import logger from '@/utils/logger'
import { sendError } from '@/utils/responses'

// Express error handler that formats unexpected errors consistently.
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack })
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500
  return sendError(res, err.message || 'Internal Server Error', statusCode)
}

export default errorHandler
