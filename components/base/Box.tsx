import isPropValid from '@emotion/is-prop-valid'
import * as React from 'react'
import * as SS from 'styled-system'
import styled, { StyledComponent } from '../../common/styled'

export interface IBoxProps
  extends SS.SpaceProps,
    SS.WidthProps,
    SS.MaxWidthProps,
    SS.MinWidthProps,
    SS.HeightProps,
    SS.MaxHeightProps,
    SS.MinHeightProps,
    SS.ColorProps,
    SS.BorderProps,
    SS.TextAlignProps,
    SS.PositionProps,
    SS.GridRowProps {
  color?: string
  id?: string
  innerRef?: React.RefObject<any>
  style?: React.CSSProperties
}

const Box: StyledComponent<IBoxProps> = styled('div', {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && !['width', 'height'].includes(prop),
})(
  SS.space,
  SS.width,
  SS.maxWidth,
  SS.minWidth,
  SS.height,
  SS.maxHeight,
  SS.minHeight,
  SS.color,
  SS.bgColor,
  SS.border,
  SS.textAlign,
  SS.position,
  SS.gridRow
)

export default Box
