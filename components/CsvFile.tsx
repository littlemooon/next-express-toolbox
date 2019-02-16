import { SFC, useEffect, useMemo } from 'react'
import { CSVLink } from 'react-csv'
import { FetchState } from '../common/Fetch'
import { fileFetcher } from '../common/fetchers'
import useFetch from '../common/hooks/useFetch'
import { TCsvFile } from '../common/types/index'
import { CacheKey } from '../state/CacheState'
import ErrorBox from './base/ErrorBox'
import Spinner from './base/Spinner'
import Table from './base/Table'

export interface ICsvFileProps {
  filename: string
}

const CsvFile: SFC<ICsvFileProps> = props => {
  const fetch = useFetch(CacheKey.FILE, fileFetcher)
  const data = fetch.data as TCsvFile

  const { headers, rows } = useMemo(() => {
    return {
      headers: data ? Object.keys(data[0]) : [],
      rows: data || [],
    }
  }, [fetch.state])

  useEffect(() => {
    if (props.filename) {
      fetch.get({ filename: props.filename })
    }
  }, [props.filename])

  return fetch.state === FetchState.SUCCESS ? (
    <>
      <h3>{props.filename}</h3>
      <CSVLink data={rows}>Download</CSVLink>
      <Table headers={headers} rows={rows} />
    </>
  ) : fetch.state === FetchState.ERROR ? (
    <ErrorBox header="Failed to load csv file" error={fetch.error} />
  ) : (
    <Spinner />
  )
}

export default CsvFile
