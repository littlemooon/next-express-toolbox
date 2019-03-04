import config from 'common/config'
import log from 'common/log'
import * as express from 'express'
import { requireAuth } from './lib/auth-utils'
import api from './routes/api'
import auth from './routes/auth'
import drive from './routes/drive'
import file from './routes/file'
import pdf from './routes/pdf'

const app = express()

app.use('/api/auth', auth)

app.use('/api/pdf', pdf)

app.use('/api/file', file)

app.use('/api/drive', requireAuth, drive)

app.use('/api', api)

app.use('*', (_, res) => {
  // res.writeHead(404)
  res.status(404).end('bloop')
})

app.listen(config.SERVER_PORT, (err: Error) => {
  if (err) {
    throw err
  }
  log.info(`> Ready on http://localhost:${config.SERVER_PORT}`)
})
