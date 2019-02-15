import { NextContext, NextFC } from 'next'
import ErrorBox from '../components/base/ErrorBox'

export interface IErrorProps {
  statusCode?: number
  error?: any
}

const ErrorPage: NextFC<IErrorProps> = ({ error, statusCode }) => {
  const header = statusCode
    ? `An error ${statusCode} occurred on server`
    : 'An error occurred on client'

  return <ErrorBox header={header} error={error} />
}

ErrorPage.getInitialProps = ({ res, err }: NextContext): IErrorProps => {
  const statusCode = res ? res.statusCode : undefined
  return { statusCode, error: err }
}

export default ErrorPage
