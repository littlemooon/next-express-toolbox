import { ReactNode, SFC } from 'react'
import { DEV } from '../../common/constants'
import theme from '../../common/theme'
import Card, { ICardProps } from './Card'
import Text, { TextH2, TextH3 } from './Text'

export interface IErrorBoxProps extends ICardProps {
  header?: string
  children?: ReactNode
  error?: Error
}

const ErrorBox: SFC<IErrorBoxProps> = p => {
  return (
    <Card border={theme.bd.error} mb={4} boxShadow={0}>
      {p.header && <TextH2>{p.header}</TextH2>}
      {p.error && (
        <>
          {p.header ? (
            <TextH3>{p.error.message}</TextH3>
          ) : (
            <TextH2>Error: {p.error.message}</TextH2>
          )}
          {DEV &&
            p.error.stack &&
            p.error.stack
              .split('\n')
              .map((line, i) => (
                <Text key={i}>{line.replace(/@/g, ' @ ')}</Text>
              ))}
        </>
      )}
      {p.children}
    </Card>
  )
}

export default ErrorBox
