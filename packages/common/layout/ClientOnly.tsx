import { ReactNode, SFC } from 'react'
import Spinner from '../components/base/Spinner'
import { isServer } from '../globals'

export interface IClientOnlyProps {
  children: ReactNode
}

const ClientOnly: SFC<IClientOnlyProps> = ({ children }) => {
  return <>{isServer ? <Spinner /> : children}</>
}

export default ClientOnly
