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

export interface IFetchResponse<T> {
  data?: T
  state: FetchState
  error?: Error
}

export interface IFetchOpts<Q> {
  query?: Partial<Q>
  fetchOpts?: RequestInit
}

export default class Fetch<T, Q extends object = {}> {
  public baseUrl: string
  public lastUrl: string = ''
  public opts: IFetchOpts<Q>
  public data?: T

  constructor(
    baseUrl: string,
    opts: IFetchOpts<Q> = { query: {}, fetchOpts: {} }
  ) {
    this.baseUrl = startsWith(baseUrl, '/') ? `${BASE_URL}${baseUrl}` : baseUrl
    this.opts = opts
  }

  public transformBody = async (res: Response): Promise<T> => {
    const json = (await res.json()) as T
    return json
  }

  public getUrl = (url: string = '', query: Partial<Q> = {}): string => {
    const queryString = qs.stringify({ ...query, ...(this.opts.query || {}) })
    return [`${this.baseUrl}${url}`, queryString].join('?')
  }

  public async call(
    additionalUrl?: string,
    opts?: Partial<IFetchOpts<Q>>
  ): Promise<IFetchResponse<T>> {
    const query = {
      ...(this.opts.query || {}),
      ...((opts && opts.query) || {}),
    }
    const fetchOpts = {
      ...(this.opts.fetchOpts || {}),
      ...((opts && opts.fetchOpts) || {}),
    }
    const url = this.getUrl(additionalUrl, query)
    this.lastUrl = url

    try {
      const res = await fetch(url, fetchOpts)

      if (res.ok) {
        const data = await this.transformBody(res)
        this.data = data
        return {
          state: FetchState.SUCCESS,
          data,
        }
      } else {
        this.data = undefined
        return {
          state: FetchState.API_ERROR,
          error: new Error(res.statusText),
        }
      }
    } catch (e) {
      this.data = undefined
      return {
        state: FetchState.CATCH_ERROR,
        error: e,
      }
    }
  }
}
