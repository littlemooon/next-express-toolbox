import Fetch from '../Fetch'
import { TFile, TFileList } from '../types/index'
import FetchGithub from './FetchGithub'

export const logoutFetcher = new Fetch(() => '/auth/logout')

export const fileListFetcher = new Fetch<TFileList, {}>(() => '/file')

export const fileFetcher = new Fetch<TFile, { filename: string }>(
  ({ filename }) => `/file/${filename}`
)

export const githubRepoFetcher = new FetchGithub(
  ({ repo }) => `/github/repos/${repo}`
)
