import Box from 'common/components/base/Box'
import Container from 'common/layout/Container'
import { SFC } from 'react'

const Footer: SFC = () => {
  return (
    <Box as="footer" width={1} bg="greyLight">
      <Container>{'Littlemooon Ltd'}</Container>
    </Box>
  )
}

export default Footer
