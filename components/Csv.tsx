import { SFC, useEffect, useMemo } from 'react'
import { CSVLink } from 'react-csv'
import { FetchState } from '../common/Fetch'
import { csvFetcher } from '../common/fetchers'
import useFetch from '../common/hooks/useFetch'
import ErrorBox from './base/ErrorBox'
import Spinner from './base/Spinner'
import Table from './base/Table'

export interface ICsvProps {
  filename: string
}

const Csv: SFC<ICsvProps> = props => {
  const csvFetch = useFetch(csvFetcher, {
    additionalUrl: `/${props.filename}`,
  })

  useEffect(() => {
    if (props.filename) {
      csvFetch.get({})
    }
  }, [props.filename])

  const { headers, rows } = useMemo(() => {
    return {
      headers: csvFetch.data ? Object.keys(csvFetch.data[0]) : [],
      rows: csvFetch.data || [],
    }
  }, [csvFetch.state])

  return csvFetch.state === FetchState.SUCCESS ? (
    <>
      <h3>{props.filename}</h3>
      <CSVLink data={rows}>Download</CSVLink>
      <Table headers={headers} rows={rows} />
    </>
  ) : csvFetch.state === FetchState.ERROR ? (
    <ErrorBox header="Failed to load csv file" error={csvFetch.error} />
  ) : (
    <Spinner />
  )
}

export default Csv
