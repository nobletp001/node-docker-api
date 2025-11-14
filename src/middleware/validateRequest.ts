import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

import { sendError } from '@/utils/responses'

const validateRequest =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      })
      next()
    } catch (error) {
      sendError(res, 'Validation error', 422, error)
    }
  }

export default validateRequest
