import Spinner from 'common/components/base/Spinner'
import { isServer } from 'common/globals'
import { ReactNode, SFC } from 'react'

export interface IClientOnlyProps {
  children: ReactNode
}

const ClientOnly: SFC<IClientOnlyProps> = ({ children }) => {
  return <>{isServer ? <Spinner /> : children}</>
}

export default ClientOnly
