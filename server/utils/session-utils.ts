import * as express from 'express'
import { Credentials } from 'google-auth-library'
import { IAuthUser } from '../../common/types/index'
import { DATA_FOLDER } from './drive-utils'

export interface ISessionFolders {
  [DATA_FOLDER]: string
  timesheet: string
}

export interface ISession {
  user?: IAuthUser
  redirect?: string
  tokens?: Credentials
  folders?: ISessionFolders
}

export function getSession(req: express.Request) {
  req.session = { ...req.session }
  return req.session as ISession
}

export function setSession(req: express.Request, session: Partial<ISession>) {
  req.session = { ...req.session, ...session }
  return getSession(req)
}

export function setSessionFolder(
  req: express.Request,
  folders: Partial<ISessionFolders>
) {
  return setSession(req, {
    folders: { ...(req.session ? req.session.folders : undefined), folders },
  })
}

export function clearSession(req: express.Request) {
  req.session = undefined
}
