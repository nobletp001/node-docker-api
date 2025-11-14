import bcrypt from 'bcryptjs'

import env from '@/config/env'

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(env.SALT_ROUNDS)
  return bcrypt.hash(password, salt)
}

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}
