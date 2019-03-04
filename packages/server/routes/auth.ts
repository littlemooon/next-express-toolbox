import log from 'common/log'
import app from '../app'
import { getRedirectUrl, setAuthTokens } from '../lib/auth-utils'
import { clearCookie } from '../lib/cookie-utils'
import { clearSession, getSession, setSession } from '../lib/session-utils'

app.get('/', async (req, res) => {
  const { user, tokens } = getSession(req)
  res.send({
    user: user || {},
    token: tokens ? tokens.access_token : undefined,
  })
})

app.get('/google', async (req, res) => {
  setSession(req, { redirect: req.query.redirect })

  const url = await getRedirectUrl()

  res.redirect(url)
})

app.get('/google/callback', async (req, res) => {
  try {
    const redirect = getSession(req).redirect || '/'
    const code = req.query.code

    await setAuthTokens(req, res, code)

    res.redirect(redirect)
  } catch (e) {
    log.error('/google/callback:', e)
    res.status(500).send({ status: 'unable_to_login', message: e.message })
  }
})

app.get('/logout', (req, res) => {
  clearSession(req)
  clearCookie(res, 'token')
  res.redirect('/')
})

export default app
