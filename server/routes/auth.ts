import * as express from 'express'
import * as passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

export function authGoogle(pp: passport.PassportStatic) {
  pp.serializeUser((user, done) => {
    done(null, user)
  })

  pp.deserializeUser((user, done) => {
    done(null, user)
  })

  pp.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
      },
      (token, _, profile, done) => {
        return done(null, {
          profile,
          token,
        })
      }
    )
  )
}

export default function() {
  const app = express()

  authGoogle(passport)

  app.use(passport.initialize())

  app.get(
    '/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile'],
    })
  )

  app.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
    }),
    (req, res) => {
      req.session = req.session || {}
      req.session.token = req.user.token
      res.redirect('/')
    }
  )

  app.get('/logout', (req, res) => {
    req.logout()
    req.session = undefined
    res.redirect('/')
  })

  return app
}
