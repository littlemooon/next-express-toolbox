import { css, Global } from '@emotion/core'
import { IFetchResponse } from 'common/Fetch'
import { authFetcher } from 'common/fetchers/index'
import AuthProvider, { AuthContext, IAuthState } from 'common/state/AuthState'
import {
  CacheKey,
  CacheProvider,
  createCacheFromFetches,
  IAppCache,
} from 'common/state/CacheState'
import theme from 'common/theme'
import { ThemeProvider } from 'emotion-theming'
import App, { Container, DefaultAppIProps, NextAppContext } from 'next/app'

interface IAppPageProps {
  authState?: IAuthState
  cache: IAppCache
}

interface IInitialProps {
  [x: string]: any
  initialCache?: Map<CacheKey, Array<IFetchResponse<any>>>
}

export default class AppPage extends App<IAppPageProps> {
  public static contextType = AuthContext

  public static getInitialProps = async ({
    ctx,
    Component,
  }: NextAppContext): Promise<DefaultAppIProps & IAppPageProps> => {
    const authState = await authFetcher.get({})

    const {
      initialCache = new Map(),
      ...pageProps
    }: IInitialProps = Component.getInitialProps
      ? await Component.getInitialProps({ ...ctx, authState } as any)
      : {}

    const cache = Array.from(initialCache.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: createCacheFromFetches(value) }),
      {}
    )

    return {
      authState: authState.data,
      cache,
      pageProps,
    }
  }

  public render() {
    const { Component, pageProps, authState, cache } = this.props
    return (
      <>
        <Global
          styles={css`
            body {
              margin: 0;
              padding: 0;
            }
            * {
              box-sizing: border-box;
            }
          `}
        />
        <Container>
          <ThemeProvider theme={theme}>
            <AuthProvider value={authState}>
              <CacheProvider cache={cache}>
                <Component {...pageProps} />
              </CacheProvider>
            </AuthProvider>
          </ThemeProvider>
        </Container>
      </>
    )
  }
}
