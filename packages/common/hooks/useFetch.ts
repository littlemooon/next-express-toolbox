import { useCallback, useEffect, useRef, useState } from 'react'
import Fetch, { FetchState } from '../Fetch'
import useCache from '../hooks/useCache'
import { CacheKey } from '../state/CacheState'

export interface IFetchState<T> {
  data?: T
  state: FetchState
  error?: Error
}

export interface IFetchCallOpts extends RequestInit {
  force?: boolean
  method: 'get' | 'post'
}

export interface IFetch<T, P> extends IFetchState<T> {
  abort: () => void
  get: (urlParams: P, opts?: Partial<IFetchCallOpts>) => void
  post: (urlParams: P, opts?: Partial<IFetchCallOpts>) => void
}

export interface IFetchOpts<P> {
  initialUrlParams?: P
}

export default function useFetch<T, P extends object = {}>(
  cacheKey: CacheKey,
  fetcher: Fetch<T, P>,
  opts: IFetchOpts<P> = {}
): IFetch<T, P> {
  const { initialUrlParams } = opts

  const abortController = useRef<AbortController | undefined>(undefined)

  const cache = useCache<T>(cacheKey)
  const initialUrl = initialUrlParams ? fetcher.getUrl(initialUrlParams) : ''
  const serializedData = cache && cache.get(initialUrl)
  const initialData = serializedData && fetcher.deserialize(serializedData)

  const [fetchState, setFetchState] = useState<IFetchState<T>>({
    state: initialData ? FetchState.SUCCESS : FetchState.INITIAL,
    data: initialData,
  })

  const call = async (
    urlParams: P,
    { force, method, ...fetchOpts }: IFetchCallOpts = { method: 'get' }
  ) => {
    const url = fetcher.getUrl(urlParams)
    const controller = new AbortController()
    abortController.current = controller

    if (!force && cache && method === 'get') {
      const cached = cache.get(url)
      if (cached) {
        setFetchState({
          state: FetchState.SUCCESS,
          data: cached,
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
      const res = await fetcher[method](urlParams, {
        signal: abortController.current.signal,
        ...fetchOpts,
      })

      if (res) {
        setFetchState(res)

        if (cache && res.state === FetchState.SUCCESS && res.data) {
          cache.set(url, res.data)
        }
      } else {
        throw new Error(`Failed to fetch: ${method.toUpperCase()} ${url}`)
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

  const get = (urlParams: P, o1?: Partial<IFetchCallOpts>) =>
    call(urlParams, { method: 'get', ...o1 })

  const post = (urlParams: P, o2?: Partial<IFetchCallOpts>) =>
    call(urlParams, { method: 'post', ...o2 })

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
    if (initialUrlParams) {
      get(initialUrlParams)
    }
    return cleanup
  }, [])

  return {
    ...fetchState,
    abort,
    get,
    post,
  }
}
