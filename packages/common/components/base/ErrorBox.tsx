import { ReactNode, SFC } from 'react'
import config from '../../config'
import theme from '../../theme'
import Card, { ICardProps } from '../base/Card'
import Text, { TextH2, TextH3 } from '../base/Text'

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
          {config.DEV &&
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
