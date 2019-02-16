import { SFC, useEffect } from 'react'
import { CSVLink } from 'react-csv'
import { FetchState } from '../common/Fetch'
import { fileFetcher } from '../common/fetchers'
import useFetch from '../common/hooks/useFetch'
import { ICsvFile } from '../common/types/index'
import { CacheKey } from '../state/CacheState'
import ErrorBox from './base/ErrorBox'
import Spinner from './base/Spinner'
import Table from './base/Table'

export interface ICsvFileProps {
  filename: string
}

const CsvFile: SFC<ICsvFileProps> = props => {
  const fetch = useFetch(CacheKey.FILE, fileFetcher)
  const data = fetch.data as ICsvFile<any>

  useEffect(() => {
    if (props.filename) {
      fetch.get({ filename: props.filename })
    }
  }, [props.filename])

  return fetch.state === FetchState.SUCCESS ? (
    <>
      <h3>{props.filename}</h3>
      <CSVLink data={data.rows}>Download</CSVLink>
      <Table headers={data.headers} rows={data.rows} />
    </>
  ) : fetch.state === FetchState.ERROR ? (
    <ErrorBox header="Failed to load csv file" error={fetch.error} />
  ) : (
    <Spinner />
  )
}

export default CsvFile
