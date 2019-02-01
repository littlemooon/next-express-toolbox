import { NextFC } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'
import Box from '../components/base/Box'
import Flex from '../components/base/Flex'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'

export interface ILayoutProps {
  children: ReactNode
  title?: string
}

const Layout: NextFC<ILayoutProps> = ({
  children,
  title = 'This is the default title',
}) => {
  return (
    <Flex minHeight="100vh" justifyContent="space-between">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box>
        <Header />
        <Container as="main" pt={[3, 4, 5]}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Flex>
  )
}

export default Layout
