import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { SFC, useContext } from 'react'
import { logoutFetcher } from '../../common/fetchers/index'
import { removeStorage, StorageKey } from '../../common/storage'
import { ServerContext } from '../../state/ServerState'
import Button, { IButtonProps } from '../base/Button'

const onLogout = () => {
  removeStorage(StorageKey.AUTH_STATE)
  logoutFetcher.get({})
}

const LoginButton: SFC<IButtonProps & WithRouterProps> = ({
  router,
  ...props
}) => {
  const serverState = useContext(ServerContext)
  const pathname = router && router.pathname
  console.log(
    '-------------------- LoginButton --> ',
    `/api/auth/google${pathname ? `?redirect=${pathname}` : ''}`
  )
  return serverState.token ? (
    <Link href="/">
      <Button onClick={onLogout} {...props}>
        Logout
      </Button>
    </Link>
  ) : (
    <Link href={`/api/auth/google${pathname ? `?redirect=${pathname}` : ''}`}>
      <Button {...props}>Login</Button>
    </Link>
  )
}

export default withRouter(LoginButton)
