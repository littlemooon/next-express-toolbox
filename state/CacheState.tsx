import { Context, createContext, ReactNode, useContext } from 'react'
import useCache from '../common/hooks/useCache'
import { noop } from '../common/utils'

export enum CacheKey {
  GITHUB_REPO = 'GITHUB_REPO',
  CSV_LIST = 'CSV_LIST',
}

export interface ICache<T> {
  id: CacheKey
  set: (key: string, value: T) => void
  get: (key: string) => T | undefined
}

export function createCacheContext<T>(id: CacheKey): Context<ICache<T>> {
  return createContext<ICache<T>>({
    id,
    set: noop,
    get: noop,
  })
}

interface ICacheProviderProps<T> {
  children: ReactNode
  context: Context<ICache<T>>
}

export default function CacheProvider<T>(props: ICacheProviderProps<T>) {
  const context = useContext(props.context)
  const cacheState = useCache<T>(context.id)

  return (
    <props.context.Provider value={cacheState}>
      {props.children}
    </props.context.Provider>
  )
}
