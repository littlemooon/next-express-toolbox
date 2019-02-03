import { ReactNode, SFC } from 'react'
import theme from '../../common/theme'
import Card, { ICardProps } from './Card'
import { TextH4 } from './Text'

export interface IErrorBoxProps extends ICardProps {
  header?: string
  children: ReactNode
}

const ErrorBox: SFC<IErrorBoxProps> = props => {
  return (
    <Card bg={theme.bg.red} color={theme.white}>
      {props.header && <TextH4>{props.header}</TextH4>}
      {props.children}
    </Card>
  )
}

export default ErrorBox
