import Fetch from '../Fetch'
import { IFileList } from '../types/index'
import FetchGithub from './FetchGithub'

export const logoutFetcher = new Fetch('/auth/logout')

export const fileListFetcher = new Fetch<IFileList>('/csv')

export const csvFetcher = new Fetch<object[]>('/csv')

export const githubRepoFetcher = new FetchGithub('/github/repos')
