import { Router } from 'express'

import {
  loginHandler,
  logoutHandler,
  meHandler,
  refreshHandler,
  registerHandler,
} from '@/controllers/auth.controller'
import auth from '@/middleware/auth'
import validateRequest from '@/middleware/validateRequest'
import { loginSchema, refreshSchema, registerSchema } from '@/validators/auth.validator'

const router = Router()

router.post('/register', validateRequest(registerSchema), registerHandler)







router.post('/login', validateRequest(loginSchema), loginHandler)
router.post('/refresh', validateRequest(refreshSchema), refreshHandler)
router.post('/logout', validateRequest(refreshSchema), logoutHandler)
router.get('/me', auth, meHandler)

export default router
