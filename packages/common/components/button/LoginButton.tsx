import Button, { IButtonProps } from 'common/components/base/Button'
import { AuthContext } from 'common/state/AuthState'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { SFC, useContext } from 'react'

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
    <Link
      href={`/api/auth/google${
        pathname ? `?redirect=${redirect || pathname}` : ''
      }`}
    >
      <Button {...props}>Login</Button>
    </Link>
  )
}

export default withRouter(LoginButton)
