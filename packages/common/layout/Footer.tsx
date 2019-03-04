import { SFC } from 'react'
import Box from '../components/base/Box'
import Container from '../layout/Container'

const Footer: SFC = () => {
  return (
    <Box as="footer" width={1} bg="greyLight">
      <Container>{'Littlemooon Ltd'}</Container>
    </Box>
  )
}

export default Footer
