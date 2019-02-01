import { useState } from 'react'
import { CacheKey, ICache } from '../../state/CacheState'

export default function useCache<T>(cacheKey: CacheKey): ICache<T> {
  const [data, setData] = useState<Map<string, T>>(new Map())

  const set = (key: string, value: T) => {
    setData(data.set(key, value))
  }

  const get = (key: string): T | undefined => {
    return data.get(key)
  }

  return { key: cacheKey, set, get, data }
}
