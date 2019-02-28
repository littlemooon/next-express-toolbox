import { SFC, useCallback, useEffect } from 'react'
import { FetchState } from '../common/Fetch'
import { timesheetListFetcher } from '../common/fetchers/index'
import useFetch from '../common/hooks/useFetch'
import { CacheKey } from '../state/CacheState'
import Card from './base/Card'
import ErrorBox from './base/ErrorBox'
import Spinner from './base/Spinner'

export interface ITimesheetListProps {
  onSelect: (id: string) => void
}

const TimesheetList: SFC<ITimesheetListProps> = p => {
  const fetch = useFetch(CacheKey.TIMESHEET_LIST, timesheetListFetcher)

  useEffect(() => {
    fetch.get({})
  }, [])

  const onClick = useCallback((id: string) => () => p.onSelect(id), [])

  return (
    <Card>
      {fetch.state === FetchState.LOADING ? (
        <Spinner />
      ) : fetch.state === FetchState.SUCCESS &&
        fetch.data &&
        fetch.data.files ? (
        <>
          {fetch.data.files.map(({ name, id }) => (
            <p key={id} onClick={onClick(id)}>
              {name}
            </p>
          ))}
        </>
      ) : fetch.state === FetchState.ERROR ? (
        <ErrorBox header={'Failed to get timesheets'} error={fetch.error} />
      ) : null}
    </Card>
  )
}

export default TimesheetList
