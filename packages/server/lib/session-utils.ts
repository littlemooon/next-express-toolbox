import { ISession, TDriveFolders } from 'common/types/index'
import * as express from 'express'

export function getSession(req: express.Request) {
  req.session = { folders: {}, ...req.session }
  return req.session as ISession
}

export function setSession(req: express.Request, session: Partial<ISession>) {
  req.session = { ...getSession(req), ...session }
  return getSession(req)
}

export function setSessionFolder(
  req: express.Request,
  folders: Partial<TDriveFolders>
) {
  return setSession(req, {
    folders: { ...(req.session ? req.session.folders : undefined), ...folders },
  })
}

export function clearSession(req: express.Request) {
  req.session = undefined
}
