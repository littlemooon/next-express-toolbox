import { InputHTMLAttributes } from 'react'
import * as SS from 'styled-system'
import styled, { StyledComponent } from '../../common/styled'

export type InputType = 'string' | 'number' | 'file'

export interface IInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    SS.SpaceProps {}

const Input: StyledComponent<IInputProps> = styled('input')(SS.space)

export default Input
