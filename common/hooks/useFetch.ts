import { useCallback, useEffect, useRef, useState } from 'react'
import { ICache } from '../../state/CacheState'
import Fetch, { FetchState, IFetch } from '../Fetch'

export interface IFetchOpts<T> {
  additionalUrl?: string
  cacheState?: ICache<T>
  ssrFetcher?: Fetch<T>
}

export default function useFetch<T>(
  fetcher: Fetch<T>,
  opts: IFetchOpts<T> = {}
): IFetch<T> {
  const { additionalUrl, cacheState, ssrFetcher } = opts
  const ssrData = ssrFetcher ? ssrFetcher.data : undefined

  const [state, setState] = useState<FetchState>(
    ssrData ? FetchState.SUCCESS : FetchState.INITIAL
  )
  const [error, setError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T | undefined>(ssrData)
  const abortController = useRef<AbortController | undefined>(undefined)

  const fetchData = async ({ noCache }: { noCache?: boolean } = {}) => {
    const url = fetcher.getUrl(additionalUrl)
    const controller = new AbortController()
    abortController.current = controller

    if (!noCache && cacheState) {
      const cached = cacheState.get(url)
      if (cached) {
        setState(FetchState.SUCCESS)
        setData(cached)
        setError(undefined)
        abortController.current = undefined
        return
      }
    }
    setState(FetchState.LOADING)
    setData(undefined)
    setError(undefined)

    try {
      const fetchResponse: IFetch<T> = await fetcher.call(additionalUrl, {
        fetchOpts: {
          signal: abortController.current.signal,
        },
      })

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
    const ssrUrl = ssrFetcher ? ssrFetcher.lastUrl : ''
    if (fetcher.getUrl(additionalUrl) !== ssrUrl) {
      fetchData()
    } else {
      if (cacheState && ssrData && !cacheState.get(ssrUrl)) {
        cacheState.set(ssrUrl, ssrData)
      }
    }
    return cleanup
  }, [additionalUrl])

  return {
    error,
    state,
    data,
    abort,
    fetch: fetchData,
  }
}
