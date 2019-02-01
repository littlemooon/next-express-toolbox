import { ReactNode } from 'react'
import { IGithubData } from '../common/types/github'
import CacheProvider, { CacheKey, createCacheContext } from './CacheState'

export const GithubRepoContext = createCacheContext<IGithubData>(
  CacheKey.GITHUB_REPO
)

export default function StateProvider(props: { children: ReactNode }) {
  return (
    <CacheProvider context={GithubRepoContext}>{props.children}</CacheProvider>
  )
}
