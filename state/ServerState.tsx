import * as d from 'dot-prop'
import { NextContext } from 'next'
import { createContext, ReactNode, SFC, useEffect } from 'react'
import { isServer } from '../common/globals'
import useStorage from '../common/hooks/useStorage'
import { StorageKey } from '../common/storage'
import { IAuthUser } from '../common/types'

export interface IServerState {
  user: IAuthUser
  token?: string
  isServerRendered: boolean
  isServer: boolean
}

export function getServerState(ctx: NextContext): IServerState {
  return {
    user: d.get(ctx, 'req.session.user') || {},
    token: d.get(ctx, 'req.session.user.token'),
    isServerRendered: isServer,
    isServer,
  }
}

function isServerState(serverState: any): serverState is IServerState {
  return (
    serverState &&
    typeof serverState.user === 'object' &&
    serverState.user.id &&
    typeof serverState.token === 'string'
  )
}

export const ServerContext = createContext<IServerState>({
  user: {},
  isServerRendered: false,
  isServer,
})

const ServerProvider: SFC<{
  children: ReactNode
  value: Partial<IServerState>
}> = props => {
  const storage = useStorage<IServerState>(StorageKey.AUTH_STATE, isServerState)

  const serverState = {
    user: props.value.user || (storage.value && storage.value.user) || {},
    token: props.value.token || (storage.value && storage.value.token),
    isServerRendered: Boolean(props.value.isServerRendered),
    isServer,
  }

  useEffect(() => {
    storage.set(serverState)
    return storage.remove
  }, [])

  return (
    <ServerContext.Provider value={serverState}>
      {props.children}
    </ServerContext.Provider>
  )
}

export default ServerProvider
