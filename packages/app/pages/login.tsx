import LoginForm from 'common/components/LoginForm'
import Layout from 'common/layout/index'
import { NextFC } from 'next'

const LoginPage: NextFC = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  )
}

export default LoginPage
