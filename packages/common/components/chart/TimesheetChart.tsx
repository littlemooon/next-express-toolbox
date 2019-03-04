import * as df from 'date-fns'
import { SFC, useEffect } from 'react'
import { FetchState } from '../../Fetch'
import { timesheetFetcher } from '../../fetchers/index'
import useFetch from '../../hooks/useFetch'
import { CacheKey } from '../../state/CacheState'
import { ITimesheetData } from '../../types/api'
import ErrorBox from '../base/ErrorBox'
import Spinner from '../base/Spinner'
import DateChart from '../chart/DateChart'

const TimesheetChart: SFC<{ filename: string }> = props => {
  const fetch = useFetch(CacheKey.TIMESHEET, timesheetFetcher, {
    initialUrlParams: {
      filename: props.filename,
    },
  })

  useEffect(() => {
    fetch.get({ filename: props.filename })
  }, [props.filename])

  const data = fetch.data

  const getX = (obj: ITimesheetData) => df.parse(obj.startDate)
  const getY = (obj: ITimesheetData) => obj.durationHours
  const getDefault = (d: Date) => ({
    activity: '',
    project: '',
    startDate: d,
    endDate: d,
    durationSeconds: 0,
    durationMinutes: 0,
    durationHours: 0,
  })

  return (
    <>
      {fetch.state === FetchState.SUCCESS ? (
        <DateChart
          data={data}
          x="startDate"
          y="durationHours"
          getX={getX}
          getY={getY}
          getDefault={getDefault}
        />
      ) : fetch.state === FetchState.ERROR ? (
        <ErrorBox header="Failed to load csv file" error={fetch.error} />
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default TimesheetChart
