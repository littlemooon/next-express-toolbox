import ErrorBox from 'common/components/base/ErrorBox'
import Spinner from 'common/components/base/Spinner'
import Table from 'common/components/base/Table'
import { FetchState } from 'common/Fetch'
import { fileFetcher } from 'common/fetchers'
import useFetch from 'common/hooks/useFetch'
import { CacheKey } from 'common/state/CacheState'
import { TCsvFile } from 'common/types/index'
import { SFC, useEffect } from 'react'
import { CSVLink } from 'react-csv'

export interface ICsvFileProps {
  filename: string
}

const CsvFile: SFC<ICsvFileProps> = props => {
  const fetch = useFetch(CacheKey.FILE, fileFetcher)
  const data = fetch.data as TCsvFile<any>

  useEffect(() => {
    if (props.filename) {
      fetch.get({ filename: props.filename })
    }
  }, [props.filename])

  return fetch.state === FetchState.SUCCESS ? (
    <>
      <h3>{props.filename}</h3>
      <CSVLink data={data}>Download</CSVLink>
      <Table data={data} />
    </>
  ) : fetch.state === FetchState.ERROR ? (
    <ErrorBox header="Failed to load csv file" error={fetch.error} />
  ) : (
    <Spinner />
  )
}

export default CsvFile
