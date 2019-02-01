import styled from '@emotion/styled'
import { JustifyItemsProperty } from 'csstype'
import * as SS from 'styled-system'
import { StyledComponent } from '../../common/styled'
import Box, { IBoxProps } from './Box'

export interface IFlexProps
  extends IBoxProps,
    SS.AlignItemsProps,
    SS.AlignContentProps,
    SS.JustifyContentProps,
    SS.FlexWrapProps,
    SS.FlexBasisProps,
    SS.FlexDirectionProps,
    SS.FlexProps,
    SS.JustifySelfProps,
    SS.JustifyItemsProps,
    SS.BorderRadiusProps,
    SS.AlignSelfProps {
  justifyItems?: JustifyItemsProperty | JustifyItemsProperty[]
}

const justifyItems = SS.style({
  prop: 'justifyItems',
  cssProperty: 'justifyItems',
})

const Flex: StyledComponent<IFlexProps> = styled(Box)`
  display: flex;

  ${SS.alignContent};
  ${SS.alignItems};
  ${SS.alignSelf};
  ${SS.flex};
  ${SS.flexBasis};
  ${SS.flexDirection};
  ${SS.flexWrap};
  ${SS.justifyContent};
  ${justifyItems};
  ${SS.justifySelf};
  ${SS.borderRadius};
`

Flex.defaultProps = {
  p: 0,
  m: 0,
  height: 'auto',
  maxHeight: 'auto',
  flexWrap: 'nowrap',
  flexDirection: 'column',
}

export default Flex
