import * as express from 'express'
import { google } from 'googleapis'
import log from '../../common/log'
import env from '../env'
import { clearSession, getSession, setSession } from '../utils/session-utils'

const SCOPES = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/drive.file',
]

const oauthClient = new google.auth.OAuth2(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URL
)

export function getAuthClient(req: express.Request) {
  const tokens = getSession(req).tokens

  if (tokens) {
    oauthClient.setCredentials(tokens)
  } else {
    log.error('getAuthClient', new Error('No auth tokens in session'))
  }
  return oauthClient
}

export async function initAuth(
  req: express.Request,
  _: express.Response,
  next: express.NextFunction
) {
  const sessionTokens = getSession(req).tokens
  const token = req.cookies.token || req.query.token

  if (token && !sessionTokens) {
    setSession(req, { tokens: { access_token: token } })
    await setUser(req)
  }
  next()
}

export async function requireAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (getSession(req).tokens) {
    next()
  } else {
    return res
      .status(401)
      .send({ status: 'auth_required', message: 'You must be logged in' })
  }
}

async function setUser(req: express.Request) {
  const plus = google.plus({
    version: 'v1',
    auth: getAuthClient(req),
  })
  const me = await plus.people.get({ userId: 'me' })

  const { emails, id, displayName, image, language } = me.data

  setSession(req, {
    user: {
      id,
      email: (emails && emails.length && emails[0].value) || '',
      name: displayName,
      image: image && image.url,
      language,
    },
  })
}

export default function() {
  const router = express.Router()

  router.get('/google', (req, res) => {
    setSession(req, { redirect: req.query.redirect })

    const url = oauthClient.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: SCOPES,
    })

    res.redirect(url)
  })

  router.get('/google/callback', async (req, res) => {
    try {
      const redirect = getSession(req).redirect || '/'
      const code = req.query.code

      const { tokens } = await oauthClient.getToken(code)
      res.cookie('token', tokens.access_token)
      setSession(req, { tokens, redirect: undefined })

      await setUser(req)

      res.redirect(redirect)
    } catch (e) {
      log.error('/google/callback:', e)
      res.status(500).send({ status: 'unable_to_login', message: e.message })
    }
  })

  router.get('/logout', (req, res) => {
    clearSession(req)
    req.clearCookie('token')
    res.redirect('/')
  })

  return router
}
