import Button from 'common/components/base/Button'
import Card from 'common/components/base/Card'
import ErrorBox from 'common/components/base/ErrorBox'
import Input from 'common/components/base/Input'
import Spinner from 'common/components/base/Spinner'
import Text from 'common/components/base/Text'
import { FetchState } from 'common/Fetch'
import { githubRepoFetcher } from 'common/fetchers'
import useDebounce from 'common/hooks/useDebounce'
import useFetch from 'common/hooks/useFetch'
import Layout from 'common/layout/index'
import { CacheKey } from 'common/state/CacheState'
import * as d from 'dot-prop'
import { NextFC } from 'next'
import { SyntheticEvent, useEffect, useState } from 'react'

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
    <Layout requireAuth={true}>
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

GithubPage.getInitialProps = async ctx => {
  githubRepoFetcher.setToken(ctx)

  const { query } = ctx
  const repo: string =
    query && typeof query.q === 'string' ? query.q : 'littlemooon/dotfiles'

  return {
    repo,
    initialCache: new Map([
      [CacheKey.GITHUB_REPO, [await githubRepoFetcher.get({ repo })]],
    ]),
  }
}

export default GithubPage
