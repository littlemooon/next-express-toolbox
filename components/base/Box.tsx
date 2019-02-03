import isPropValid from '@emotion/is-prop-valid'
import * as SS from 'styled-system'
import styled, { StyledComponent } from '../../common/styled'

export interface IBoxProps
  extends SS.SpaceProps,
    SS.WidthProps,
    SS.FontSizeProps,
    SS.ColorProps,
    SS.BorderProps,
    SS.BordersProps,
    SS.BorderColorProps,
    SS.BorderRadiusProps,
    SS.MaxWidthProps,
    SS.MinWidthProps,
    SS.HeightProps,
    SS.MaxHeightProps,
    SS.MinHeightProps {
  className?: string
  css?: string
}

const Box: StyledComponent<IBoxProps> = styled('div', {
  shouldForwardProp: prop =>
    isPropValid(prop) && !['width', 'height', 'color'].includes(prop),
})(
  {
    boxSizing: 'border-box',
  },
  SS.space,
  SS.width,
  SS.fontSize,
  SS.color,
  SS.border,
  SS.borders,
  SS.borderColor,
  SS.borderRadius,
  SS.maxWidth,
  SS.minWidth,
  SS.height,
  SS.maxHeight,
  SS.minHeight
)

Box.defaultProps = {
  m: 0,
  p: 0,
}

export default Box
