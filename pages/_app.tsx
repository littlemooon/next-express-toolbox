import { css, Global } from '@emotion/core'
import d from 'dot-prop'
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
  IServerState,
  ServerContext,
} from '../state/ServerState'

interface IAppPageProps {
  serverState: Partial<IServerState>
  cache: IAppCache
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
    }: {
      initialCache?: Map<CacheKey, [IFetchResponse<any>]>
    } = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    const cache = Array.from(initialCache.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: createCacheFromFetches(value) }),
      {}
    )

    return {
      serverState: {
        user: d.get(ctx, 'req.session.passport.user.profile'),
        token: d.get(ctx, 'req.session.token'),
        isServerRendered: typeof window === 'undefined',
      },
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
