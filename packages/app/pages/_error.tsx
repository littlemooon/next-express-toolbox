import ErrorBox from 'common/components/base/ErrorBox'
import Layout from 'common/layout'
import { NextContext, NextFC } from 'next'

export interface IErrorProps {
  statusCode?: number
  error?: any
}

const ErrorPage: NextFC<IErrorProps> = ({ error, statusCode }) => {
  const header = statusCode
    ? `An error ${statusCode} occurred on server`
    : 'An error occurred on client'

  return (
    <Layout>
      {statusCode === 404 ? (
        <ErrorBox header={'Page not found'} />
      ) : (
        <ErrorBox header={header} error={error} />
      )}
    </Layout>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextContext): IErrorProps => {
  const statusCode = res ? res.statusCode : undefined
  return { statusCode, error: err }
}

export default ErrorPage
