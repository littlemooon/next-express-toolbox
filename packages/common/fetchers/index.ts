import Fetch from 'common/Fetch'
import FetchGithub from 'common/fetchers/FetchGithub'
import FetchTimesheet from 'common/fetchers/FetchTimesheet'
import { IAuthState } from 'common/state/AuthState'
import { IDriveList, TFile, TFileList } from 'common/types/index'

export const authFetcher = new Fetch<IAuthState>(() => '/auth')

export const logoutFetcher = new Fetch(() => '/auth/logout')

export const fileListFetcher = new Fetch<TFileList, {}>(() => '/file')
export const fileFetcher = new Fetch<TFile<any>, { filename: string }>(
  ({ filename }) => `/file/${filename}`
)

export const timesheetFetcher = new FetchTimesheet()

export const driveListFetcher = new Fetch<IDriveList, { folder?: string }>(
  ({ folder }) => ['/drive', folder].join('/')
)
export const driveFetcher = new Fetch<TFile<any>, { fileId: string }>(
  ({ fileId }) => `/drive/file/${fileId}`
)

export const githubRepoFetcher = new FetchGithub()
