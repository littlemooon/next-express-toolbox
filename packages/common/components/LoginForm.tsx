import Card from 'common/components/base/Card'
import Flex from 'common/components/base/Flex'
import { TextH1 } from 'common/components/base/Text'
import LoginButton from 'common/components/button/LoginButton'
import theme from 'common/theme'
import { SFC } from 'react'

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
