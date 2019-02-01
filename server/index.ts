import * as cookieParser from 'cookie-parser'
import * as express from 'express'
// import * as morgan from 'morgan'
import * as next from 'next'
import { DEV, PORT } from '../common/config'
import { error, log } from '../common/log'
import api from './api'
import auth from './auth'
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
    // server.use(morgan('combined'))

    server.use(auth)

    server.use(pdf)

    server.use(api)

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
