import './config/moduleAlias'
import app from '@/app'
import env from '@/config/env'
import prisma from '@/db/prisma'
import logger from '@/utils/logger'

const port = Number(env.PORT)

const server = app.listen(port, () => {
  logger.info(`Auth API running on port ${port}`)
})

const shutdown = async () => {
  logger.info('Shutting down server')
  server.close(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
