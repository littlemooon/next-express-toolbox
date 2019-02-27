import styled from '@emotion/styled'
import * as SS from 'styled-system'
import { StyledComponent } from '../../common/styled'
import Flex, { IFlexProps } from './Flex'

export interface IGridProps
  extends IFlexProps,
    SS.GridTemplatesColumnsProps,
    SS.GridTemplatesRowsProps,
    SS.GridColumnGapProps,
    SS.GridRowGapProps,
    SS.GridAutoFlowProps {}

const Grid: StyledComponent<IGridProps> = styled(Flex)(
  {
    display: 'grid',
  },
  SS.gridTemplateColumns,
  SS.gridTemplateRows,
  SS.gridColumnGap,
  SS.gridRowGap,
  SS.gridAutoFlow
)

export default Grid
