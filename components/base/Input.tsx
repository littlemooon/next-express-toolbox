import { InputHTMLAttributes } from 'react'
import styled, { StyledComponent } from '../../common/styled'
import theme from '../../common/theme'
import Box, { IBoxProps } from './Box'

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
