import { NextFC } from 'next'
import { SyntheticEvent, useContext, useState } from 'react'
import Fetch from '../common/Fetch'
import useDebounce from '../common/hooks/useDebounce'
import useFetch from '../common/hooks/useFetch'
import { IGithubData } from '../common/types/github'
import Layout from '../layout'
import { GithubRepoContext } from '../state/GithubRepoState'

class FetchGithub extends Fetch<IGithubData> {
  public transformBody = async (res: Response): Promise<IGithubData> => {
    const json = await res.json()
    console.log('-------------------- github --> transfdorm', json)
    return json
  }
}

interface IGithubProps {
  repo: string
  githubRepoFetcher: FetchGithub
}

const githubRepoFetcher = new FetchGithub('https://api.github.com/repos')

const Github: NextFC<IGithubProps> = props => {
  const [repo, setRepo] = useState(props.repo)
  const debouncedRepo = useDebounce(repo, 1000)
  const cachedState = useContext(GithubRepoContext)

  const github = useFetch<IGithubData>(githubRepoFetcher, {
    additionalUrl: `/${debouncedRepo}`,
    cachedState,
    ssrFetcher: props.githubRepoFetcher,
  })

  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setRepo(e.currentTarget.value)
  }

  const onRefresh = () => github.fetch()

  return (
    <Layout>
      <div>
        <input value={repo} onChange={onChange} />
        <button onClick={onRefresh}>Refresh</button>
        <p>State: {github.state}</p>
        {github.data && (
          <>
            <p>Name: {github.data.name}</p>
            <p>Next stars: {github.data.stargazers_count}</p>
          </>
        )}
        <p>Error: {github.error && github.error.message}</p>
        <p>String: {JSON.stringify(github.data)}</p>
      </div>
    </Layout>
  )
}

Github.getInitialProps = async ({ query }): Promise<IGithubProps> => {
  const repo = query.q ? query.q.toString() : 'littlemooon/dotfiles'
  await githubRepoFetcher.call(`/${repo}`)
  return {
    repo,
    githubRepoFetcher,
  }
}

export default Github
