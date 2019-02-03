import { css, Global } from '@emotion/core'
import d from 'dot-prop'
import { ThemeProvider } from 'emotion-theming'
import App, { Container, DefaultAppIProps, NextAppContext } from 'next/app'
import theme from '../common/theme'
import StateProvider from '../state/index'
import ServerProvider, {
  IServerState,
  ServerContext,
} from '../state/ServerState'

interface IAppPageProps {
  serverState: Partial<IServerState>
}

export default class AppPage extends App<IAppPageProps> {
  public static contextType = ServerContext

  public static getInitialProps = async ({
    ctx,
    Component,
  }: NextAppContext): Promise<DefaultAppIProps & IAppPageProps> => {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      serverState: {
        user: d.get(ctx, 'req.session.passport.user.profile'),
        token: d.get(ctx, 'req.session.token'),
        isServerRendered: typeof window === 'undefined',
      },
      pageProps,
    }
  }

  public render() {
    const { Component, pageProps, serverState } = this.props
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
              <StateProvider>
                <Component {...pageProps} />
              </StateProvider>
            </ServerProvider>
          </ThemeProvider>
        </Container>
      </>
    )
  }
}
