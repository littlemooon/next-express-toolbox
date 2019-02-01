import Link from 'next/link'
import { Component } from 'react'
import Layout from '../layout'

class AboutPage extends Component<{ isServer: boolean }> {
  public static getInitialProps() {
    const isServer = typeof window === 'undefined'
    return { isServer }
  }

  public render() {
    return (
      <Layout>
        <section>
          <p>
            This is another page of the SSR example, you accessed it{' '}
            <strong>{this.props.isServer ? 'server' : 'client'} side</strong>.
          </p>
          <p>You can reload to see how the page change.</p>
          <Link href="/">
            <a>Go to Home</a>
          </Link>
        </section>
      </Layout>
    )
  }
}

export default AboutPage
