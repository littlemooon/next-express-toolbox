import { SFC, useEffect } from 'react'
import { CSVLink } from 'react-csv'
import { FetchState } from '../Fetch'
import { fileFetcher } from '../fetchers'
import useFetch from '../hooks/useFetch'
import { CacheKey } from '../state/CacheState'
import { TCsvFile } from '../types/index'
import ErrorBox from './base/ErrorBox'
import Spinner from './base/Spinner'
import Table from './base/Table'
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
