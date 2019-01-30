import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import * as express from 'express'
// import * as morgan from 'morgan'
import * as next from 'next'
import * as passport from 'passport'
import { DEV, PORT } from '../common/config'
import { error, log } from '../common/log'
import { authGoogle } from './auth'
import renderPdf from './pdf'

// tslint:disable-next-line:no-var-requires
const cookieSession = require('cookie-session')

dotenv.config({ path: '.env.server', debug: true })

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

    authGoogle(passport)
    server.use(passport.initialize())

    server.get(
      '/auth/google',
      passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile'],
      })
    )

    server.get(
      '/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect: '/',
      }),
      (req, res) => {
        req.session = req.session || {}
        req.session.token = req.user.token
        res.redirect('/')
      }
    )

    server.get('/logout', (req, res) => {
      req.logout()
      req.session = undefined
      res.redirect('/')
    })

    server.get('/pdf/*', (req, res) => renderPdf(req, res))

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
