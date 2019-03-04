import Flex, { IFlexProps } from 'common/components/base/Flex'
import styled, { StyledComponent } from 'common/styled'

export interface IShadowProps extends IFlexProps {
  noBorder?: boolean
  onClick?: (e: any) => any
}

const Shadow: StyledComponent<IShadowProps> = styled(Flex)`
  cursor: ${p => p.onClick && 'pointer'};
  transition: box-shadow 0.3s ease;

  box-shadow: ${p => !p.noBorder && p.theme.bs[1]};

  &:hover,
  &:focus {
    box-shadow: ${p => p.onClick && !p.noBorder && p.theme.bs[2]};
  }
`

export default Shadow
