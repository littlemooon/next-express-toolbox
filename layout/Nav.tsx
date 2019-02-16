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
        <Button>
          <a>Home</a>
        </Button>
      </Link>
      <Link href="/user">
        <Button>
          <a>User</a>
        </Button>
      </Link>
      <Link href="/file">
        <Button>
          <a>File</a>
        </Button>
      </Link>
      <Link href="/github">
        <Button>
          <a>Github</a>
        </Button>
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
