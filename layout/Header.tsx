import { SFC, useContext } from 'react'
import theme from '../common/theme'
import Shadow from '../components/base/Shadow'
import { TextH1 } from '../components/base/Text'
import { ServerContext } from '../state/ServerState'
import Container from './Container'
import Nav from './Nav'

const Header: SFC = () => {
  const serverState = useContext(ServerContext)
  return (
    <Shadow as="header" width={1} bg="blue" height={theme.h.header}>
      <Container
        color="white"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <TextH1>{serverState.isServerRendered ? 'Server' : 'Client'}</TextH1>
        <Nav />
      </Container>
    </Shadow>
  )
}

export default Header
