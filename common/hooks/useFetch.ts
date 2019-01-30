import { useCallback, useEffect, useRef, useState } from 'react'
import Fetch from '../Fetch'
import { FetchState, IFetch, IState } from '../types/index'

export interface IFetchOpts<R> {
  additionalUrl?: string
  cachedState?: IState<R>
  ssrFetcher?: Fetch<R>
}

export default function useFetch<R>(
  fetcher: Fetch<R>,
  opts: IFetchOpts<R> = {}
): IFetch<R> {
  const { additionalUrl, cachedState, ssrFetcher } = opts
  const ssrData = ssrFetcher ? ssrFetcher.data : undefined

  const [state, setState] = useState<FetchState>(
    ssrData ? FetchState.SUCCESS : FetchState.INITIAL
  )
  const [error, setError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<R | undefined>(ssrData)
  const abortController = useRef<AbortController | undefined>(undefined)

  const fetchData = async ({ noCache }: { noCache?: boolean } = {}) => {
    const url = fetcher.getUrl(additionalUrl)
    const controller = new AbortController()
    abortController.current = controller

    if (!noCache) {
      const cached = cachedState ? cachedState.get(url) : undefined
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
      const fetchResponse: IFetch<R> = await fetcher.call(additionalUrl, {
        fetchOpts: {
          signal: abortController.current.signal,
        },
      })

      setState(fetchResponse.state)
      setData(fetchResponse.data)
      setError(fetchResponse.error)
      console.log('-------------------- useFetch --> 1', fetchResponse.state)
      if (cachedState && fetchResponse.data) {
        console.log('-------------------- useFetch --> 2', fetchResponse.data)
        cachedState.set(url, fetchResponse.data)
      }

      abortController.current = undefined
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
      if (cachedState && ssrData && !cachedState.get(ssrUrl)) {
        cachedState.set(ssrUrl, ssrData)
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
