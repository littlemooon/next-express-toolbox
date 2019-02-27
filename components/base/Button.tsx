import styled from '@emotion/styled'
import { HTMLAttributes } from 'react'
import * as SS from 'styled-system'
import { StyledComponent } from '../../common/styled'
import { Omit } from '../../common/types/index'
import Text, { ITextProps } from './Text'

export interface IButtonProps
  extends ITextProps,
    SS.ButtonStyleProps,
    Omit<Omit<HTMLAttributes<HTMLButtonElement>, 'color'>, 'css'> {}

const Button: StyledComponent<IButtonProps> = styled(Text)(
  {
    appearance: 'none',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  SS.buttonStyle
)

Button.defaultProps = {
  as: 'button',
  fontSize: 'inherit',
  fontWeight: 'bold',
  m: 0,
  px: 3,
  py: 2,
  color: 'white',
  bg: 'blue',
  border: 0,
  borderRadius: 4,
}

export default Button
