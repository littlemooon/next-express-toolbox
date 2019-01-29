export enum FetchState {
  LOADING = 'LOADING',
  INITIAL = 'INITIAL',
  SUCCESS = 'SUCCESS',
  API_ERROR = 'API_ERROR',
  CATCH_ERROR = 'CATCH_ERROR',
  UNUSED_CALL = 'UNUSED_CALL',
}

export interface IFetchSSR<R> {
  data: Partial<R>
  state: FetchState
}

export interface IFetch<R> extends IFetchSSR<R> {
  error: Error | undefined
  abort: () => void
  fetch: () => void
}
