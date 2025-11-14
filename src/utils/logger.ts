import DailyRotateFile from 'winston-daily-rotate-file'
import { createLogger, format, transports } from 'winston'
import { isProduction } from '@/config/env'

const consoleFormat = format.printf(({ level, message, timestamp, ...meta }) => {
  const payload = Object.keys(meta).length ? JSON.stringify(meta) : ''
  return `${timestamp} [${level}] ${message}${payload ? ` ${payload}` : ''}`
})

const loggerTransports = [
  new transports.Console({
    level: isProduction ? 'info' : 'debug',
    format: format.combine(
      format.colorize({ all: !isProduction }),
      format.timestamp(),
      isProduction ? format.json() : consoleFormat
    ),
  }),
]

if (isProduction) {
  // Transports.push(
  //   new DailyRotateFile({
  //     dirname: 'logs',
  //     filename: 'auth-api-%DATE%.log',
  //     datePattern: 'YYYY-MM-DD',
  //     zippedArchive: true,
  //     maxSize: '20m',
  //     maxFiles: '14d',
  //     level: 'info',
  //   })
  // )
}

const logger = createLogger({
  level: isProduction ? 'info' : 'debug',
  format: format.combine(format.timestamp(), format.errors({ stack: true }), format.splat(), format.json()),
  transports: loggerTransports,
})

export default logger
