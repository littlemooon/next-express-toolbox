import { useContext } from 'react'
import { CacheContext, CacheKey, IAppCacheItem } from '../../state/CacheState'

export interface ICache<T> {
  cache: IAppCacheItem<T>
  get: (key: string) => T | undefined
  set: (key: string, value: any) => void
}

export default function useCache<T>(cacheKey: CacheKey): ICache<T> {
  const context = useContext(CacheContext)
  const cache = context.getItem(cacheKey)

  function get(key: string): T {
    return context.get(cacheKey, key)
  }

  function set(key: string, value: T) {
    context.set(cacheKey, key, value)
  }

  return { set, get, cache }
}
