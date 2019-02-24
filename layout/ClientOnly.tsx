import { ReactNode, SFC, useContext } from 'react'
import Spinner from '../components/base/Spinner'
import { ServerContext } from '../state/ServerState'

export interface IClientOnlyProps {
  children: ReactNode
}

const ClientOnly: SFC<IClientOnlyProps> = ({ children }) => {
  const context = useContext(ServerContext)

  return <>{context.isServer ? <Spinner /> : children}</>
}

export default ClientOnly
