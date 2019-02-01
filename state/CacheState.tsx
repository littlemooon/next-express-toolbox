import { Context, createContext, ReactNode } from 'react'
import useCache from '../common/hooks/useCache'

export enum CacheKey {
  GITHUB_REPO = 'GITHUB_REPO',
}

export interface ICache<T> {
  key: CacheKey
  data: Map<string, T>
  set: (key: string, value: T) => void
  get: (key: string) => T | undefined
}

const noop = () => undefined

export function createCacheStateContext<T>(key: CacheKey): Context<ICache<T>> {
  return createContext<ICache<T>>({
    key,
    data: new Map(),
    set: noop,
    get: noop,
  })
}

interface ICacheStateProviderProps<T> {
  children: ReactNode
  context: Context<ICache<T>>
  key: CacheKey
}

export default function CacheStateProvider<T>(
  props: ICacheStateProviderProps<T>
) {
  const cacheState = useCache<T>(props.key)

  return (
    <props.context.Provider value={cacheState}>
      {props.children}
    </props.context.Provider>
  )
}
