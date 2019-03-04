import { createContext, ReactNode, SFC, useState } from 'react'
import { logoutFetcher } from '../fetchers/index'
import { IAuthUser } from '../types'
import { noop } from '../utils'

export interface IAuthState {
  user: IAuthUser
  token?: string
}

const defaultState = {
  user: {},
  logout: noop,
}

export const AuthContext = createContext<IAuthState & { logout: () => void }>(
  defaultState
)

const AuthProvider: SFC<{
  children: ReactNode
  value?: IAuthState
}> = props => {
  const [state, setState] = useState<IAuthState>(props.value || defaultState)

  const set = (newState: Partial<IAuthState>) => {
    const next = { ...state, ...newState }
    setState(next)
  }

  const logout = () => {
    logoutFetcher.get({})
    set({ user: {}, token: undefined })
  }

  return (
    <AuthContext.Provider value={{ ...state, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
