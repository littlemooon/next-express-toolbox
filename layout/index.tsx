import { NextFC } from 'next'
import Head from 'next/head'
import { ReactNode, useContext } from 'react'
import { APP_NAME } from '../common/constants'
import AuthRequired from '../components/AuthRequired'
import Box from '../components/base/Box'
import Flex from '../components/base/Flex'
import { ServerContext } from '../state/ServerState'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'

export interface ILayoutProps {
  children: ReactNode
  title?: string
  requireAuth?: boolean
}

const Layout: NextFC<ILayoutProps> = ({
  children,
  title = APP_NAME,
  requireAuth,
}) => {
  const serverState = useContext(ServerContext)

  return (
    <Flex minHeight="100vh" justifyContent="space-between" width={1}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box width={1}>
        <Header />
        <Container as="main" py={[3, 4, 5]}>
          {requireAuth && !serverState.token ? <AuthRequired /> : children}
        </Container>
      </Box>
      <Footer />
    </Flex>
  )
}

export default Layout
