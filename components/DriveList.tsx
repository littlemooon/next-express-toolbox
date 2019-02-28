import { SFC, useEffect } from 'react'
import { FetchState } from '../common/Fetch'
import { driveListFetcher } from '../common/fetchers/index'
import useFetch from '../common/hooks/useFetch'
import { CacheKey } from '../state/CacheState'
import Card from './base/Card'
import ErrorBox from './base/ErrorBox'
import Spinner from './base/Spinner'
import Json from './Json'

const DriveList: SFC = () => {
  const fetch = useFetch(CacheKey.DRIVE_LIST, driveListFetcher)

  useEffect(() => {
    fetch.get({})
  }, [])

  return (
    <Card>
      {fetch.state === FetchState.LOADING ? (
        <Spinner />
      ) : fetch.state === FetchState.SUCCESS ? (
        <Json data={fetch.data} />
      ) : fetch.state === FetchState.ERROR ? (
        <ErrorBox header={'Failed fetch drive'} error={fetch.error} />
      ) : null}
    </Card>
  )
}

export default DriveList
