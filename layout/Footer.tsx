import { SFC } from 'react'
import Shadow from '../components/base/Shadow'
import Container from './Container'

const Footer: SFC = () => {
  return (
    <Shadow as="footer" width={1} bg="greyLight">
      <Container>{'Littlemooon Ltd'}</Container>
    </Shadow>
  )
}

export default Footer
