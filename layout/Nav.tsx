import Link from 'next/link'
import { SFC } from 'react'
import theme from '../common/theme'
import Button from '../components/base/Button'
import LoginButton from '../components/button/LoginButton'

const Nav: SFC = () => {
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
      <Link href="/drive">
        <Button>Drive</Button>
      </Link>
      <Link href="/file">
        <Button>File</Button>
      </Link>
      <Link href="/github">
        <Button>Github</Button>
      </Link>

      <LoginButton bg={theme.white} color={theme.tx.primary} />
    </nav>
  )
}

export default Nav
