import { ReactNode, useContext, SFC } from 'react';
import { ServerContext } from '../state/ServerState';
import Spinner from '../components/base/Spinner';

export interface IClientOnlyProps{ children: ReactNode }

const ClientOnly: SFC<IClientOnlyProps> = ({ children }) => {
  const context = useContext(ServerContext)

  return context.isServer ? <Spinner /> : <>{children}</>
}

export default ClientOnly
