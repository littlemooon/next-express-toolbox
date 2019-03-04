import styled, { StyledComponent } from '../../styled'
import Box, { IBoxProps } from '../base/Box'

const Image: StyledComponent<IBoxProps> = styled(Box)({
  maxWidth: '100%',
  height: 'auto',
})

Image.defaultProps = {
  as: 'img',
}

export default Image
