import Flex, { IFlexProps } from 'common/components/base/Flex'
import styled, { StyledComponent } from 'common/styled'
import theme from 'common/theme'
import * as SS from 'styled-system'

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
