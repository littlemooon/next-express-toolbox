import styled, { StyledComponent } from '../../common/styled'
import Box, { IBoxProps } from './Box'

const Image: StyledComponent<IBoxProps> = styled(Box)({
  maxWidth: '100%',
  height: 'auto',
})

Image.defaultProps = {
  as: 'img',
}

export default Image
