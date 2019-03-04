import { InputHTMLAttributes } from 'react'
import styled, { StyledComponent } from '../../styled'
import theme from '../../theme'
import Box, { IBoxProps } from '../base/Box'

const Input: StyledComponent<
  IBoxProps & InputHTMLAttributes<HTMLInputElement>
> = styled(Box)`
  border: ${p => p.theme.bd.input};

  :hover,
  :focus,
  :active {
    border: ${p => p.theme.bd.inputActive};
  }
`

Input.defaultProps = {
  as: 'input',
  p: 2,
  fontSize: 2,
  borderRadius: 4,
  maxWidth: theme.mw.form,
}

export default Input
