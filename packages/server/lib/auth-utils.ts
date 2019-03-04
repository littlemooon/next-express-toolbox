import config from 'common/config'
import log from 'common/log'
import * as express from 'express'
import { google } from 'googleapis'
import env from '../env'
import { getSession, setSession } from './session-utils'

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

export async function setAuthSession(
  req: express.Request,
  _: express.Response,
  next: express.NextFunction
) {
  const session = getSession(req)
  const token = req.query.token

  log.info(req.path)
  log.info(getSession(req))
  if (token) {
    if (!session.tokens) {
      setSession(req, { tokens: { access_token: token } })
    }
    if (!session.user) {
      await setUser(req)
    }
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

export async function getRedirectUrl() {
  const url = await oauthClient.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: config.AUTH_SCOPES,
  })
  return url
}

export async function setAuthTokens(
  req: express.Request,
  _: express.Response,
  code: string
) {
  const { tokens } = await oauthClient.getToken(code)

  setSession(req, { tokens, redirect: undefined })

  await setUser(req)

  return tokens
}
