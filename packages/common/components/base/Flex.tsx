import styled from '@emotion/styled'
import Box, { IBoxProps } from 'common/components/base/Box'
import { StyledComponent } from 'common/styled'
import * as SS from 'styled-system'

export interface IFlexProps
  extends IBoxProps,
    SS.AlignItemsProps,
    SS.JustifyContentProps,
    SS.FlexDirectionProps,
    SS.FlexWrapProps {}

const Flex: StyledComponent<IFlexProps> = styled(Box)(
  {
    display: 'flex',
  },
  SS.alignItems,
  SS.justifyContent,
  SS.flexDirection,
  SS.flexWrap
)

Flex.defaultProps = {
  ...Box.defaultProps,
  flexDirection: 'column',
}

export default Flex
