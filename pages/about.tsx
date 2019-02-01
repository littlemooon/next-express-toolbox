import d from 'dot-prop'
import Link from 'next/link'
import { Component } from 'react'
import Layout from '../layout'
import { AuthContext } from '../state/AuthState'

class AboutPage extends Component<{ isServer: boolean }> {
  public static getInitialProps() {
    const isServer = typeof window === 'undefined'
    return { isServer }
  }

  public render() {
    return (
      <Layout>
        <AuthContext.Consumer>
          {authState => (
            <>
              <section>
                <p>
                  This is another page of the SSR example, you accessed it{' '}
                  <strong>
                    {this.props.isServer ? 'server' : 'client'} side
                  </strong>
                  .
                </p>
                <p>You can reload to see how the page change.</p>
                <Link href="/">
                  <a>Go to Home</a>
                </Link>
              </section>

              {authState.user && (
                <section>
                  {Object.keys(authState.user).map(k => {
                    const v = d.get(authState, `user.${k}`)
                    return <p key={k}>{`${k}: ${JSON.stringify(v)}`}</p>
                  })}
                </section>
              )}
            </>
          )}
        </AuthContext.Consumer>
      </Layout>
    )
  }
}

export default AboutPage
