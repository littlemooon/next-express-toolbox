import Link from 'next/link'
import { SFC, useContext } from 'react'
import { logoutFetcher } from '../common/fetchers'
import { removeStorage, StorageKey } from '../common/storage'
import theme from '../common/theme'
import Button from '../components/base/Button'
import { ServerContext } from '../state/ServerState'

const onLogout = () => {
  removeStorage(StorageKey.AUTH_STATE)
  logoutFetcher.get()
}

const Nav: SFC = () => {
  const serverState = useContext(ServerContext)

  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/user">
        <a>User</a>
      </Link>
      <Link href="/csv">
        <a>Csv</a>
      </Link>
      <Link href="/github">
        <a>Github</a>
      </Link>

      {serverState.token ? (
        <Link href="/">
          <Button
            bg={theme.white}
            color={theme.colors.green}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Link>
      ) : (
        <Link href="/auth/google">
          <Button bg={theme.white} color={theme.colors.green}>
            Login
          </Button>
        </Link>
      )}
    </nav>
  )
}

export default Nav
