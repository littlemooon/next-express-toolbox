import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as morgan from 'morgan'
import * as next from 'next'
import { DEV, PORT } from '../common/constants'
import log from '../common/log'
import { startsWith } from '../common/string'
import env from './env'
import api from './routes/api'
import auth, { initAuth, requireAuth } from './routes/auth'
import drive from './routes/drive'
import file from './routes/file'
import pdf from './routes/pdf'

// tslint:disable-next-line:no-var-requires
const session = require('cookie-session')

const nextApp = next({ dev: DEV })
const handle = nextApp.getRequestHandler()

nextApp
  .prepare()
  .then(() => {
    const app = express()

    app.use(
      morgan('dev', {
        skip: req => startsWith(req.path, '/_next'),
      })
    )

    app.use(
      session({
        keys: [env.COOKIE_SESSION_KEY],
      })
    )
    app.use(cookieParser())
    app.use(initAuth)

    app.use('/api/auth', auth())

    app.use('/api/pdf', pdf())

    app.use('/api/file', file())

    app.use('/api/drive', requireAuth, drive())

    app.use('/api', api())

    app.get('*', (req, res) => handle(req, res))

    app.listen(PORT, (err: Error) => {
      if (err) {
        throw err
      }
      log.info(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch(e => {
    log.error('server/index', e)
    process.exit(1)
  })
