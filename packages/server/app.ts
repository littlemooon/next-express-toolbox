import config from 'common/config'
import { startsWith } from 'common/string'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import env from './env'
import { setAuthSession } from './lib/auth-utils'

// tslint:disable-next-line:no-var-requires
const session = require('cookie-session')

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

app.set('trust proxy', 1)

export default app
