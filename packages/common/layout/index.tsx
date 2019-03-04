import { css, Global } from '@emotion/core'
import Box from 'common/components/base/Box'
import Flex from 'common/components/base/Flex'
import LoginForm from 'common/components/LoginForm'
import config from 'common/config'
import Container from 'common/layout/Container'
import Footer from 'common/layout/Footer'
import Header from 'common/layout/Header'
import { AuthContext } from 'common/state/AuthState'
import { NextFC } from 'next'
import Head from 'next/head'
import { ReactNode, useContext } from 'react'

export interface ILayoutProps {
  children: ReactNode
  title?: string
  requireAuth?: boolean
}

const Layout: NextFC<ILayoutProps> = ({
  children,
  title = config.APP_NAME,
  requireAuth,
}) => {
  const authState = useContext(AuthContext)

  return (
    <Flex minHeight="100vh" justifyContent="space-between" width={1}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Global
        styles={css`
          html {
            -webkit-print-color-adjust: exact;
          }
        `}
      />
      <Box width={1}>
        <Header />
        <Container as="main" py={[3, 4, 5]}>
          {requireAuth && !authState.token ? <LoginForm /> : children}
        </Container>
      </Box>
      <Footer />
    </Flex>
  )
}

export default Layout
