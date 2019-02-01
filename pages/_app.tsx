import { css, Global } from '@emotion/core'
import d from 'dot-prop'
import App, { Container, DefaultAppIProps, NextAppContext } from 'next/app'
import AuthStateProvider, {
  AuthStateContext,
  IAuthState,
} from '../state/AuthState'
import StateProvider from '../state/index'

interface IAppPageProps {
  authState: Partial<IAuthState>
}

export default class AppPage extends App<IAppPageProps> {
  public static contextType = AuthStateContext

  public static getInitialProps = async ({
    ctx,
    Component,
  }: NextAppContext): Promise<DefaultAppIProps & IAppPageProps> => {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      authState: {
        user: d.get(ctx, 'req.session.passport.user.profile'),
        token: d.get(ctx, 'req.session.token'),
      },
      pageProps,
    }
  }

  public render() {
    const { Component, pageProps, authState } = this.props
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
          <AuthStateProvider value={authState}>
            <StateProvider>
              <Component {...pageProps} />
            </StateProvider>
          </AuthStateProvider>
        </Container>
      </>
    )
  }
}
