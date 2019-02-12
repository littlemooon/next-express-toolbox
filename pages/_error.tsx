import { NextContext, NextFC } from 'next'
import ErrorBox from '../components/base/ErrorBox'
import Text from '../components/base/Text'

export interface IErrorProps {
  statusCode?: number
  error?: any
}

const ErrorPage: NextFC<IErrorProps> = ({ error, statusCode }) => {
  const header = statusCode
    ? `An error ${statusCode} occurred on server`
    : 'An error occurred on client'

  return (
    <ErrorBox header={header}>
      {error ? (
        <>
          {error.message && <Text>{error.message}</Text>}
          <Text>{JSON.stringify(error)}</Text>
        </>
      ) : (
        <Text>{'Unknown error'}</Text>
      )}
    </ErrorBox>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextContext): IErrorProps => {
  const statusCode = res ? res.statusCode : undefined
  return { statusCode, error: err }
}

export default ErrorPage
