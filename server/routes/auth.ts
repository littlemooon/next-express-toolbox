import * as express from 'express'
import { google } from 'googleapis'
import log from '../../common/log'
import { IAuthUser } from '../../common/types/index'
import env from '../env'

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

export const getAuthClient = (req: express.Request) => {
  const tokens = req.session && req.session.tokens
  if (tokens) {
    oauthClient.setCredentials(tokens)
  } else {
    log.error('getAuthClient', new Error('No auth tokens in session'))
  }
  return oauthClient
}

export default function() {
  const router = express.Router()

  router.get('/google', (req, res) => {
    req.session = { ...req.session, redirect: req.query.redirect }

    const url = oauthClient.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: SCOPES,
    })

    res.redirect(url)
  })

  router.get('/google/callback', async (req, res) => {
    try {
      const code = req.query.code

      const data = await oauthClient.getToken(code)
      const tokens = data.tokens
      req.session = { ...req.session, tokens }

      const plus = google.plus({ version: 'v1', auth: getAuthClient(req) })
      const me = await plus.people.get({ userId: 'me' })

      const { emails, id, displayName, image, language } = me.data
      const user: IAuthUser = {
        id,
        email: (emails && emails.length && emails[0].value) || '',
        name: displayName,
        image: image && image.url,
        language,
        token: tokens.access_token || undefined,
      }

      req.session = { ...req.session, user }
      log.info({ data, me })
      log.info(req.session)

      res.redirect(req.session.redirect || '/')
    } catch (e) {
      log.error('/google/callback:', e)
      res.status(500).send({ status: 'unable_to_login', message: e.message })
    }
  })

  router.get('/logout', (req, res) => {
    req.session = undefined
    res.redirect('/')
  })

  return router
}
