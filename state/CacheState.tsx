import { createContext, ReactNode, useState } from 'react'
import { FetchState, IFetchResponse } from '../common/Fetch'
import { IGithubData, ITimesheetData } from '../common/types/api'
import { TFile, TFileList } from '../common/types/index'
import { noop } from '../common/utils'

export enum CacheKey {
  GITHUB_REPO = 'GITHUB_REPO',
  FILE_LIST = 'FILE_LIST',
  FILE = 'FILE',
  DRIVE = 'DRIVE',
  DRIVE_LIST = 'DRIVE_LIST',
  TIMESHEET = 'TIMESHEET',
  TIMESHEET_LIST = 'TIMESHEET_LIST',
}

export interface ICacheItem<T> {
  data: T
  lastUpdate?: Date
}

export interface IAppCacheItem<T> {
  [url: string]: ICacheItem<T>
}

export interface IAppCache {
  [CacheKey.GITHUB_REPO]?: IAppCacheItem<IGithubData>
  [CacheKey.FILE_LIST]?: IAppCacheItem<TFileList>
  [CacheKey.FILE]?: IAppCacheItem<TFile>
  [CacheKey.TIMESHEET_LIST]?: IAppCacheItem<TFileList>
  [CacheKey.TIMESHEET]?: IAppCacheItem<ITimesheetData>
  [CacheKey.DRIVE_LIST]?: IAppCacheItem<TFileList>
  [CacheKey.DRIVE]?: IAppCacheItem<TFile>
}

export const CacheContext = createContext<{
  cache: IAppCache
  get: (cacheKey: CacheKey, key: string) => any
  getItem: (cacheKey: CacheKey) => any
  set: (cacheKey: CacheKey, key: string, value: any) => void
  setItem: (cacheKey: CacheKey, value: IAppCacheItem<any>) => void
}>({
  cache: {},
  get: noop,
  getItem: noop,
  set: noop,
  setItem: noop,
})

export function createCacheFromFetches<T>(
  results: Array<IFetchResponse<T>>
): IAppCacheItem<T> {
  return results.reduce((acc, res) => {
    return res.state === FetchState.SUCCESS && res.data
      ? { ...acc, [res.url]: { data: res.data, lastUpdate: new Date() } }
      : acc
  }, {})
}

export function CacheProvider(props: {
  children: ReactNode
  cache?: IAppCache
}) {
  const [cache, setCacheState] = useState<IAppCache>(props.cache || {})

  function getItem<T>(cacheKey: CacheKey): IAppCacheItem<T> | undefined {
    return cache[cacheKey] as IAppCacheItem<T> | undefined
  }

  function get<T>(cacheKey: CacheKey, key: string): T | undefined {
    const cacheItem = getItem<T>(cacheKey)
    return cacheItem && cacheItem[key] ? cacheItem[key].data : undefined
  }

  function setItem<T>(cacheKey: CacheKey, value: IAppCacheItem<T>) {
    setCacheState({ ...cache, [cacheKey]: value })
  }

  function set<T>(cacheKey: CacheKey, key: string, value: T) {
    const cacheItem = getItem<T>(cacheKey)
    setItem(cacheKey, {
      ...cacheItem,
      [key]: { data: value, lastUpdate: new Date() },
    })
  }

  return (
    <CacheContext.Provider
      value={{
        cache,
        get,
        getItem,
        set,
        setItem,
      }}
    >
      {props.children}
    </CacheContext.Provider>
  )
}
