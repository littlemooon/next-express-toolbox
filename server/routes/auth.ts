import * as express from 'express'
import * as passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import env from '../env'

const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/drive.file',
]

function extractProfile(profile: passport.Profile) {
  const photos = profile.photos
  const imageUrl = photos && photos.length ? photos[0].value : ''

  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl,
  }
}

function createClient() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: env.GOOGLE_REDIRECT_URL,
      },
      (token, _, profile, cb) => {
        cb(null, { profile, token, ...extractProfile(profile) })
      }
    )
  )

  passport.serializeUser((user, cb) => {
    cb(null, user)
  })

  passport.deserializeUser((obj, cb) => {
    cb(null, obj)
  })
}

export function authRequired(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.user) {
    req.session = req.session || {}
    req.session.oauth2return = req.originalUrl
    return res.redirect('/login')
  }
  next()
}

export default function() {
  const router = express.Router()

  createClient()

  router.get(
    '/google',
    (req, _, next) => {
      req.session = { ...req.session, redirect: req.query.redirect }
      next()
    },
    passport.authenticate('google', {
      scope: SCOPES,
    })
  )

  router.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
    }),
    (req, res) => {
      req.session = { ...req.session, token: req.user.token }
      res.redirect(req.session.redirect || '/')
    }
  )

  router.get('/logout', (req, res) => {
    req.logout()
    req.session = undefined
    res.redirect('/')
  })

  return router
}
