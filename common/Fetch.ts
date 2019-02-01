import fetch from 'isomorphic-unfetch'
import qs from 'query-string'
import { BASE_URL } from './config'
import { startsWith } from './string'

export enum FetchState {
  LOADING = 'LOADING',
  INITIAL = 'INITIAL',
  SUCCESS = 'SUCCESS',
  API_ERROR = 'API_ERROR',
  CATCH_ERROR = 'CATCH_ERROR',
  UNUSED_CALL = 'UNUSED_CALL',
}

export interface IFetch<R> {
  data?: R
  state: FetchState
  error?: Error
  abort: () => void
  fetch: () => void
}

export interface IFetchOpts<Q> {
  query: Partial<Q>
  fetchOpts: RequestInit
}

const noop = () => undefined

export function createDefaultFetchResponse(
  fetchReponse: Partial<IFetch<any>> = {}
): IFetch<any> {
  return {
    state: FetchState.INITIAL,
    abort: noop,
    fetch: noop,
    data: {},
    error: undefined,
    ...fetchReponse,
  }
}

export default class Fetch<R, Q extends object = {}> {
  public baseUrl: string
  public lastUrl: string = ''
  public opts: IFetchOpts<Q>
  public data?: R

  constructor(
    baseUrl: string,
    opts: IFetchOpts<Q> = { query: {}, fetchOpts: {} }
  ) {
    this.baseUrl = startsWith(baseUrl, '/') ? `${BASE_URL}${baseUrl}` : baseUrl
    this.opts = opts
  }

  public transformBody = async (res: Response): Promise<R> => {
    const json = (await res.json()) as R
    return json
  }

  public getUrl = (url: string = '', query: Partial<Q> = {}): string => {
    const queryString = qs.stringify({ ...query, ...this.opts.query })
    return [`${this.baseUrl}${url}`, queryString].join('?')
  }

  public async call(
    additionalUrl?: string,
    opts?: Partial<IFetchOpts<Q>>
  ): Promise<IFetch<R>> {
    const { query, fetchOpts } = { ...this.opts, ...opts }
    const url = this.getUrl(additionalUrl, query)
    this.lastUrl = url

    try {
      const res = await fetch(url, fetchOpts)

      if (res.ok) {
        const data = await this.transformBody(res)
        this.data = data
        return createDefaultFetchResponse({
          state: FetchState.SUCCESS,
          data,
        })
      } else {
        this.data = undefined
        return createDefaultFetchResponse({
          state: FetchState.API_ERROR,
          error: new Error(res.statusText),
        })
      }
    } catch (e) {
      this.data = undefined
      return createDefaultFetchResponse({
        state: FetchState.CATCH_ERROR,
        error: e,
      })
    }
  }
}
