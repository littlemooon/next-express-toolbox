import d from 'dot-prop'
import { NextFC } from 'next'
import { SyntheticEvent, useState } from 'react'
import Fetch from '../common/Fetch'
import useCache from '../common/hooks/useCache'
import useDebounce from '../common/hooks/useDebounce'
import useFetch from '../common/hooks/useFetch'
import { IGithubData, IGithubDataRaw } from '../common/types/github'
import Layout from '../layout'
import { CacheKey } from '../state/CacheState'

class FetchGithub extends Fetch<IGithubData> {
  public transformBody = async (res: Response): Promise<IGithubData> => {
    const json = (await res.json()) as IGithubDataRaw
    return {
      id: json.id,
      name: json.name,
      fullName: json.full_name,
      username: json.owner.login,
      userId: json.owner.id,
      userAvatarUrl: json.owner.avatar_url,
      description: json.description,
      url: json.url,
      createdAt: json.created_at,
      updatedAt: json.updated_at,
      pushedAt: json.pushed_at,
      size: json.size,
      stargazers: json.stargazers_count,
      openIssues: json.open_issues_count,
    }
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
  const cacheState = useCache<IGithubData>(CacheKey.GITHUB_REPO)

  const github = useFetch<IGithubData>(githubRepoFetcher, {
    additionalUrl: `/${debouncedRepo}`,
    cacheState,
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
        {github.error && <p>Error: {github.error.message}</p>}
        {github.data &&
          Object.keys(github.data).map(k => {
            const v = d.get(github, `data.${k}`)
            return <p key={k}>{`${k}: ${v}`}</p>
          })}
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
