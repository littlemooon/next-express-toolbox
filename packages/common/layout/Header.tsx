import Shadow from 'common/components/base/Shadow'
import { TextH1 } from 'common/components/base/Text'
import { isServer } from 'common/globals'
import Container from 'common/layout/Container'
import Nav from 'common/layout/Nav'
import theme from 'common/theme'
import { SFC } from 'react'

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
