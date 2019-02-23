import Fetch from '../Fetch'
import { TFile, TFileList } from '../types/index'
import FetchGithub from './FetchGithub'
import FetchTimesheet from './FetchTimesheet'

export const logoutFetcher = new Fetch(() => '/auth/logout')

export const fileListFetcher = new Fetch<TFileList, {}>(() => '/file')

export const timesheetFetcher = new FetchTimesheet()

export const fileFetcher = new Fetch<TFile<any>, { filename: string }>(
  ({ filename }) => `/file/${filename}`
)

export const githubRepoFetcher = new FetchGithub()
