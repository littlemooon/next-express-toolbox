import ErrorBox from 'common/components/base/ErrorBox'
import Spinner from 'common/components/base/Spinner'
import { FetchState } from 'common/Fetch'
import { fileFetcher } from 'common/fetchers'
import useFetch from 'common/hooks/useFetch'
import { CacheKey } from 'common/state/CacheState'
import { SFC, useEffect } from 'react'

export interface IJsonFileProps {
  filename: string
}

const JsonFile: SFC<IJsonFileProps> = props => {
  const fetch = useFetch(CacheKey.FILE, fileFetcher)

  useEffect(() => {
    if (props.filename) {
      fetch.get({ filename: props.filename })
    }
  }, [props.filename])

  return fetch.state === FetchState.SUCCESS ? (
    <>
      <h3>{props.filename}</h3>
      <pre>{JSON.stringify(fetch.data, null, 2)}</pre>
    </>
  ) : fetch.state === FetchState.ERROR ? (
    <ErrorBox header="Failed to load json file" error={fetch.error} />
  ) : (
    <Spinner />
  )
}

export default JsonFile
