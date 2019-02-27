import { NextFC } from 'next'
import Router from 'next/router'
import LoginForm from '../components/LoginForm'
import Layout from '../layout'
import { getServerState } from '../state/ServerState'

const LoginPage: NextFC = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  )
}

LoginPage.getInitialProps = async ctx => {
  const { query, res } = ctx
  const redirect =
    query && typeof query.redirect === 'string' ? query.redirect : '/'

  const { token } = getServerState(ctx)

  if (token) {
    if (res) {
      res.writeHead(302, { Location: redirect })
      res.end()
    } else {
      Router.push(redirect)
    }
  }

  return {}
}

export default LoginPage
