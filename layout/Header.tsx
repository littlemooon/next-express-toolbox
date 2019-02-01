import { SFC } from 'react'
import theme from '../common/theme'
import Shadow from '../components/base/Shadow'
import Container from './Container'
import Nav from './Nav'

const Header: SFC = () => {
  return (
    <Shadow as="header" width={1} bg="blue" height={theme.h.header}>
      <Container
        color="white"
        flexDirection="row"
        justifyContent="space-between"
      >
        <h1>Test App</h1>
        <Nav />
      </Container>
    </Shadow>
  )
}

export default Header
