import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { SFC, useContext } from 'react'
import config from '../../config'
import { AuthContext } from '../../state/AuthState'
import Button, { IButtonProps } from '../base/Button'

const LoginButton: SFC<
  IButtonProps & WithRouterProps & { redirect?: string }
> = ({ router, redirect, ...props }) => {
  const authState = useContext(AuthContext)
  const pathname = router && router.pathname

  return authState.token ? (
    <Link href="/">
      <Button onClick={authState.logout} {...props}>
        Logout
      </Button>
    </Link>
  ) : (
    <Button
      as="a"
      href={`${config.SERVER_URL}/api/auth/google${
        pathname ? `?redirect=${redirect || pathname}` : ''
      }`}
      {...props}
    >
      Login
    </Button>
  )
}

export default withRouter(LoginButton)
