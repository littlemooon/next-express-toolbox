import { NextContext, NextFC } from 'next'

export interface IErrorProps {
  statusCode?: number
  err?: Error
}

const Error: NextFC<IErrorProps> = props => {
  const text = props.statusCode
    ? `An error ${props.statusCode} occurred on server`
    : 'An error occurred on client'
  return (
    <>
      <p>{text}</p>
      {props.err && <p style={{ color: 'red' }}>{props.err}</p>}
    </>
  )
}

Error.getInitialProps = ({ res, err }: NextContext): IErrorProps => {
  const statusCode = res ? res.statusCode : undefined
  return { statusCode, err }
}

export default Error
