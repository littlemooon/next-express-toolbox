import { useEffect, useState } from 'react'
import { CacheKey, ICache } from '../../state/CacheState'
import Fetch from '../Fetch'

export interface ICached<T> {
  data: T
  lastUpdated?: Date
}

export default function useCache<T>(
  id: CacheKey,
  ssrFetch?: Fetch<T>
): ICache<T> {
  const [cached, setCached] = useState<Map<string, ICached<T>>>(new Map())

  const set = (key: string, value: T) => {
    setCached(cached.set(key, { data: value, lastUpdated: new Date() }))
  }

  const get = (key: string): T | undefined => {
    const item = cached.get(key)
    return item ? item.data : undefined
  }

  useEffect(() => {
    if (ssrFetch && ssrFetch.data) {
      set(ssrFetch.lastUrl, ssrFetch.data)
    }
  }, [])

  return { id, set, get }
}
