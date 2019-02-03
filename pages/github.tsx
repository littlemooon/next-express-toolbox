import d from 'dot-prop'
import { NextFC } from 'next'
import { SyntheticEvent, useState } from 'react'
import { githubRepoFetcher } from '../common/fetchers'
import useCache from '../common/hooks/useCache'
import useDebounce from '../common/hooks/useDebounce'
import useFetch from '../common/hooks/useFetch'
import { IGithubData } from '../common/types/github'
import Button from '../components/base/Button'
import ErrorBox from '../components/base/ErrorBox'
import Text from '../components/base/Text'
import Layout from '../layout'
import { CacheKey } from '../state/CacheState'

interface IGithubProps {
  repo: string
  githubRepoFetcher: typeof githubRepoFetcher
}

const Github: NextFC<IGithubProps> = props => {
  const [repo, setRepo] = useState(props.repo)
  const debouncedRepo = useDebounce(repo, 600)
  const cacheState = useCache<IGithubData>(
    CacheKey.GITHUB_REPO,
    props.githubRepoFetcher
  )

  const githubFetch = useFetch<IGithubData>(githubRepoFetcher, {
    additionalUrl: `/${debouncedRepo}`,
    cacheState,
  })

  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setRepo(e.currentTarget.value)
  }

  const onRefresh = () => githubFetch.get({ noCache: true })

  return (
    <Layout>
      <div>
        <input value={repo} onChange={onChange} />
        <Button onClick={onRefresh}>Refresh</Button>
        <Text>State: {githubFetch.state}</Text>

        {githubFetch.error && (
          <ErrorBox header={`Failed fetch github repo: ${repo}`}>
            {githubFetch.error.message}
          </ErrorBox>
        )}

        {githubFetch.data &&
          Object.keys(githubFetch.data).map(k => {
            const v = d.get(githubFetch, `data.${k}`)
            return <p key={k}>{`${k}: ${v}`}</p>
          })}
      </div>
    </Layout>
  )
}

Github.getInitialProps = async ({ query }): Promise<IGithubProps> => {
  const repo = query.q ? query.q.toString() : 'littlemooon/dotfiles'
  await githubRepoFetcher.get(`/${repo}`)
  return {
    repo,
    githubRepoFetcher,
  }
}

export default Github
