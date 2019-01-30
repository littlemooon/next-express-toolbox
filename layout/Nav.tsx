import Link from 'next/link'
import { SFC, useContext } from 'react'
import Fetch from '../common/Fetch'
import { AuthStateContext } from '../state/AuthState'

const logoutFetcher = new Fetch('/logout')

const Nav: SFC = () => {
  const onClick = () => logoutFetcher.call()
  const authState = useContext(AuthStateContext)

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
        <Link href="/">
          <button onClick={onClick}>Logout</button>
        </Link>
      ) : (
        <Link href="/auth/google">
          <button>Login</button>
        </Link>
      )}
    </nav>
  )
}

export default Nav
