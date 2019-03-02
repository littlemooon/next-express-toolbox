import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as next from 'next'
import config from '../common/config'
import log from '../common/log'
import { startsWith } from '../common/string'
import env from './env'
import api from './routes/api'
import auth from './routes/auth'
import drive from './routes/drive'
import file from './routes/file'
import pdf from './routes/pdf'
import { requireAuth, setAuthSession } from './utils/auth-utils'

// tslint:disable-next-line:no-var-requires
const session = require('cookie-session')

const nextApp = next({ dev: config.DEV })
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

    app.use(helmet())

    app.use(
      session({
        name: 'session',
        keys: env.COOKIE_SESSION_KEYS,
        cookie: {
          secure: true,
          httpOnly: true,
          domain: config.BASE_URL,
          expires: new Date(Date.now() + 60 * 60 * 1000),
        },
      })
    )

    app.use(cookieParser())
    app.use(setAuthSession)

    app.use('/api/auth', auth())

    app.use('/api/pdf', pdf())

    app.use('/api/file', file())

    app.use('/api/drive', requireAuth, drive())

    app.use('/api', api())

    app.get('*', (req, res) => handle(req, res))

    app.listen(config.PORT, (err: Error) => {
      if (err) {
        throw err
      }
      log.info(`> Ready on http://localhost:${config.PORT}`)
    })
  })
  .catch(e => {
    log.error('server/index', e)
    process.exit(1)
  })
