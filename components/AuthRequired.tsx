import { SFC } from 'react'
import theme from '../common/theme'
import Card from './base/Card'
import Flex from './base/Flex'
import { TextH1, TextH3 } from './base/Text'
import LoginButton from './button/LoginButton'

const AuthRequired: SFC = () => {
  return (
    <Flex alignItems="center">
      <Card width={[1, theme.mw.form]}>
        <TextH1>Authentication required</TextH1>
        <TextH3>Please login with google</TextH3>
        <LoginButton />
      </Card>
    </Flex>
  )
}

export default AuthRequired
