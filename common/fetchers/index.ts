import Fetch from '../Fetch'
import { TFile, TFileList } from '../types/index'
import FetchGithub from './FetchGithub'
import FetchTimesheet from './FetchTimesheet'

export const logoutFetcher = new Fetch(() => '/auth/logout')

export const fileListFetcher = new Fetch<TFileList, {}>(() => '/file')

export const fileFetcher = new Fetch<TFile<any>, { filename: string }>(
  ({ filename }) => `/file/${filename}`
)

export const timesheetListFetcher = new Fetch<TFileList, {}>(
  () => '/file/timesheet'
)

export const timesheetFetcher = new FetchTimesheet()

export const driveListFetcher = new Fetch<TFileList, {}>(() => '/drive')

export const driveFetcher = new Fetch<TFile<any>, { fileId: string }>(
  ({ fileId }) => `/drive/${fileId}`
)

export const githubRepoFetcher = new FetchGithub()
