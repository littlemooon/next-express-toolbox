import { css, Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import App, { Container, DefaultAppIProps, NextAppContext } from 'next/app'
import { IFetchResponse } from '../common/Fetch'
import theme from '../common/theme'
import {
  CacheKey,
  CacheProvider,
  createCacheFromFetches,
  IAppCache,
} from '../state/CacheState'
import ServerProvider, {
  getServerState,
  IServerState,
  ServerContext,
} from '../state/ServerState'

interface IAppPageProps {
  serverState: Partial<IServerState>
  cache: IAppCache
}

interface IInitialProps {
  [x: string]: any
  initialCache?: Map<CacheKey, Array<IFetchResponse<any>>>
}

export default class AppPage extends App<IAppPageProps> {
  public static contextType = ServerContext

  public static getInitialProps = async ({
    ctx,
    Component,
  }: NextAppContext): Promise<DefaultAppIProps & IAppPageProps> => {
    const {
      initialCache = new Map(),
      ...pageProps
    }: IInitialProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    const cache = Array.from(initialCache.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: createCacheFromFetches(value) }),
      {}
    )

    return {
      serverState: getServerState(ctx),
      cache,
      pageProps,
    }
  }

  public render() {
    const { Component, pageProps, serverState, cache } = this.props
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
            <ServerProvider value={serverState}>
              <CacheProvider cache={cache}>
                <Component {...pageProps} />
              </CacheProvider>
            </ServerProvider>
          </ThemeProvider>
        </Container>
      </>
    )
  }
}
