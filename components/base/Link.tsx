import styled, { StyledComponent } from '../../common/styled'
import Text, { ITextProps } from './Text'

const Link: StyledComponent<ITextProps> = styled(Text)()

Link.defaultProps = {
  as: 'a',
  color: 'blue',
}

export default Link
