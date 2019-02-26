import d from 'dot-prop'
import { NextFC } from 'next'
import { SyntheticEvent, useEffect, useState } from 'react'
import { FetchState } from '../common/Fetch'
import { githubRepoFetcher } from '../common/fetchers'
import useDebounce from '../common/hooks/useDebounce'
import useFetch from '../common/hooks/useFetch'
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
}

const GithubPage: NextFC<IGithubProps> = props => {
  const [repo, setRepo] = useState(props.repo)
  const debouncedRepo = useDebounce(repo, 600)

  const fetch = useFetch(CacheKey.GITHUB_REPO, githubRepoFetcher, {
    initialUrlParams: { repo },
  })

  useEffect(() => {
    fetch.get({ repo: debouncedRepo })
  }, [debouncedRepo])

  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setRepo(e.currentTarget.value)
  }

  const onRefresh = () => fetch.get({ repo: debouncedRepo }, { force: true })

  return (
    <Layout>
      <div>
        <Card mb={3}>
          <Input value={repo} onChange={onChange} />
          <Button onClick={onRefresh}>Search</Button>
        </Card>

        {fetch.state === FetchState.LOADING ? (
          <Spinner />
        ) : fetch.state === FetchState.SUCCESS ? (
          <Card>
            <Text>State: {fetch.state}</Text>
            {fetch.data &&
              Object.keys(fetch.data).map(k => {
                const v = d.get(fetch, `data.${k}`)
                return <Text key={k} my={2}>{`${k}: ${v}`}</Text>
              })}
          </Card>
        ) : fetch.state === FetchState.ERROR ? (
          <ErrorBox
            header={`Failed fetch github repo: ${repo}`}
            error={fetch.error}
          />
        ) : null}
      </div>
    </Layout>
  )
}

GithubPage.getInitialProps = async ({ query }) => {
  const repo: string =
    query && typeof query.q === 'string' ? query.q : 'littlemooon/dotfiles'

  const result = await githubRepoFetcher.get({ repo })
  return {
    repo,
    initialCache: new Map([[CacheKey.GITHUB_REPO, [result]]]),
  }
}

export default GithubPage
