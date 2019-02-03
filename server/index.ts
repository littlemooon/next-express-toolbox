import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as morgan from 'morgan'
import * as next from 'next'
import { DEV, PORT } from '../common/config'
import { error, log } from '../common/log'
import { startsWith } from '../common/string'
import api from './api'
import auth from './auth'
import csv from './csv'
import env from './env'
import pdf from './pdf'

// tslint:disable-next-line:no-var-requires
const cookieSession = require('cookie-session')

env()

const app = next({ dev: DEV })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(
      cookieSession({
        keys: [process.env.COOKIE_SESSION_KEY],
      })
    )
    server.use(cookieParser())

    server.use(
      morgan('dev', {
        skip: req => startsWith(req.path, '/_next'),
      })
    )

    server.use('/api/auth', auth())

    server.use('/api/pdf', pdf())

    server.use('/api/csv', csv())

    server.use('/api', api())

    server.get('*', (req, res) => handle(req, res))

    server.listen(PORT, (err: Error) => {
      if (err) {
        throw err
      }
      log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch(ex => {
    error(ex.stack)
    process.exit(1)
  })
