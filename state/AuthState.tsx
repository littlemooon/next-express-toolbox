import { createContext } from 'react'
import { IAuthUser } from '../common/types'

export interface IAuthState {
  user: Partial<IAuthUser>
  token?: string
}

const defaultState = {
  user: {},
}

export const AuthStateContext = createContext<IAuthState>(defaultState)
