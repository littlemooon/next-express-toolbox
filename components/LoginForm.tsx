import { SFC } from 'react'
import theme from '../common/theme'
import Card from './base/Card'
import Flex from './base/Flex'
import { TextH1 } from './base/Text'
import LoginButton from './button/LoginButton'

const LoginForm: SFC = () => {
  return (
    <Flex alignItems="center">
      <Card width={[1, theme.mw.form]}>
        <TextH1>Login with Google</TextH1>
        <LoginButton />
      </Card>
    </Flex>
  )
}

export default LoginForm
