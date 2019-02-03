import d from 'dot-prop'
import Link from 'next/link'
import { Component } from 'react'
import Text from '../components/base/Text'
import Layout from '../layout'
import { ServerContext } from '../state/ServerState'

class UserPage extends Component<{ isServer: boolean }> {
  public static getInitialProps() {
    const isServer = typeof window === 'undefined'
    return { isServer }
  }

  public render() {
    return (
      <Layout>
        <ServerContext.Consumer>
          {serverState => (
            <>
              <section>
                <Text>
                  This is another page of the SSR example, you accessed it{' '}
                  <strong>
                    {this.props.isServer ? 'server' : 'client'} side
                  </strong>
                  .
                </Text>
                <Text>You can reload to see how the page change.</Text>
                <Link href="/">
                  <a>Go to Home</a>
                </Link>
              </section>

              {serverState.user && (
                <section>
                  {Object.keys(serverState.user).map(k => {
                    const v = d.get(serverState, `user.${k}`)
                    return <Text key={k}>{`${k}: ${JSON.stringify(v)}`}</Text>
                  })}
                </section>
              )}
            </>
          )}
        </ServerContext.Consumer>
      </Layout>
    )
  }
}

export default UserPage
