import { ReactNode } from 'react'
import { IGithubData } from '../common/types/github'
import CacheStateProvider, {
  CacheKey,
  createCacheStateContext,
} from './CacheState'

export const GithubRepoContext = createCacheStateContext<IGithubData>(
  CacheKey.GITHUB_REPO
)

export default function StateProvider(props: { children: ReactNode }) {
  return (
    <CacheStateProvider key={CacheKey.GITHUB_REPO} context={GithubRepoContext}>
      {props.children}
    </CacheStateProvider>
  )
}
