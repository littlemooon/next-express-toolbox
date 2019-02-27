import { NextFC } from 'next'
import { useEffect } from 'react'
import { FetchState } from '../common/Fetch'
import { driveListFetcher } from '../common/fetchers/index'
import useFetch from '../common/hooks/useFetch'
import Card from '../components/base/Card'
import ErrorBox from '../components/base/ErrorBox'
import Spinner from '../components/base/Spinner'
import Layout from '../layout'
import { CacheKey } from '../state/CacheState'

const DrivePage: NextFC = () => {
  const fetch = useFetch(CacheKey.DRIVE_LIST, driveListFetcher)

  useEffect(() => {
    fetch.get({})
  }, [])

  return (
    <Layout requireAuth={true}>
      {fetch.state === FetchState.LOADING ? (
        <Spinner />
      ) : fetch.state === FetchState.SUCCESS ? (
        <Card>{JSON.stringify(fetch.data)}</Card>
      ) : fetch.state === FetchState.ERROR ? (
        <ErrorBox header={'Failed fetch drive'} error={fetch.error} />
      ) : null}
    </Layout>
  )
}

DrivePage.getInitialProps = async () => {
  const result = await driveListFetcher.get({})
  return {
    initialCache: new Map([[CacheKey.DRIVE_LIST, [result]]]),
  }
}

export default DrivePage
