import Link from 'next/link'
import { SFC, useContext } from 'react'
import Fetch from '../common/Fetch'
import { removeStorage, StorageKey } from '../common/storage'
import { AuthContext } from '../state/AuthState'

const logoutFetcher = new Fetch('/auth/logout')

const onLogout = () => {
  removeStorage(StorageKey.AUTH_STATE)
  logoutFetcher.call()
}

const Nav: SFC = () => {
  const authState = useContext(AuthContext)

  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/github">
        <a>Github</a>
      </Link>

      {authState.token ? (
        <>
          Hello <strong>{authState.user.displayName}</strong>
          <Link href="/">
            <button onClick={onLogout}>Logout</button>
          </Link>
        </>
      ) : (
        <Link href="/auth/google">
          <button>Login</button>
        </Link>
      )}
    </nav>
  )
}

export default Nav
