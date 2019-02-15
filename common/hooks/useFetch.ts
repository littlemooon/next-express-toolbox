import { useCallback, useEffect, useRef, useState } from 'react'
import { ICache } from '../../state/CacheState'
import Fetch, { FetchState } from '../Fetch'

export interface IFetchCallOpts {
  noCache?: boolean
}

export interface IFetchState<T> {
  data?: T
  state: FetchState
  error?: Error
}

export interface IFetch<T> extends IFetchState<T> {
  abort: () => void
  get: (opts: IFetchCallOpts) => void
}

export interface IFetchOpts<T> {
  additionalUrl?: string
  cacheState?: ICache<T>
  autoRun?: boolean
}

export default function useFetch<T>(
  fetcher: Fetch<T>,
  opts: IFetchOpts<T> = {}
): IFetch<T> {
  const { additionalUrl, cacheState, autoRun } = opts

  const url = fetcher.getUrl(additionalUrl)
  const cached = cacheState && cacheState.get(url)
  const abortController = useRef<AbortController | undefined>(undefined)

  const [fetchState, setFetchState] = useState<IFetchState<T>>({
    state: cached ? FetchState.SUCCESS : FetchState.INITIAL,
    data: cached,
  })

  const fetchData = async ({ noCache }: IFetchCallOpts = {}) => {
    const nextUrl = fetcher.getUrl(additionalUrl)
    const controller = new AbortController()
    abortController.current = controller

    if (!noCache && cacheState) {
      const nextCached = cacheState.get(nextUrl)
      if (nextCached) {
        setFetchState({
          state: FetchState.SUCCESS,
          data: nextCached,
          error: undefined,
        })
        abortController.current = undefined
        return
      }
    }

    setFetchState({
      state: FetchState.LOADING,
      data: undefined,
      error: undefined,
    })

    try {
      const [err, fetchResponse] = await fetcher.get(additionalUrl, {
        fetchOpts: {
          signal: abortController.current.signal,
        },
      })

      if (fetchResponse && !err) {
        setFetchState(fetchResponse)

        if (
          cacheState &&
          fetchResponse.state === FetchState.SUCCESS &&
          fetchResponse.data
        ) {
          cacheState.set(url, fetchResponse.data)
        }
      } else {
        setFetchState({
          state: FetchState.ERROR,
          data: undefined,
          error: err || undefined,
        })
      }
      abortController.current = undefined
    } catch (e) {
      if (abortController.current === controller) {
        setFetchState({
          state: FetchState.ERROR,
          data: undefined,
          error: e,
        })
        abortController.current = undefined
      }
    }
  }

  const abort = useCallback(() => {
    if (abortController && abortController.current) {
      abortController.current.abort()
    }
  }, [])

  const cleanup = () => {
    if (abortController.current) {
      abortController.current.abort()
      abortController.current = undefined
    }
  }

  useEffect(() => {
    if (autoRun) {
      fetchData()
    }
    return cleanup
  }, [additionalUrl])

  return {
    ...fetchState,
    abort,
    get: fetchData,
  }
}
