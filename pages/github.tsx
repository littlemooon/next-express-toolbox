import d from 'dot-prop'
import { NextFC } from 'next'
import { SyntheticEvent, useState } from 'react'
import { FetchState } from '../common/Fetch'
import { githubRepoFetcher } from '../common/fetchers'
import useCache from '../common/hooks/useCache'
import useDebounce from '../common/hooks/useDebounce'
import useFetch from '../common/hooks/useFetch'
import { IGithubData } from '../common/types/github'
import Button from '../components/base/Button'
import Card from '../components/base/Card'
import ErrorBox from '../components/base/ErrorBox'
import Input from '../components/base/Input'
import Spinner from '../components/base/Spinner'
import Text from '../components/base/Text'
import Layout from '../layout'
import { CacheKey } from '../state/CacheState'

interface IGithubProps {
  repo: string
  githubRepoFetcher: typeof githubRepoFetcher
}

const GithubPage: NextFC<IGithubProps> = props => {
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
        <Card mb={3}>
          <Input value={repo} onChange={onChange} />
          <Button onClick={onRefresh}>Search</Button>
        </Card>

        {githubFetch.state === FetchState.LOADING ? (
          <Spinner />
        ) : githubFetch.state === FetchState.SUCCESS ? (
          <Card>
            <Text>State: {githubFetch.state}</Text>
            {githubFetch.data &&
              Object.keys(githubFetch.data).map(k => {
                const v = d.get(githubFetch, `data.${k}`)
                return <Text key={k} my={2}>{`${k}: ${v}`}</Text>
              })}
          </Card>
        ) : githubFetch.state === FetchState.ERROR ? (
          <ErrorBox header={`Failed fetch github repo: ${repo}`}>
            {githubFetch.error && githubFetch.error.message}
          </ErrorBox>
        ) : null}
      </div>
    </Layout>
  )
}

GithubPage.getInitialProps = async ({ query }): Promise<IGithubProps> => {
  const repo = query.q ? query.q.toString() : 'littlemooon/dotfiles'
  await githubRepoFetcher.get(`/${repo}`)
  return {
    repo,
    githubRepoFetcher,
  }
}

export default GithubPage
