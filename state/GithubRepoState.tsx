import { createContext, ReactNode, SFC, useState } from 'react'
import { IGithubData } from '../common/types/github'
import { IState } from '../common/types/index'

const noop = () => undefined

export const GithubRepoContext = createContext<IState<IGithubData>>({
  data: new Map(),
  set: noop,
  get: noop,
})

const GithubRepoStateProvider: SFC<{ children: ReactNode }> = props => {
  const [data, setData] = useState<Map<string, IGithubData>>(new Map())

  const set = (key: string, value: IGithubData) => {
    setData(data.set(key, value))
  }

  const get = (key: string): IGithubData | undefined => {
    return data.get(key)
  }

  return (
    <GithubRepoContext.Provider value={{ data, set, get }}>
      {props.children}
    </GithubRepoContext.Provider>
  )
}

export default GithubRepoStateProvider
