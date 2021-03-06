import to from 'await-to-js'
import fetch from 'isomorphic-unfetch'
import { NextContext } from 'next'
import config from './config'
import log from './log'
import { includes, startsWith } from './string'

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
  public token?: string
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

  public setToken = (ctx: NextContext) => {
    const { authState } = ctx as any
    this.token = authState ? authState.token : undefined
    return this
  }

  public getUrl = (urlParams: P): string => {
    const url = this.constructUrl(urlParams)
    const token = this.token
    const query = token ? `${includes(url, '?') ? '&' : '?'}token=${token}` : ''

    return startsWith(url, '/') ? `${config.SERVER_URL}/api${url}${query}` : url
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
    const fetchOpts: RequestInit = {
      ...this.opts,
      ...opts,
    }

    try {
      const [fetchError, res] = await to(fetch(url, fetchOpts))
      const isGet = fetchOpts.method === 'GET'

      if (res && res.ok) {
        const data = isGet ? await this.transformBody(res) : undefined
        return this.saveResponse({
          url,
          state: FetchState.SUCCESS,
          data,
        })
      } else if (fetchError) {
        log.error(`API fetch error: ${url}`, fetchError)
        return this.saveResponse({
          url,
          state: FetchState.ERROR,
          error: fetchError,
        })
      } else {
        try {
          const data = res ? await res.json() : {}
          const serverError = new Error(data.message || 'Unknown error')
          log.error(`API server error: ${url}`, serverError)
          return this.saveResponse({
            url,
            state: FetchState.ERROR,
            error: serverError,
          })
        } catch (parseError) {
          log.error(`API parse error: ${url}`, parseError)
          return this.saveResponse({
            url,
            state: FetchState.ERROR,
            error: parseError,
          })
        }
      }
    } catch (callError) {
      log.error(`API call error: ${url}`, callError)
      return this.saveResponse({
        url,
        state: FetchState.ERROR,
        error: callError,
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
