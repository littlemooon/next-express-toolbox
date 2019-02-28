import Fetch from '../Fetch'
import { IDriveList, TFile, TFileList } from '../types/index'
import FetchGithub from './FetchGithub'
import FetchTimesheet from './FetchTimesheet'

export const logoutFetcher = new Fetch(() => '/auth/logout')

export const fileListFetcher = new Fetch<TFileList, {}>(() => '/file')
export const fileFetcher = new Fetch<TFile<any>, { filename: string }>(
  ({ filename }) => `/file/${filename}`
)

export const timesheetListFetcher = new Fetch<IDriveList, {}>(
  () => '/drive/timesheet'
)
export const timesheetFetcher = new FetchTimesheet()

export const driveListFetcher = new Fetch<IDriveList, {}>(() => '/drive')
export const driveFetcher = new Fetch<TFile<any>, { fileId: string }>(
  ({ fileId }) => `/drive/file/${fileId}`
)

export const githubRepoFetcher = new FetchGithub()
