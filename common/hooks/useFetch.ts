import { useCallback, useEffect, useRef, useState } from 'react'
import { ICache } from '../../state/CacheState'
import Fetch, { FetchState, IFetchResponse } from '../Fetch'

export interface IFetchCallOpts {
  noCache?: boolean
}

export interface IFetch<R> {
  data?: R
  state: FetchState
  error?: Error
  abort: () => void
  call: (opts: IFetchCallOpts) => void
}

export interface IFetchOpts<T> {
  additionalUrl?: string
  cacheState?: ICache<T>
}

export default function useFetch<T>(
  fetcher: Fetch<T>,
  opts: IFetchOpts<T> = {}
): IFetch<T> {
  const { additionalUrl, cacheState } = opts

  const url = fetcher.getUrl(additionalUrl)
  const cached = cacheState && cacheState.get(url)

  const [state, setState] = useState<FetchState>(
    cached ? FetchState.SUCCESS : FetchState.INITIAL
  )
  const [error, setError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T | undefined>(cached)
  const abortController = useRef<AbortController | undefined>(undefined)

  const fetchData = async ({ noCache }: IFetchCallOpts = {}) => {
    const nextUrl = fetcher.getUrl(additionalUrl)
    const controller = new AbortController()
    abortController.current = controller

    if (!noCache && cacheState) {
      const nextCached = cacheState.get(nextUrl)
      if (nextCached) {
        setState(FetchState.SUCCESS)
        setData(nextCached)
        setError(undefined)
        abortController.current = undefined
        return
      }
    }
    setState(FetchState.LOADING)
    setData(undefined)
    setError(undefined)

    try {
      const fetchResponse: IFetchResponse<T> = await fetcher.call(
        additionalUrl,
        {
          fetchOpts: {
            signal: abortController.current.signal,
          },
        }
      )

      setState(fetchResponse.state)
      setData(fetchResponse.data)
      setError(fetchResponse.error)
      abortController.current = undefined

      if (
        cacheState &&
        fetchResponse.state === FetchState.SUCCESS &&
        fetchResponse.data
      ) {
        cacheState.set(url, fetchResponse.data)
      }
    } catch (e) {
      if (abortController.current === controller) {
        setState(FetchState.CATCH_ERROR)
        setError(e)
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
    fetchData()
    return cleanup
  }, [additionalUrl])

  return {
    error,
    state,
    data,
    abort,
    call: fetchData,
  }
}
