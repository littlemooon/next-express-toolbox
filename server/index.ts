import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as morgan from 'morgan'
import * as next from 'next'
import * as passport from 'passport'
import { DEV, PORT } from '../common/constants'
import { error, log } from '../common/log'
import { startsWith } from '../common/string'
import env from './env'
import api from './routes/api'
import auth from './routes/auth'
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

    app.use(passport.initialize())
    app.use(passport.session())

    app.use('/api/auth', auth())

    app.use('/api/pdf', pdf())

    app.use('/api/file', file())

    app.use('/api/drive', drive())

    app.use('/api', api())

    app.get('*', (req, res) => handle(req, res))

    app.listen(PORT, (err: Error) => {
      if (err) {
        throw err
      }
      log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch(e => {
    error('server/index', e)
    process.exit(1)
  })
