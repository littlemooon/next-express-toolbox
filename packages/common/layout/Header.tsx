import { SFC } from 'react'
import Shadow from '../components/base/Shadow'
import { TextH1 } from '../components/base/Text'
import { isServer } from '../globals'
import Container from '../layout/Container'
import Nav from '../layout/Nav'
import theme from '../theme'

const Header: SFC = () => {
  return (
    <Shadow as="header" width={1} bg="blue" height={theme.h.header}>
      <Container
        color="white"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <TextH1>{isServer ? 'Server' : 'Client'}</TextH1>
        <Nav />
      </Container>
    </Shadow>
  )
}

export default Header
