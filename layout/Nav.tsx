import Link from 'next/link'
import { SFC, useContext } from 'react'
import { logoutFetcher } from '../common/fetchers'
import { removeStorage, StorageKey } from '../common/storage'
import theme from '../common/theme'
import Button from '../components/base/Button'
import { ServerContext } from '../state/ServerState'

const onLogout = () => {
  removeStorage(StorageKey.AUTH_STATE)
  logoutFetcher.get({})
}

const Nav: SFC = () => {
  const serverState = useContext(ServerContext)

  return (
    <nav>
      <Link href="/">
        <Button>Home</Button>
      </Link>
      <Link href="/user">
        <Button>User</Button>
      </Link>
      <Link href="/chart">
        <Button>Chart</Button>
      </Link>
      <Link href="/file">
        <Button>File</Button>
      </Link>
      <Link href="/github">
        <Button>Github</Button>
      </Link>

      {serverState.token ? (
        <Link href="/">
          <Button bg={theme.white} color={theme.tx.primary} onClick={onLogout}>
            Logout
          </Button>
        </Link>
      ) : (
        <Link href="/api/auth/google">
          <Button bg={theme.white} color={theme.tx.primary}>
            Login
          </Button>
        </Link>
      )}
    </nav>
  )
}

export default Nav
