import styled, { StyledComponent } from '../../common/styled'
import Flex, { IFlexProps } from './Flex'

export interface IShadowProps extends IFlexProps {
  noBorder?: boolean
  onClick?: (e: any) => any
}

const Shadow: StyledComponent<IShadowProps> = styled(Flex)`
  cursor: ${p => p.onClick && 'pointer'};
  transition: box-shadow 0.3s ease;

  box-shadow: ${p =>
    !p.noBorder &&
    '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'};

  &:hover,
  &:focus {
    box-shadow: ${p =>
      p.onClick &&
      !p.noBorder &&
      '0px 4px 20px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'};
  }
`

export default Shadow
