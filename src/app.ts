import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import errorHandler from '@/middleware/errorHandler'
import httpLogger from '@/middleware/httpLogger'
import routes from '@/routes'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(httpLogger)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', routes)
app.use(errorHandler)

export default app
