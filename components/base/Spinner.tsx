import { keyframes } from '@emotion/core'
import { SFC } from 'react'
import styled, { StyledComponent } from '../../common/styled'
import theme from '../../common/theme'
import Box, { IBoxProps } from './Box'
import Flex from './Flex'

export interface ISpinnerDotProps extends IBoxProps {
  i: number
}

const pulse = keyframes`
  0% {transform: scale(1);opacity: 1} 
  45% {transform: scale(0.1);opacity: 0.7}
  80% {transform: scale(1);opacity: 1}
`

const fadeIn = keyframes`
  0% {opacity: 0} 
  50% {opacity: 0} 
  100% {opacity: 1}
`

const SpinnerDot: StyledComponent<ISpinnerDotProps> = styled(Box)`
  border-radius: 100%;
  display: inline-block;
  animation: ${pulse} 0.75s ${p => p.i * 0.12}s infinite
      cubic-bezier(0.2, 0.68, 0.18, 1.08),
    ${fadeIn} 5s ease-in;
  animation-fill-mode: both;
`

export interface ISpinnerProps extends IBoxProps {
  centered?: boolean
}

const Spinner: SFC<ISpinnerProps> = ({ centered, ...props }) => {
  return (
    <Flex
      flexDirection="row"
      width={centered ? 1 : undefined}
      alignItems={centered ? 'center' : undefined}
      justifyContent={centered ? 'center' : undefined}
    >
      <SpinnerDot i={1} {...props} />
      <SpinnerDot i={2} {...props} />
      <SpinnerDot i={3} {...props} />
    </Flex>
  )
}

Spinner.defaultProps = {
  centered: true,
  bg: theme.brand,
  width: 16,
  height: 16,
  mx: 1,
}

export default Spinner
