import * as SS from 'styled-system'
import styled, { StyledComponent } from '../../styled'
import theme from '../../theme'
import Flex, { IFlexProps } from '../base/Flex'

export interface ICardProps
  extends IFlexProps,
    SS.BoxShadowProps,
    SS.BackgroundImageProps,
    SS.BackgroundSizeProps,
    SS.BackgroundPositionProps,
    SS.BackgroundRepeatProps,
    SS.OpacityProps {}

const Card: StyledComponent<ICardProps> = styled(Flex)(
  SS.boxShadow,
  SS.backgroundImage,
  SS.backgroundSize,
  SS.backgroundPosition,
  SS.backgroundRepeat,
  SS.opacity
)

Card.defaultProps = {
  ...Flex.defaultProps,
  boxShadow: theme.bs[1],
  borderRadius: 4,
  p: 3,
}

export default Card
