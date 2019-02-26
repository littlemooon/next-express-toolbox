import to from 'await-to-js'
import fetch from 'isomorphic-unfetch'
import { BASE_URL } from './constants'
import { startsWith } from './string'

export enum FetchState {
  LOADING = 'LOADING',
  INITIAL = 'INITIAL',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface IFetchResponse<T> {
  data?: T
  state: FetchState
  error?: Error
  url: string
}

export type ConstructUrl<P> = (urlParams: P) => string

const noop = () => ''

export default class Fetch<T, P extends object = {}> {
  public opts: RequestInit
  public constructUrl: ConstructUrl<P> = noop
  public lastResponse: IFetchResponse<T> = {
    state: FetchState.INITIAL,
    url: '',
  }

  constructor(constructUrl: ConstructUrl<P>, opts?: RequestInit) {
    this.constructUrl = constructUrl
    this.opts = opts || {}
  }

  public transformBody = async (res: Response): Promise<T> => {
    const json = (await res.json()) as T
    return json
  }

  public getUrl = (urlParams: P): string => {
    const url = this.constructUrl(urlParams)
    return startsWith(url, '/') ? `${BASE_URL}/api${url}` : url
  }

  public saveResponse = (response: IFetchResponse<T>) => {
    this.lastResponse = response
    return response
  }

  public async call(
    urlParams: P,
    opts: RequestInit = {}
  ): Promise<IFetchResponse<T>> {
    const url = this.getUrl(urlParams)
    const fetchOpts = {
      ...this.opts,
      ...opts,
    }

    try {
      const [err, res] = await to(fetch(url, fetchOpts))

      if (res && res.ok) {
        if (fetchOpts.method === 'GET') {
          const data = await this.transformBody(res)
          return this.saveResponse({
            url,
            state: FetchState.SUCCESS,
            data,
          })
        } else {
          return {
            url,
            state: FetchState.SUCCESS,
          }
        }
      } else {
        return this.saveResponse({
          url,
          state: FetchState.ERROR,
          error: new Error(
            err || (res ? res.statusText : `Unknown error fetching: ${url}`)
          ),
        })
      }
    } catch (e) {
      return this.saveResponse({
        url,
        state: FetchState.ERROR,
        error: e,
      })
    }
  }

  public async get(urlParams: P, opts?: RequestInit) {
    return this.call(urlParams, {
      method: 'GET',
      ...opts,
    })
  }

  public async post(urlParams: P, opts?: RequestInit) {
    return this.call(urlParams, {
      method: 'POST',
      ...opts,
    })
  }

  public deserialize(obj: any): T {
    return obj
  }
}
