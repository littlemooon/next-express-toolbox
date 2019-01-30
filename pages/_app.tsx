import { css, Global } from '@emotion/core'
import d from 'dot-prop'
import App, { Container, DefaultAppIProps, NextAppContext } from 'next/app'
import { AuthStateContext, IAuthState } from '../state/AuthState'
import GithubRepoStateProvider from '../state/GithubRepoState'

interface IAppInitialProps {
  authState: IAuthState
}

export default class AppPage extends App<IAppInitialProps> {
  public static getInitialProps = async ({
    ctx,
    Component,
  }: NextAppContext): Promise<IAppInitialProps & DefaultAppIProps> => {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      authState: {
        user: d.get(ctx, 'req.session.passport.user.profile') || {},
        token: d.get(ctx, 'req.session.token') || '',
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
          <AuthStateContext.Provider value={authState}>
            <GithubRepoStateProvider>
              <Component {...pageProps} />
            </GithubRepoStateProvider>
          </AuthStateContext.Provider>
        </Container>
      </>
    )
  }
}
