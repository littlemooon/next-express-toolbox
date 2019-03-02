import * as express from 'express'
import log from '../../common/log'
import { getRedirectUrl, setAuthTokens } from '../utils/auth-utils'
import { clearCookie } from '../utils/cookie-utils'
import { clearSession, getSession, setSession } from '../utils/session-utils'

export default function() {
  const router = express.Router()

  router.get('/google', async (req, res) => {
    setSession(req, { redirect: req.query.redirect })

    const url = await getRedirectUrl()

    res.redirect(url)
  })

  router.get('/google/callback', async (req, res) => {
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

  router.get('/logout', (req, res) => {
    clearSession(req)
    clearCookie(res, 'token')
    res.redirect('/')
  })

  return router
}
