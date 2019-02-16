import Fetch from '../Fetch'
import { TFileList } from '../types/index'
import FetchFile from './FetchFile'
import FetchGithub from './FetchGithub'

export const logoutFetcher = new Fetch(() => '/auth/logout')

export const fileListFetcher = new Fetch<TFileList, {}>(() => '/file')

export const fileFetcher = new FetchFile(({ filename }) => `/file/${filename}`)

export const githubRepoFetcher = new FetchGithub(
  ({ repo }) => `/github/repos/${repo}`
)
