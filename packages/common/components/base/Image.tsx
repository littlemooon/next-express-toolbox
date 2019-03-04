import Box, { IBoxProps } from 'common/components/base/Box'
import styled, { StyledComponent } from 'common/styled'

const Image: StyledComponent<IBoxProps> = styled(Box)({
  maxWidth: '100%',
  height: 'auto',
})

Image.defaultProps = {
  as: 'img',
}

export default Image
