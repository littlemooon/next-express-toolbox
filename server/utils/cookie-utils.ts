import * as express from 'express'
import { ICookies } from '../../common/types/index'

export function getCookie(req: express.Request, key: keyof ICookies) {
  const cookies = req.cookies as ICookies
  return cookies[key]
}

export function setCookie(
  res: express.Response,
  key: keyof ICookies,
  value?: string | null,
  opts: express.CookieOptions = {}
) {
  if (value) {
    res.cookie(key, value, opts)
  } else {
    clearCookie(res, key)
  }
}

export function clearCookie(res: express.Response, key: keyof ICookies) {
  res.clearCookie(key)
}
