import fetch from 'isomorphic-unfetch'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FetchState, IFetch, IFetchSSR } from '../types/index'

export interface IFetchOpts<R> {
  readBody: (res: Response) => Promise<R>
  fetchParams?: RequestInit
  initialData?: R
}

const defaultOpts = {
  readBody: (res: Response) => res.json(),
}
let i = 0
export default function useFetch<R extends object>(
  url: string,
  opts: Partial<IFetchOpts<R>>
): IFetch<R> {
  const [state, setState] = useState<FetchState>(FetchState.INITIAL)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<Partial<R>>({})
  const abortController = useRef<AbortController | undefined>(undefined)
  const { readBody, initialData, fetchParams } = { ...defaultOpts, ...opts }

  const fetchData = async () => {
    const controller = new AbortController()
    abortController.current = controller

    if (initialData && state === FetchState.INITIAL) {
      setState(FetchState.SUCCESS)
      setData(initialData)
      return
    }
    console.log('-------------------- useFetch --> ', i++, state, initialData)
    if (i > 5) {
      return
    }
    setError(undefined)
    setState(FetchState.LOADING)
    setData({})

    try {
      const response = await fetch(url, {
        signal: abortController.current.signal,
        ...fetchParams,
      })

      if (response.ok) {
        const body = await readBody(response)
        if (abortController.current === controller) {
          setData(body)
          setState(FetchState.SUCCESS)
          abortController.current = undefined
        }
      } else if (abortController.current === controller) {
        setError(new Error(response.statusText))
        setState(FetchState.API_ERROR)
        abortController.current = undefined
      }
    } catch (e) {
      if (abortController.current === controller) {
        setError(e)
        setState(FetchState.CATCH_ERROR)
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
    console.log('-------------------- useFetch --> ', 'useeffect', {
      url,
      fetchParams,
    })
    fetchData()
    return cleanup
  }, [url, fetchParams])

  return {
    error,
    state,
    data,
    abort,
    fetch: fetchData,
  }
}

export function fetchSsr<R>(data: R): IFetchSSR<R> {
  return {
    data,
    state: FetchState.SUCCESS,
  }
}
